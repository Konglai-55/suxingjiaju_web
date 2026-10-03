'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import type { Category } from '@/lib/types'

interface CategoriesManagerProps {
  categories: Category[]
  productCounts: Record<string, number>
}

export function CategoriesManager({ categories: initialCategories, productCounts }: CategoriesManagerProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [isOpen, setIsOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', sort_order: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const openDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        name: category.name,
        description: category.description || '',
        sort_order: category.sort_order,
      })
    } else {
      setEditingCategory(null)
      setFormData({ name: '', description: '', sort_order: 0 })
    }
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (editingCategory) {
        const response = await fetch(`/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('更新失败')
        const updated = await response.json()

        setCategories(categories.map(c =>
          c.id === editingCategory.id ? updated : c
        ))
      } else {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error('创建失败')
        const data = await response.json()
        setCategories([...categories, data])
      }

      setIsOpen(false)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('操作失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCategory = async (id: string, name: string) => {
    if (productCounts[name] > 0) {
      alert(`该分类下有 ${productCounts[name]} 个产品，请先移除产品后再删除分类`)
      return
    }

    if (!confirm('确定要删除这个分类吗？')) return

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id))
        router.refresh()
      }
    } catch (err) {
      console.error(err)
      alert('删除失败，请重试')
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              添加分类
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? '编辑分类' : '添加分类'}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory ? '修改分类信息' : '创建新的产品分类'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">分类名称</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="请输入分类名称"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">分类描述</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="请输入分类描述"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_order">排序</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    placeholder="数字越小越靠前"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  取消
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '保存中...' : '保存'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {categories.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>分类名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead className="text-center">产品数量</TableHead>
              <TableHead className="text-center">排序</TableHead>
              <TableHead className="w-24">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {category.description || '-'}
                </TableCell>
                <TableCell className="text-center">
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                    {productCounts[category.name] || 0}
                  </span>
                </TableCell>
                <TableCell className="text-center">{category.sort_order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDialog(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteCategory(category.id, category.name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12">
          <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">暂无分类</h3>
          <p className="text-muted-foreground mb-6">开始添加您的第一个分类</p>
          <Button onClick={() => openDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            添加分类
          </Button>
        </div>
      )}
    </div>
  )
}
