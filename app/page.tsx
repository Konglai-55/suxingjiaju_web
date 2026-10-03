import { getFeaturedProducts } from '@/lib/queries'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { ProductsShowcase } from '@/components/products-showcase'
import { FeaturesSection } from '@/components/features-section'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // 获取精选产品
  const featuredProducts = await getFeaturedProducts(6)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsShowcase 
        products={featuredProducts} 
        title="精选产品"
        description="每一件家具都承载着我们对品质的执着追求，融合现代美学与传统工艺"
      />
      <FeaturesSection />
      <Footer />
    </main>
  )
}
