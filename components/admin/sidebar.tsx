'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  MessageSquare,
  LogOut,
  Home,
  Settings
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/products', label: '产品管理', icon: Package },
  { href: '/admin/categories', label: '分类管理', icon: FolderOpen },
  { href: '/admin/messages', label: '客户留言', icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_login_time')
    router.push('/')
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="block flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="苏鑫五金家具"
            width={32}
            height={32}
            className="object-contain w-8 h-8"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground">苏鑫五金家具</h1>
            <p className="text-xs text-muted-foreground">后台管理系统</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 pt-8 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Home className="h-4 w-4" />
            返回前台
          </Link>
        </div>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <Settings className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              管理员
            </p>
            <p className="text-xs text-muted-foreground truncate">
              admin
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </Button>
      </div>
    </aside>
  )
}
