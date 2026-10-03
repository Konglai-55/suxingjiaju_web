'use client'

import { Sparkles, Shield, Wrench, Compass } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const features = [
  {
    icon: Sparkles,
    title: '创新设计',
    subtitle: 'INNOVATIVE DESIGN',
    description: '为探索独特设计的产品带来新的理念，实现理想化居住氛围',
    number: '01',
  },
  {
    icon: Shield,
    title: '品质保证',
    subtitle: 'QUALITY ASSURED',
    description: '质量为本，采用先进设备与严格品质管理体系，经得起市场考验',
    number: '02',
  },
  {
    icon: Wrench,
    title: '精湛工艺',
    subtitle: 'CRAFTSMANSHIP',
    description: '15年深厚积淀，拥有四千平方米现代化生产基地，追求工艺极致',
    number: '03',
  },
  {
    icon: Compass,
    title: '专业服务',
    subtitle: 'PROFESSIONAL',
    description: '服务至上，完善售后体系，为您的理想居住护航',
    number: '04',
  },
]

export function FeaturesSection() {
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
    <section ref={sectionRef} className="relative py-32 bg-muted/30 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px]" />
        <div className="noise-texture absolute inset-0" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* 标题区域 */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-reveal-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-px bg-primary/50" />
            <span className="text-xs tracking-[0.3em] text-primary uppercase">Why Choose Us</span>
            <span className="w-16 h-px bg-primary/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            为何选择苏鑫
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            以专业的态度和真诚的服务，为每一位客户创造理想的居住空间
          </p>
        </div>

        {/* 特色网格 */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border ${isVisible ? 'animate-reveal-up delay-200' : 'opacity-0'}`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-background p-8 lg:p-10 hover:bg-muted/50 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 序号 */}
              <span className="absolute top-6 right-6 text-5xl font-serif text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                {feature.number}
              </span>
              
              {/* 图标 */}
              <div className="relative w-14 h-14 mb-8">
                <div className="absolute inset-0 border border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r border-b border-primary/30" />
              </div>
              
              {/* 内容 */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <span className="text-[10px] tracking-[0.2em] text-primary/60 uppercase">
                    {feature.subtitle}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* 底部装饰线 */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/0 group-hover:bg-primary/50 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* 底部品牌理念 */}
        <div className={`mt-20 text-center ${isVisible ? 'animate-reveal-up delay-400' : 'opacity-0'}`}>
          <blockquote className="text-2xl md:text-3xl font-serif font-light text-foreground/80 italic max-w-3xl mx-auto leading-relaxed">
            {'"'}心怀敬畏遵循自然，让每一件家具独具一格{'"'}
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-primary/30" />
            <span className="text-sm text-muted-foreground">苏鑫五金家具</span>
            <span className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
