'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'featured' | 'compact'
  index?: number
}

export function ProductCard({ product, variant = 'default', index = 0 }: ProductCardProps) {
  if (variant === 'featured') {
    return (
      <Link 
        href={`/products/${product.id}`}
        className="group relative block aspect-[3/4] overflow-hidden bg-muted hover-lift"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* 背景图片 */}
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-6xl font-serif text-gold-gradient opacity-50">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        
        {/* 边框装饰 */}
        <div className="absolute inset-4 border border-primary/0 group-hover:border-primary/30 transition-all duration-500" />
        
        {/* 内容 */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          {/* 分类标签 */}
          <div className="mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-xs tracking-[0.2em] text-primary uppercase">
              {product.category}
            </span>
          </div>
          
          {/* 产品名 */}
          <h3 className="text-2xl font-serif text-foreground mb-2 group-hover:text-gold-gradient transition-all duration-300">
            {product.name}
          </h3>
          
          {/* 材质 */}
          {product.material && (
            <p className="text-sm text-muted-foreground mb-4">
              {product.material}
            </p>
          )}
          
          {/* 查看按钮 */}
          <div className="flex items-center gap-2 text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <span className="text-sm tracking-wider">探索详情</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        
        {/* 精选标签 */}
        {product.is_featured && (
          <div className="absolute top-6 right-6 w-10 h-10 border border-primary/50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <span className="text-xs text-primary">精选</span>
          </div>
        )}
      </Link>
    )
  }

  return (
    <Link 
      href={`/products/${product.id}`}
      className="group relative block overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* 图片区域 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto border border-primary/20 flex items-center justify-center mb-2">
                <span className="text-3xl font-serif text-gold-gradient">
                  {product.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* 悬浮遮罩 */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
        
        {/* 角落装饰 */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
        
        {/* 精选标签 */}
        {product.is_featured && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs tracking-wider">
            精选
          </span>
        )}
      </div>

      {/* 信息区域 */}
      <div className="p-6 space-y-3">
        {/* 分类 */}
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-primary/50" />
          <span className="text-[10px] tracking-[0.2em] text-primary uppercase">
            {product.category}
          </span>
        </div>
        
        {/* 产品名 */}
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* 描述 */}
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* 规格信息 */}
        <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          {product.material && (
            <span>{product.material}</span>
          )}
          <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </Link>
  )
}
