import { NextRequest, NextResponse } from 'next/server'
import {
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '@/lib/queries'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    const category = await getCategoryById(id)

    if (!category) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('获取分类失败:', error)
    return NextResponse.json(
      { error: '获取分类失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    const data = await request.json()

    const category = await updateCategory(id, data)
    if (!category) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('更新分类失败:', error)
    return NextResponse.json(
      { error: '更新分类失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    await deleteCategory(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除分类失败:', error)
    return NextResponse.json(
      { error: '删除分类失败' },
      { status: 500 }
    )
  }
}
