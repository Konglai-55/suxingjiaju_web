import { NextRequest, NextResponse } from 'next/server'
import {
  getCategories,
  createCategory,
  getCategoriesCount,
} from '@/lib/queries'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const count = searchParams.get('count')

    if (count === 'true') {
      const total = await getCategoriesCount()
      return NextResponse.json({ count: total })
    }

    const categories = await getCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('获取分类列表失败:', error)
    return NextResponse.json(
      { error: '获取分类列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const category = await createCategory(data)
    return NextResponse.json(category)
  } catch (error) {
    console.error('创建分类失败:', error)
    return NextResponse.json(
      { error: '创建分类失败' },
      { status: 500 }
    )
  }
}
