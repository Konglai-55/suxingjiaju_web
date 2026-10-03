import { getProductsCount, getCategoriesCount, getRecentProducts, getUnreadSubmissionsCount } from '@/lib/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, FolderOpen, Star, Eye, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // 获取统计数据
  const totalProducts = await getProductsCount()
  const activeProducts = await getProductsCount({ isActive: true })
  const featuredProducts = await getProductsCount({ isFeatured: true })
  const totalCategories = await getCategoriesCount()
  const unreadMessages = await getUnreadSubmissionsCount()

  // 获取最新产品
  const recentProducts = await getRecentProducts(5)

  const stats = [
    { 
      title: '产品总数', 
      value: totalProducts, 
      icon: Package,
      href: '/admin/products',
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      title: '已上架', 
      value: activeProducts, 
      icon: Eye,
      href: '/admin/products',
      color: 'text-green-600 bg-green-100'
    },
    { 
      title: '精选产品', 
      value: featuredProducts, 
      icon: Star,
      href: '/admin/products',
      color: 'text-amber-600 bg-amber-100'
    },
    { 
      title: '产品分类', 
      value: totalCategories, 
      icon: FolderOpen,
      href: '/admin/categories',
      color: 'text-purple-600 bg-purple-100'
    },
    { 
      title: '未读留言', 
      value: unreadMessages, 
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'text-rose-600 bg-rose-100'
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">仪表盘</h1>
        <p className="text-muted-foreground mt-1">欢迎回来，管理员</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* 最新产品 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>最新产品</CardTitle>
          <Link 
            href="/admin/products" 
            className="text-sm text-accent hover:underline"
          >
            查看全部
          </Link>
        </CardHeader>
        <CardContent>
          {recentProducts.length > 0 ? (
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.is_featured && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">
                        精选
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded ${
                      product.is_active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.is_active ? '已上架' : '已下架'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无产品</p>
              <Link 
                href="/admin/products/new" 
                className="text-accent hover:underline text-sm mt-2 inline-block"
              >
                添加第一个产品
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
