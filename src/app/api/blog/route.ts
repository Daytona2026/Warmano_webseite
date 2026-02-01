import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/odoo'

export const revalidate = 300 // Revalidate every 5 minutes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    const result = await getBlogPosts(limit, offset)

    if (result.success) {
      return NextResponse.json({
        success: true,
        posts: result.posts,
        total: result.total,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Blog API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    )
  }
}
