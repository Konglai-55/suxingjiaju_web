import { NextResponse } from 'next/server'
import { markSubmissionAsRead, deleteContactSubmission } from '@/lib/queries'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const submission = await markSubmissionAsRead(id)
    
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error marking submission as read:', error)
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteContactSubmission(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 })
  }
}
