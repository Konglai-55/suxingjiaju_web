'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // 检查登录状态
    const loggedIn = localStorage.getItem('admin_logged_in')
    const loginTime = localStorage.getItem('admin_login_time')
    
    console.log('[v0] Admin layout 检查登录状态:', { loggedIn, loginTime })
    
    // 检查是否登录且登录时间在24小时内
    if (loggedIn === 'true' && loginTime) {
      const timeDiff = Date.now() - parseInt(loginTime)
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      if (timeDiff < twentyFourHours) {
        console.log('[v0] 登录有效')
        setIsAuthenticated(true)
      } else {
        // 登录过期，清除状态
        console.log('[v0] 登录过期')
        localStorage.removeItem('admin_logged_in')
        localStorage.removeItem('admin_login_time')
        setIsAuthenticated(false)
      }
    } else {
      console.log('[v0] 未登录')
      setIsAuthenticated(false)
    }
  }, [])

  // 正在检查登录状态
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    )
  }

  // 未登录，重定向到登录页
  if (isAuthenticated === false) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <p className="text-muted-foreground">正在跳转到登录页...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
