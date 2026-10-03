'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// 硬编码管理员账户
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'a153426789'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    console.log('[v0] 尝试登录:', { username, password })

    // 验证硬编码的管理员账户
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('[v0] 验证成功，设置 localStorage')
      // 设置登录状态到 localStorage
      localStorage.setItem('admin_logged_in', 'true')
      localStorage.setItem('admin_login_time', Date.now().toString())
      console.log('[v0] 跳转到后台')
      window.location.href = '/admin'
    } else {
      console.log('[v0] 验证失败')
      setError('用户名或密码错误')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="苏鑫五金家具"
              width={60}
              height={60}
              className="mx-auto mb-4 object-contain w-16 h-16"
            />
            <h1 className="text-2xl font-bold text-foreground">苏鑫五金家具</h1>
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              后台管理系统
            </p>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">管理员登录</CardTitle>
            <CardDescription>
              请输入您的账号信息登录后台
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="username">用户名</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">密码</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    {error}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            返回首页
          </Link>
        </p>
      </div>
    </div>
  )
}
