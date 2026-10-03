import { getCategories, getProducts } from '@/lib/queries'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams
  
  // 获取所有分类
  const categories = await getCategories()

  // 获取产品
  const products = await getProducts({
    isActive: true,
    category: category,
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-16 h-px bg-primary" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">Products</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
              产品展示
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              探索我们精心打造的家具系列，每一件都是品质与设计的完美结合
            </p>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link 
              href="/products"
              className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                !category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              全部
            </Link>
            {categories?.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/products?category=${cat.name}`}
                className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                  category === cat.name 
                    ? 'bg-primary text-primary-foreground' 
                    : 'border border-border text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* 产品网格 */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-border">
              <div className="w-24 h-24 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
                <span className="text-4xl font-serif text-gold-gradient">空</span>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                暂无产品
              </h3>
              <p className="text-muted-foreground mb-6">
                {category ? `"${category}" 分类下暂无产品` : '产品正在上架中，敬请期待'}
              </p>
              {category && (
                <Link 
                  href="/products"
                  className="inline-flex px-6 py-3 border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  查看全部产品
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
