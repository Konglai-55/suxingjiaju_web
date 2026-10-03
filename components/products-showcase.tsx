'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'

interface ProductsShowcaseProps {
  products: Product[]
  title?: string
  description?: string
  showViewAll?: boolean
}

export function ProductsShowcase({ 
  products, 
  title = '精选产品',
  description = '每一件家具都承载着我们对品质的执着追求',
  showViewAll = true 
}: ProductsShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-background overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-primary/20" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* 标题区域 */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20 ${isVisible ? 'animate-reveal-up' : 'opacity-0'}`}>
          <div className="space-y-6">
            {/* 装饰线 */}
            <div className="flex items-center gap-4">
              <span className="w-16 h-px bg-primary" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">Products</span>
            </div>
            
            {/* 标题 */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground tracking-tight">
              {title}
            </h2>
            
            {/* 描述 */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              {description}
            </p>
          </div>

          {showViewAll && (
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="self-start lg:self-auto border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 group"
            >
              <Link href="/products">
                <span>查看全部</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          )}
        </div>

        {/* 产品展示 */}
        {products.length > 0 ? (
          <div className={`${isVisible ? 'animate-reveal-up delay-200' : 'opacity-0'}`}>
            {/* Bento Grid 布局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {/* 大卡片 - 占据左侧 */}
              {products[0] && (
                <div className="lg:col-span-7 lg:row-span-2">
                  <ProductCard product={products[0]} variant="featured" index={0} />
                </div>
              )}
              
              {/* 右上卡片 */}
              {products[1] && (
                <div className="lg:col-span-5">
                  <ProductCard product={products[1]} index={1} />
                </div>
              )}
              
              {/* 右下卡片 */}
              {products[2] && (
                <div className="lg:col-span-5">
                  <ProductCard product={products[2]} index={2} />
                </div>
              )}
              
              {/* 底部三个卡片 */}
              {products.slice(3, 6).map((product, idx) => (
                <div key={product.id} className="lg:col-span-4">
                  <ProductCard product={product} index={idx + 3} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 border border-border bg-card/50">
            <div className="w-24 h-24 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
              <span className="text-4xl font-serif text-gold-gradient">空</span>
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              暂无产品
            </h3>
            <p className="text-muted-foreground text-sm">
              产品正在上架中，敬请期待
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
