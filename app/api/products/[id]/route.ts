import { NextRequest, NextResponse } from 'next/server'
import {
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProductActive,
  toggleProductFeatured,
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
    const product = await getProductById(id)

    if (!product) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('获取产品失败:', error)
    return NextResponse.json(
      { error: '获取产品失败' },
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

    const product = await updateProduct(id, data)
    if (!product) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('更新产品失败:', error)
    return NextResponse.json(
      { error: '更新产品失败' },
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
    await deleteProduct(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除产品失败:', error)
    return NextResponse.json(
      { error: '删除产品失败' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    const { action } = await request.json()

    let result

    if (action === 'toggleActive') {
      result = await toggleProductActive(id)
    } else if (action === 'toggleFeatured') {
      result = await toggleProductFeatured(id)
    } else {
      return NextResponse.json(
        { error: '未知操作' },
        { status: 400 }
      )
    }

    if (!result) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('更新产品状态失败:', error)
    return NextResponse.json(
      { error: '更新产品状态失败' },
      { status: 500 }
    )
  }
}
