import { NextRequest, NextResponse } from 'next/server'
import { getPartnerInvoices } from '@/lib/odoo'

// Get invoices for a customer
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

    const result = await getPartnerInvoices(email)

    return NextResponse.json({
      success: result.success,
      invoices: result.invoices || [],
      error: result.error,
    })
  } catch (error) {
    console.error('Invoices API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    )
  }
}
