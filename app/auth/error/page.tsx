import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">认证错误</h1>
        <p className="text-muted-foreground mb-8">
          登录过程中发生错误，请重试
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/auth/login">重新登录</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
