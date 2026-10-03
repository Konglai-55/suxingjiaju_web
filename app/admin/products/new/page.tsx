import { getCategories } from '@/lib/queries'
import { ProductForm } from '@/components/admin/product-form'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">添加产品</h1>
        <p className="text-muted-foreground mt-1">创建新的产品信息</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  )
}
