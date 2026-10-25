import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import connectDB, { clientPromise } from '@/lib/mongodb/connect'
import { User } from '@/models'

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,

  session: { strategy: 'jwt' as const, maxAge: 7 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Email',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
        mode:     { label: 'Mode',     type: 'text'     },
        name:     { label: 'Name',     type: 'text'     },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        await connectDB()

        if (credentials.mode === 'signup') {
          // Sign-up only happens through /api/auth/register (validated + rate-limited). Never create accounts here.
          throw new Error('Please use the sign-up page to create an account')
        } else {
          const user = await User.findOne({ email: credentials.email.toLowerCase() })
          if (!user || !user.password) throw new Error('Invalid email or password')
          const valid = await bcrypt.compare(credentials.password, user.password)
          if (!valid) throw new Error('Invalid email or password')
          // Only the real owner (correct password) is told the account is waiting for confirmation.
          if ((user as any).verification_required && !(user as any).email_verified) throw new Error('EMAIL_NOT_VERIFIED')
          return { id: user._id.toString(), email: user.email, name: user.name, image: user.image }
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
    error:  '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,
}
