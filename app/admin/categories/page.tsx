import { getCategories, getProducts } from '@/lib/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen } from 'lucide-react'
import { CategoriesManager } from '@/components/admin/categories-manager'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  // 获取每个分类的产品数量
  const products = await getProducts()

  const countMap: Record<string, number> = {}
  products.forEach((p) => {
    countMap[p.category] = (countMap[p.category] || 0) + 1
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">分类管理</h1>
        <p className="text-muted-foreground mt-1">管理产品分类</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            分类列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesManager 
            categories={categories} 
            productCounts={countMap}
          />
        </CardContent>
      </Card>
    </div>
  )
}
