import { getProducts, getCategories } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Package } from 'lucide-react'
import Link from 'next/link'
import { ProductsTable } from '@/components/admin/products-table'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">产品管理</h1>
          <p className="text-muted-foreground mt-1">管理所有产品信息</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            添加产品
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            产品列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <ProductsTable products={products} categories={categories} />
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">暂无产品</h3>
              <p className="text-muted-foreground mb-6">开始添加您的第一个产品</p>
              <Button asChild>
                <Link href="/admin/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  添加产品
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
