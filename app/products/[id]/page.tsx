import { getProductById, getProducts } from '@/lib/queries'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  
  // 获取产品详情
  const product = await getProductById(id)

  if (!product || !product.is_active) {
    notFound()
  }

  // 获取相关产品
  const allRelatedProducts = await getProducts({
    isActive: true,
    category: product.category,
  })
  const relatedProducts = allRelatedProducts
    .filter(p => p.id !== id)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* 返回按钮 */}
          <Link 
            href="/products" 
            className="group inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 mb-12"
          >
            <span className="w-10 h-10 border border-border group-hover:border-primary flex items-center justify-center transition-colors duration-300">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="text-sm tracking-wider">返回产品列表</span>
          </Link>

          {/* 产品详情 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* 图片 */}
            <div className="relative">
              <div className="relative aspect-square bg-muted overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto border border-primary/30 flex items-center justify-center mb-4">
                        <span className="text-6xl font-serif text-gold-gradient">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 角落装饰 */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-primary/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-primary/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-primary/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-primary/40" />
              </div>
              
              {/* 装饰边框 */}
              <div className="absolute -inset-4 border border-primary/10 -z-10" />
              
              {product.is_featured && (
                <div className="absolute top-8 left-8 px-4 py-2 bg-primary text-primary-foreground text-xs tracking-wider">
                  精选产品
                </div>
              )}
            </div>

            {/* 信息 */}
            <div className="flex flex-col py-4">
              {/* 分类 */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-primary" />
                <span className="text-xs tracking-[0.2em] text-primary uppercase">
                  {product.category}
                </span>
              </div>
              
              {/* 名称 */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-foreground mb-6">
                {product.name}
              </h1>
              
              {/* 描述 */}
              {product.description && (
                <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                  {product.description}
                </p>
              )}

              {/* 规格信息 */}
              <div className="space-y-6 mb-12 p-8 border border-border">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-px bg-primary/50" />
                  <h3 className="text-sm tracking-wider text-foreground">产品规格</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.material && (
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">材质</span>
                      <span className="text-sm text-foreground">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center justify-between py-3 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">尺寸</span>
                      <span className="text-sm text-foreground">{product.dimensions}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">分类</span>
                    <span className="text-sm text-foreground">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="mt-auto">
                <p className="text-sm text-muted-foreground mb-6">
                  如需了解更多产品详情或询价，请联系我们
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="tel:18144719588"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                  >
                    <Phone className="h-4 w-4" />
                    <span>18144719588</span>
                  </a>
                  <a 
                    href="tencent://message/?uin=1539925253"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>QQ咨询</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 相关产品 */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-12">
                <span className="w-16 h-px bg-primary/50" />
                <h2 className="text-2xl font-serif font-light text-foreground">
                  相关产品
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((item, index) => (
                  <ProductCard key={item.id} product={item} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
