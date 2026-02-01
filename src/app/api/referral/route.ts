import { NextRequest, NextResponse } from 'next/server'
import { createReferralLead, getReferralStats } from '@/lib/odoo'

// Create a referral
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.referrerEmail || !data.referredName || !data.referredEmail) {
      return NextResponse.json(
        { success: false, error: 'Alle Felder sind erforderlich' },
        { status: 400 }
      )
    }

    const result = await createReferralLead({
      referrerEmail: data.referrerEmail,
      referredName: data.referredName,
      referredEmail: data.referredEmail,
      referredPhone: data.referredPhone || '',
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Empfehlung erfolgreich übermittelt! Vielen Dank.',
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Empfehlung konnte nicht erstellt werden' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Referral API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    )
  }
}

// Get referral stats for a customer
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

    const result = await getReferralStats(email)

    return NextResponse.json({
      success: result.success,
      stats: result.stats,
      error: result.error,
    })
  } catch (error) {
    console.error('Referral API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    )
  }
}
