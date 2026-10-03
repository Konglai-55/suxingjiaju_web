import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FeaturesSection } from '@/components/features-section'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 关于我们头部 */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-16 h-px bg-primary" />
                <span className="text-xs tracking-[0.3em] text-primary uppercase">About Us</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
                苏鑫五金家具
              </h1>
              <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-8">
                FOSHAN CITY SU XIN HARDWARE FURNITURE
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                为探索独特设计的产品带来新的理念，实现理想化居住氛围。
                心怀敬畏遵循自然，让每一件家具独具一格。
              </p>
            </div>
            
            {/* 右侧装饰 */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-muted border border-border flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl font-serif text-gold-gradient mb-2">2010</p>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">Founded</p>
                  </div>
                </div>
                <div className="aspect-square bg-primary/5 border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl font-serif text-gold-gradient mb-2">4000㎡+</p>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">Factory</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-32 bg-muted/30 relative">
        <div className="absolute inset-0 noise-texture" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* 左侧标题 */}
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-16 h-px bg-primary/50" />
                  <span className="text-xs tracking-[0.3em] text-primary uppercase">Story</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
                  品牌故事
                </h2>
              </div>
            </div>
            
            {/* 右侧内容 */}
            <div className="lg:col-span-3 space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                成立于 2010 年，苏鑫五金家具始于几百平方米的小作坊。凭借对品质的执着追求和对创新的不懈探索，我们逐步发展成为拥有四千多平方米现代化生产基地的专业五金家具制造企业。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                十余年来，苏鑫五金家具始终坚持"质量为本，服务至上"的理念，专注于高品质五金配件及家具制造。产品涵盖各类家居、办公及商业空间应用。我们注重研发与工艺改进，采用先进设备与严格的品质管理体系，确保每一件产品都经得起市场考验。
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                从小规模起步到行业领先，苏鑫见证了自身的成长，也赢得了广大客户的信赖与支持。我们相信，好的家具不仅仅是功能性的物品，更是生活品味和生活态度的体现。
              </p>
              
              {/* 装饰分割 */}
              <div className="py-8">
                <div className="w-24 h-px bg-primary/30" />
              </div>
              
              {/* 核心价值 */}
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <p className="text-4xl font-serif text-gold-gradient mb-3">01</p>
                  <h4 className="text-foreground font-medium mb-2">质量为本</h4>
                  <p className="text-sm text-muted-foreground">严选原材料，精工细作，确保产品品质</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-gold-gradient mb-3">02</p>
                  <h4 className="text-foreground font-medium mb-2">服务至上</h4>
                  <p className="text-sm text-muted-foreground">完善售后体系，专业团队一站式服务</p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-gold-gradient mb-3">03</p>
                  <h4 className="text-foreground font-medium mb-2">持续创新</h4>
                  <p className="text-sm text-muted-foreground">不断研发改进，追求设计极致</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 企业理念 */}
      <section className="py-32 bg-card relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-16 h-px bg-primary/30" />
            <span className="text-xs tracking-[0.3em] text-primary uppercase">Philosophy</span>
            <span className="w-16 h-px bg-primary/30" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-12">
            企业理念
          </h2>
          <div className="space-y-12">
            <blockquote className="text-2xl md:text-3xl font-serif font-light text-foreground/90 italic leading-relaxed">
              {'"'}为探索独特设计的产品带来新的理念，
              <br className="hidden md:block" />
              实现理想化居住氛围{'"'}
            </blockquote>
            <div className="w-24 h-px bg-primary/30 mx-auto" />
            <blockquote className="text-xl md:text-2xl font-serif font-light text-muted-foreground italic leading-relaxed">
              {'"'}心怀敬畏遵循自然，
              <br className="hidden md:block" />
              让每一件家具独具一格{'"'}
            </blockquote>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  )
}
