'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  StarOff,
  Package
} from 'lucide-react'
import type { Product, Category } from '@/lib/types'

interface ProductsTableProps {
  products: Product[]
  categories: Category[]
}

export function ProductsTable({ products: initialProducts, categories }: ProductsTableProps) {
  const [products, setProducts] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const toggleActive = async (id: string, currentState: boolean) => {
    setIsLoading(id)
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggleActive' }),
      })

      if (response.ok) {
        const updated = await response.json()
        setProducts(products.map(p => 
          p.id === id ? { ...p, is_active: updated.is_active } : p
        ))
      }
    } catch (error) {
      console.error('切换状态失败:', error)
    }
    setIsLoading(null)
  }

  const toggleFeatured = async (id: string, currentState: boolean) => {
    setIsLoading(id)
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggleFeatured' }),
      })

      if (response.ok) {
        const updated = await response.json()
        setProducts(products.map(p => 
          p.id === id ? { ...p, is_featured: updated.is_featured } : p
        ))
      }
    } catch (error) {
      console.error('切换精选状态失败:', error)
    }
    setIsLoading(null)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('确定要删除这个产品吗？此操作不可恢复。')) return
    
    setIsLoading(id)
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
        router.refresh()
      }
    } catch (error) {
      console.error('删除产品失败:', error)
    }
    setIsLoading(null)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">图片</TableHead>
            <TableHead>产品名称</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>材质</TableHead>
            <TableHead className="text-center">状态</TableHead>
            <TableHead className="text-center">精选</TableHead>
            <TableHead className="w-20">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                  {product.category}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {product.material || '-'}
              </TableCell>
              <TableCell className="text-center">
                <span className={`px-2 py-1 text-xs rounded ${
                  product.is_active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.is_active ? '已上架' : '已下架'}
                </span>
              </TableCell>
              <TableCell className="text-center">
                {product.is_featured && (
                  <Star className="h-4 w-4 text-amber-500 mx-auto fill-amber-500" />
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      disabled={isLoading === product.id}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/admin/products/${product.id}`)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleActive(product.id, product.is_active)}>
                      {product.is_active ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          下架
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          上架
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleFeatured(product.id, product.is_featured)}>
                      {product.is_featured ? (
                        <>
                          <StarOff className="h-4 w-4 mr-2" />
                          取消精选
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2" />
                          设为精选
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
