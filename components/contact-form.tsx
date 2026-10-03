'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '提交失败')
      }

      setIsSuccess(true)
      setFormData({ name: '', phone: '', email: '', company: '', message: '' })
      
      // 3秒后重置成功状态
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">提交成功</h3>
        <p className="text-muted-foreground">我们已收到您的留言，将尽快与您联系</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            姓名 <span className="text-primary">*</span>
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="请输入您的姓名"
            required
            className="bg-background border-border/50 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            电话 <span className="text-primary">*</span>
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="请输入您的联系电话"
            required
            className="bg-background border-border/50 focus:border-primary"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">邮箱</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="请输入您的邮箱（选填）"
            className="bg-background border-border/50 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">公司名称</label>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="请输入公司名称（选填）"
            className="bg-background border-border/50 focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          留言内容 <span className="text-primary">*</span>
        </label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="请描述您的需求或问题..."
          required
          rows={5}
          className="bg-background border-border/50 focus:border-primary resize-none"
        />
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            提交中...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            提交留言
          </>
        )}
      </Button>
    </form>
  )
}
