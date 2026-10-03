import { NextRequest, NextResponse } from 'next/server'
import {
  getProducts,
  createProduct,
  getProductsCount,
  getProductCountByCategory,
} from '@/lib/queries'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive') === 'true'
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const countByCategory = searchParams.get('countByCategory')

    if (countByCategory) {
      const count = await getProductCountByCategory(countByCategory)
      return NextResponse.json({ count })
    }

    const options = {
      category: category || undefined,
      isActive: searchParams.has('isActive') ? isActive : undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    }

    const products = await getProducts(options)
    return NextResponse.json(products)
  } catch (error) {
    console.error('获取产品列表失败:', error)
    return NextResponse.json(
      { error: '获取产品列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const product = await createProduct(data)
    return NextResponse.json(product)
  } catch (error) {
    console.error('创建产品失败:', error)
    return NextResponse.json(
      { error: '创建产品失败' },
      { status: 500 }
    )
  }
}
