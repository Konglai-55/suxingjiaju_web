'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Eye, Trash2, User, Phone, Mail, Building, Clock } from 'lucide-react'
import type { ContactSubmission } from '@/lib/types'

interface MessagesTableProps {
  submissions: ContactSubmission[]
}

export function MessagesTable({ submissions: initialSubmissions }: MessagesTableProps) {
  const router = useRouter()
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const viewMessage = async (submission: ContactSubmission) => {
    setSelectedMessage(submission)
    
    // 如果未读，标记为已读
    if (!submission.is_read) {
      try {
        const response = await fetch(`/api/contact/${submission.id}`, {
          method: 'PATCH',
        })
        if (response.ok) {
          setSubmissions(submissions.map(s =>
            s.id === submission.id ? { ...s, is_read: true } : s
          ))
        }
      } catch (error) {
        console.error('标记已读失败:', error)
      }
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('确定要删除这条留言吗？')) return
    
    setIsLoading(id)
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setSubmissions(submissions.filter(s => s.id !== id))
        if (selectedMessage?.id === id) {
          setSelectedMessage(null)
        }
        router.refresh()
      }
    } catch (error) {
      console.error('删除失败:', error)
    }
    setIsLoading(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">状态</TableHead>
            <TableHead>姓名</TableHead>
            <TableHead>电话</TableHead>
            <TableHead>公司</TableHead>
            <TableHead>留言摘要</TableHead>
            <TableHead>提交时间</TableHead>
            <TableHead className="text-right w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow 
              key={submission.id}
              className={!submission.is_read ? 'bg-primary/5' : ''}
            >
              <TableCell>
                {submission.is_read ? (
                  <Badge variant="outline" className="text-muted-foreground">
                    已读
                  </Badge>
                ) : (
                  <Badge className="bg-primary text-primary-foreground">
                    未读
                  </Badge>
                )}
              </TableCell>
              <TableCell className="font-medium">{submission.name}</TableCell>
              <TableCell>{submission.phone}</TableCell>
              <TableCell className="text-muted-foreground">
                {submission.company || '-'}
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-muted-foreground">
                {submission.message}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(submission.created_at)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => viewMessage(submission)}
                    className="h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMessage(submission.id)}
                    disabled={isLoading === submission.id}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 详情弹窗 */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>留言详情</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">姓名</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">电话</p>
                    <p className="font-medium">{selectedMessage.phone}</p>
                  </div>
                </div>
                {selectedMessage.email && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">邮箱</p>
                      <p className="font-medium">{selectedMessage.email}</p>
                    </div>
                  </div>
                )}
                {selectedMessage.company && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Building className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">公司</p>
                      <p className="font-medium">{selectedMessage.company}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">留言内容</p>
                <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>提交于 {formatDate(selectedMessage.created_at)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
