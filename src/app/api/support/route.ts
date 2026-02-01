import { NextRequest, NextResponse } from 'next/server'
import { createHelpdeskTicket, getPartnerTickets } from '@/lib/odoo'

// Create a support ticket
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.email || !data.name || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    const result = await createHelpdeskTicket({
      partnerEmail: data.email,
      partnerName: data.name,
      subject: data.subject,
      description: data.message,
      priority: data.priority || '1',
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        ticketId: result.ticketId,
        ticketNumber: result.ticketNumber,
        message: `Ticket ${result.ticketNumber} wurde erstellt. Wir melden uns in Kürze.`,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Ticket konnte nicht erstellt werden' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Support API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    )
  }
}

// Get tickets for a customer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'E-Mail erforderlich' },
        { status: 400 }
      )
    }

    const result = await getPartnerTickets(email)

    return NextResponse.json({
      success: result.success,
      tickets: result.tickets || [],
      error: result.error,
    })
  } catch (error) {
    console.error('Support API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    )
  }
}
