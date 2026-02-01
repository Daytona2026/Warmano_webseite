import { NextRequest, NextResponse } from 'next/server'
import { processBookingWithSign, testConnection, type BookingData } from '@/lib/odoo'

export async function POST(request: NextRequest) {
  try {
    const data: BookingData = await request.json()

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'zipCode', 'city', 'package', 'manufacturer']
    for (const field of requiredFields) {
      if (!data[field as keyof BookingData]) {
        return NextResponse.json(
          { success: false, error: `Feld "${field}" ist erforderlich` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Ungültige E-Mail-Adresse' },
        { status: 400 }
      )
    }

    // Process the booking in Odoo with Sign integration
    const result = await processBookingWithSign(data)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.signUrl
          ? 'Bitte unterschreiben Sie nun Ihren Vertrag'
          : 'Buchung erfolgreich - Sie können nun Ihren Termin buchen',
        leadId: result.leadId,
        partnerId: result.partnerId,
        signUrl: result.signUrl,
        appointmentUrl: result.appointmentUrl,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Buchung fehlgeschlagen' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { success: false, error: 'Serverfehler bei der Buchung' },
      { status: 500 }
    )
  }
}

// Test endpoint for checking Odoo connection and listing Sign templates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    if (action === 'templates') {
      // List available Sign templates
      const { listSignTemplates } = await import('@/lib/odoo')
      const templates = await listSignTemplates()
      return NextResponse.json({
        success: true,
        templates,
      })
    }

    if (action === 'modules') {
      // Check installed modules
      const { checkOdooModules } = await import('@/lib/odoo')
      const modules = await checkOdooModules()
      return NextResponse.json({
        success: true,
        ...modules,
      })
    }

    if (action === 'template-details') {
      // Get template details with roles
      const { getSignTemplateDetails, findSignTemplate } = await import('@/lib/odoo')
      const templateId = await findSignTemplate('WARMANO Wartungsvertrag.pdf')
      if (!templateId) {
        return NextResponse.json({ success: false, error: 'Template not found' })
      }
      const details = await getSignTemplateDetails(templateId)
      return NextResponse.json({
        success: true,
        templateId,
        details,
      })
    }

    if (action === 'model-fields') {
      // Get fields for a model to debug
      const model = searchParams.get('model') || 'sign.send.request'
      const { getModelFields } = await import('@/lib/odoo')
      const fields = await getModelFields(model)
      return NextResponse.json({
        success: true,
        model,
        fields,
      })
    }

    if (action === 'sign-items') {
      // Get sign items from the template
      const { findSignTemplate, getSignItems, getTemplateRoleIds } = await import('@/lib/odoo')
      const templateId = await findSignTemplate('WARMANO Wartungsvertrag.pdf')
      if (!templateId) {
        return NextResponse.json({ success: false, error: 'Template not found' })
      }
      const signItems = await getSignItems(templateId)
      const roleIds = await getTemplateRoleIds(templateId)
      return NextResponse.json({
        success: true,
        templateId,
        signItems,
        roleIds,
      })
    }

    // Default: test connection
    const result = await testConnection()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Odoo-Verbindung erfolgreich',
        uid: result.uid,
      })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Connection test error:', error)
    return NextResponse.json(
      { success: false, error: 'Verbindungstest fehlgeschlagen' },
      { status: 500 }
    )
  }
}
