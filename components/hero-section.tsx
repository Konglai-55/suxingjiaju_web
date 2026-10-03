'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        {/* 金色光晕 */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        
        {/* 网格装饰 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(oklch(0.75 0.12 85) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.12 85) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
        
        {/* 噪点纹理 */}
        <div className="noise-texture absolute inset-0" />
      </div>

      {/* 装饰线条 */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* 左侧内容 */}
          <div className={`space-y-8 ${mounted ? 'animate-reveal-up' : 'opacity-0'}`}>
            {/* 标签 */}
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-primary" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">
                Since 2010
              </span>
            </div>

            {/* 主标题 */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-foreground leading-[1.1]">
                <span className="block">为理想居住</span>
                <span className="block text-gold-gradient">注入灵魂</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                心怀敬畏遵循自然，让每一件家具独具一格
              </p>
            </div>

            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-6">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 group"
              >
                <Link href="/products">
                  探索产品
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 px-8"
              >
                <Link href="/about">
                  了解品牌
                </Link>
              </Button>
            </div>
          </div>

          {/* 右侧Logo展示 */}
          <div className={`flex items-center justify-center ${mounted ? 'animate-reveal-scale delay-200' : 'opacity-0'}`}>
            <div className="relative w-full max-w-md">
              {/* 装饰背景圆 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute w-4/5 h-4/5 rounded-full border border-primary/5 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              </div>
              
              {/* Logo */}
              <div className="relative p-8">
                <Image
                  src="/logo.png"
                  alt="苏鑫五金家具"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-auto drop-shadow-[0_0_60px_rgba(250,194,61,0.3)] hover:drop-shadow-[0_0_80px_rgba(250,194,61,0.5)] transition-all duration-500"
                />
              </div>

              {/* 品牌标语 */}
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-sm tracking-[0.3em] text-primary/80 uppercase font-medium">
                  质量为本 · 服务至上
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 数据点 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-12 border-t border-primary/10">
          <div className="text-center">
            <p className="text-4xl font-serif text-gold-gradient mb-2">2010</p>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">成立年份</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-serif text-gold-gradient mb-2">15年+</p>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">行业经验</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-serif text-gold-gradient mb-2">4000㎡+</p>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">生产基地</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-serif text-gold-gradient mb-2">100%</p>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">品质保证</p>
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-500">
        <span className="text-xs tracking-widest text-muted-foreground uppercase">向下探索</span>
        <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
      </div>
    </section>
  )
}
