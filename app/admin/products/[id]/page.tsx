import { getProductById, getCategories } from '@/lib/queries'
import { ProductForm } from '@/components/admin/product-form'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const categories = await getCategories()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">编辑产品</h1>
        <p className="text-muted-foreground mt-1">修改产品信息</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  )
}
