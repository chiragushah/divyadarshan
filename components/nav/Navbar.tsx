"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const PAGE_GROUP: Record<string, string> = {
  "/explore": "Explore",
  "/temple": "Explore",
  "/circuits": "Explore",
  "/calendar": "Explore",
  "/planner": "Plan",
  "/packing": "Plan",
  "/budget": "Plan",
  "/journal": "My Yatra",
  "/savings": "My Yatra",
  "/group-split": "My Yatra",
};

const NAV_GROUPS = [
  {
    label: "Explore",
    items: [
      { href: "/explore", label: "🛕 Temple Directory" },
      { href: "/circuits", label: "🗺️ Pilgrimage Circuits" },
      { href: "/calendar", label: "📅 Festival Calendar" },
    ],
  },
  {
    label: "Plan",
    items: [
      { href: "/planner", label: "🤖 AI Yatra Planner" },
      { href: "/packing", label: "🎒 Packing Checklist" },
      { href: "/budget", label: "💰 Budget Calculator" },
    ],
  },
  {
    label: "My Yatra",
    items: [
      { href: "/journal", label: "📔 My Journal" },
      { href: "/savings", label: "🪙 Savings Goals" },
      { href: "/group-split", label: "👥 Group Split" },
      { href: "/yatra/group", label: "🗺️ Group Yatras" },
      { href: "/profile", label: "🙏 My Profile" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeGroup = PAGE_GROUP[pathname] ?? null;

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🙏</span>
            <span className="text-xl font-bold text-orange-600">
              DivyaDarshan
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_GROUPS.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    activeGroup === group.label
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {group.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      openGroup === group.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openGroup === group.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-orange-100 py-2 z-50">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                          pathname === item.href
                            ? "bg-orange-50 text-orange-700 font-medium"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {session.user?.name?.split(" ")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-orange-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-4 pb-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="pt-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-2.5 text-sm rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-orange-50 text-orange-700 font-medium"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-4 border-t border-gray-100 mt-3 flex flex-col gap-2">
            {session ? (
              <button
                onClick={() => signOut()}
                className="w-full py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 text-sm font-medium text-center text-orange-600 border border-orange-200 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-2.5 text-sm font-medium text-center bg-orange-600 text-white rounded-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
