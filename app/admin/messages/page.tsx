import { getContactSubmissions, getUnreadSubmissionsCount } from '@/lib/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Mail } from 'lucide-react'
import { MessagesTable } from '@/components/admin/messages-table'

export const dynamic = 'force-dynamic'

export default async function AdminMessagesPage() {
  const submissions = await getContactSubmissions()
  const unreadCount = await getUnreadSubmissionsCount()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">客户留言</h1>
          <p className="text-muted-foreground mt-1">查看和管理客户提交的留言</p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-md">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">{unreadCount} 条未读</span>
          </div>
        )}
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            留言列表
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {submissions.length > 0 ? (
            <MessagesTable submissions={submissions} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无客户留言</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
