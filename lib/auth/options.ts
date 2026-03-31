import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import bcrypt from 'bcryptjs'
import connectDB, { clientPromise } from '@/lib/mongodb/connect'
import { User } from '@/models'

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,

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
          const existing = await User.findOne({ email: credentials.email.toLowerCase() })
          if (existing) throw new Error('Email already registered')
          const hashed = await bcrypt.hash(credentials.password, 12)
          const user = await User.create({
            email: credentials.email.toLowerCase(),
            name: credentials.name || credentials.email.split('@')[0],
            password: hashed,
            provider: 'credentials',
          })
          return { id: user._id.toString(), email: user.email, name: user.name, image: null }
        } else {
          const user = await User.findOne({ email: credentials.email.toLowerCase() })
          if (!user || !user.password) throw new Error('Invalid email or password')
          const valid = await bcrypt.compare(credentials.password, user.password)
          if (!valid) throw new Error('Invalid email or password')
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
