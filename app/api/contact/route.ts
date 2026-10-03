import { NextResponse } from 'next/server'
import { createContactSubmission, getContactSubmissions } from '@/lib/queries'

export async function GET() {
  try {
    const submissions = await getContactSubmissions()
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, company, message } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: '姓名、电话和留言为必填项' },
        { status: 400 }
      )
    }

    const submission = await createContactSubmission({
      name,
      phone,
      email,
      company,
      message,
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 })
  }
}
