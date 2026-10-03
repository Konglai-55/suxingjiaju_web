'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      {/* 主内容 */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* 顶部大标题 */}
        <div className="py-20 border-b border-border">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
                <span className="block">开启您的</span>
                <span className="text-gold-gradient">理想居住之旅</span>
              </h2>
              <p className="text-muted-foreground max-w-md">
                我们期待与您携手，共同打造独具一格的居住空间
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
              >
                <span>联系我们</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
              <Link 
                href="/products" 
                className="group inline-flex items-center gap-3 px-8 py-4 border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <span>浏览产品</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* 信息区域 */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 品牌 */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="苏鑫五金家具"
                width={40}
                height={40}
                className="object-contain w-10 h-10"
              />
              <div>
                <p className="font-medium text-foreground">苏鑫五金家具</p>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">SUXIN FURNITURE</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              成立于2010年，专注高品质五金家具制造。质量为本，服务至上，为理想居住注入灵魂。
            </p>
          </div>

          {/* 联系电话 */}
          <div>
            <h4 className="flex items-center gap-3 text-sm font-medium text-foreground mb-6">
              <Phone className="w-4 h-4 text-primary" />
              <span>联系电话</span>
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center justify-between">
                <span>门市电话</span>
                <span className="text-foreground">0757-28857578</span>
              </li>
              <li className="flex items-center justify-between">
                <span>工厂电话</span>
                <span className="text-foreground">0757-81868507</span>
              </li>
              <li className="flex items-center justify-between">
                <span>手机</span>
                <span className="text-foreground">18144719588</span>
              </li>
              <li className="flex items-center justify-between">
                <span>手机</span>
                <span className="text-foreground">13380259919</span>
              </li>
            </ul>
          </div>

          {/* 地址 */}
          <div>
            <h4 className="flex items-center gap-3 text-sm font-medium text-foreground mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span>地址</span>
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-primary text-xs tracking-wider mb-1">展厅</p>
                <p className="text-muted-foreground leading-relaxed">
                  广东顺德乐从家具城东航一排13中仓
                </p>
              </li>
              <li>
                <p className="text-primary text-xs tracking-wider mb-1">工厂</p>
                <p className="text-muted-foreground leading-relaxed">
                  佛山市南海区九江镇大谷小学直入100米
                </p>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="flex items-center gap-3 text-sm font-medium text-foreground mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span>在线联系</span>
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center justify-between">
                <span>邮箱</span>
                <span className="text-foreground">suxinwujin@163.com</span>
              </li>
              <li className="flex items-center justify-between">
                <span>WhatsApp</span>
                <span className="text-foreground">86-18144719588</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Instagram</span>
                <span className="text-foreground">suxinfurniture</span>
              </li>
              <li className="flex items-center justify-between">
                <span>TikTok</span>
                <span className="text-foreground">suxinfurniture</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="py-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} 苏鑫五金家具 版权所有
          </p>
          <div className="flex items-center gap-8">
            <Link 
              href="/admin" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              后台管理
            </Link>
            <span className="text-xs text-muted-foreground/50">
              FOSHAN CITY SU XIN HARDWARE FURNITURE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
