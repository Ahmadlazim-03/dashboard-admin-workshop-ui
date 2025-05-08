"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  ShoppingCart,
  History,
  LogOut,
  Menu,
  Sun,
  Moon,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Kelola Artikel",
    href: "/articles",
    icon: FileText,
  },
  {
    title: "Kelola Produk",
    href: "/products",
    icon: Package,
  },
  {
    title: "Kelola Pengguna",
    href: "/users",
    icon: Users,
  },
  {
    title: "Kelola Transaksi",
    href: "/transactions",
    icon: ShoppingCart,
  },
  {
    title: "History Transaksi",
    href: "/history",
    icon: History,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Mobile sidebar content
  const mobileSidebar = (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Logo-Branding-UNAIR-biru.png/250px-Logo-Branding-UNAIR-biru.png"
            alt="UNAIR Logo"
            width={24}
            height={24}
            className="rounded-md"
          />
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="hover:bg-muted/80 transition-colors"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300",
              pathname === item.href
                ? "gradient-bg text-white font-medium shadow-md"
                : "hover:bg-accent/10 hover:text-accent hover:translate-x-1",
            )}
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 w-full px-2 space-y-2">
        <Button
          variant="outline"
          className="w-full hover:bg-muted/80 transition-colors whitespace-nowrap"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              Dark Mode
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full hover:bg-muted/80 transition-colors whitespace-nowrap"
          onClick={() => {
            // Add logout logic here if needed
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )

  // Desktop sidebar content
  const desktopSidebar = (
    <div
      className={cn(
        "hidden md:block relative h-screen border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-3 hover:bg-muted/80 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Logo-Branding-UNAIR-biru.png/250px-Logo-Branding-UNAIR-biru.png"
              alt="UNAIR Logo"
              width={24}
              height={24}
              className="rounded-md"
            />
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300",
              pathname === item.href
                ? "gradient-bg text-white font-medium shadow-md"
                : "hover:bg-accent/10 hover:text-accent hover:translate-x-1",
              isCollapsed && "justify-center px-0",
            )}
          >
            <item.icon className={cn("h-4 w-4", pathname === item.href && "animate-pulse-subtle")} />
            {!isCollapsed && (
              <>
                <span>{item.title}</span>
                {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
              </>
            )}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 w-full px-2 space-y-2">
        <Button
          variant="outline"
          className={cn(
            "w-full hover:bg-muted/80 transition-colors whitespace-nowrap",
            isCollapsed && "justify-center px-0",
          )}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Dark Mode</span>}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          className={cn(
            "w-full hover:bg-muted/80 transition-colors whitespace-nowrap",
            isCollapsed && "justify-center px-0",
          )}
          onClick={() => {
            // Add logout logic here if needed
          }}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-3 left-3 z-40 md:hidden bg-background/80 backdrop-blur-sm border shadow-sm hover:bg-muted/80 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile sidebar */}
      {isMobile && mobileSidebar}

      {/* Desktop sidebar */}
      {desktopSidebar}
    </>
  )
}