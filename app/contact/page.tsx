import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 头部 */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-16 h-px bg-primary" />
              <span className="text-xs tracking-[0.3em] text-primary uppercase">Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
              与我们取得联系
            </h1>
            <p className="text-lg text-muted-foreground">
              无论您有任何问题或需求，我们的团队都将竭诚为您服务
            </p>
          </div>
        </div>
      </section>

      {/* 联系方式网格 */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {/* 门市电话 */}
            <div className="bg-background p-8 group hover:bg-muted/50 transition-colors duration-500">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-medium mb-2">门市电话</h3>
              <p className="text-2xl text-gold-gradient font-light">0757-28857578</p>
            </div>
            
            {/* 工厂电话 */}
            <div className="bg-background p-8 group hover:bg-muted/50 transition-colors duration-500">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-medium mb-2">工厂电话</h3>
              <p className="text-2xl text-gold-gradient font-light">0757-81868507</p>
            </div>
            
            {/* 手机 */}
            <div className="bg-background p-8 group hover:bg-muted/50 transition-colors duration-500">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-foreground font-medium mb-2">手机</h3>
              <div className="space-y-1">
                <p className="text-xl text-gold-gradient font-light">18144719588</p>
                <p className="text-xl text-gold-gradient font-light">13380259919</p>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div className="bg-background p-8 group hover:bg-muted/50 transition-colors duration-500">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-foreground font-medium mb-2">WhatsApp</h3>
              <p className="text-2xl text-gold-gradient font-light">86-18144719588</p>
            </div>
          </div>
        </div>
      </section>

      {/* 地址信息 */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <span className="w-16 h-px bg-primary/50" />
            <span className="text-xs tracking-[0.3em] text-primary uppercase">Locations</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* 展厅 */}
            <div className="group relative p-10 border border-border hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 border border-primary/30 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">展厅地址</h3>
                  <p className="text-sm text-primary tracking-wider">SHOWROOM</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">省份</span>
                  <span className="text-foreground">广东省</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">城市</span>
                  <span className="text-foreground">佛山市顺德区</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">详细地址</span>
                  <span className="text-foreground">乐从家具城东航一排13中仓</span>
                </div>
              </div>
            </div>

            {/* 工厂 */}
            <div className="group relative p-10 border border-border hover:border-primary/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 border border-primary/30 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">工厂地址</h3>
                  <p className="text-sm text-primary tracking-wider">FACTORY</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">省份</span>
                  <span className="text-foreground">广东省</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">城市</span>
                  <span className="text-foreground">佛山市南海区</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">详细地址</span>
                  <span className="text-foreground">九江镇大谷小学直入100米</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 邮箱和社交媒体 */}
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-5 border border-border/50">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-1">邮箱</p>
                <p className="text-foreground text-sm">suxinwujin@163.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 border border-border/50">
              <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Instagram</p>
                <p className="text-foreground text-sm">suxinfurniture</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 border border-border/50">
              <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              <div>
                <p className="text-xs text-muted-foreground mb-1">TikTok</p>
                <p className="text-foreground text-sm">suxinfurniture</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 border border-border/50">
              <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              <div>
                <p className="text-xs text-muted-foreground mb-1">TikTok</p>
                <p className="text-foreground text-sm">suxinfactory</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 联系表单 */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* 左侧文案 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-16 h-px bg-primary/50" />
                <span className="text-xs tracking-[0.3em] text-primary uppercase">Leave a Message</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">
                给我们留言
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                无论您是想了解产品详情、定制需求还是合作洽谈，请填写下方表单，我们的团队将在24小时内与您取得联系。
              </p>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>专业顾问一对一服务</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>24小时内快速响应</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>支持产品定制服务</span>
                </div>
              </div>
            </div>

            {/* 右侧表单 */}
            <div className="bg-background p-8 md:p-10 border border-border/50">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 品牌信息 */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="苏鑫五金家具"
              width={80}
              height={80}
              className="object-contain w-20 h-20"
            />
          </div>
          <h2 className="text-2xl font-serif text-foreground mb-2">苏鑫五金家具</h2>
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-8">
            FOSHAN CITY SU XIN HARDWARE FURNITURE
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto italic">
            {'"'}为探索独特设计的产品带来新的理念，实现理想化居住氛围。
            心怀敬畏遵循自然，让每一件家具独具一格。{'"'}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
