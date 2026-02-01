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
        portalUrl: result.portalUrl,
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

    if (action === 'find-models') {
      const pattern = searchParams.get('pattern') || 'portal'
      const { findModels } = await import('@/lib/odoo')
      const models = await findModels(pattern)
      return NextResponse.json({ success: true, models })
    }

    if (action === 'list-methods') {
      const model = searchParams.get('model') || 'portal.wizard'
      const { listModelMethods } = await import('@/lib/odoo')
      const methods = await listModelMethods(model)
      return NextResponse.json({ success: true, model, methods })
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

    if (action === 'test-portal') {
      // Test portal user creation for existing partner
      const partnerId = parseInt(searchParams.get('partner_id') || '0')
      const { grantPortalAccess, createPortalUser } = await import('@/lib/odoo')

      if (!partnerId) {
        return NextResponse.json({ success: false, error: 'partner_id required' })
      }

      const portalResult = await grantPortalAccess(partnerId)
      if (portalResult.success) {
        return NextResponse.json({ method: 'grantPortalAccess', ...portalResult })
      }

      const userResult = await createPortalUser({
        partnerId,
        email: 'test@example.com',
        name: 'Test User',
      })
      return NextResponse.json({ method: 'createPortalUser', ...userResult })
    }

    if (action === 'find-portal-group') {
      // Find the portal group for debugging
      const { execute } = await import('@/lib/odoo')

      // Method 1: Search via ir.model.data
      let result: Record<string, unknown> = {}
      try {
        const xmlIdResult = await execute('ir.model.data', 'search_read', [
          [['module', '=', 'base'], ['name', '=', 'group_portal']],
          ['res_id', 'name', 'module'],
        ])
        result.xmlIdResult = xmlIdResult
      } catch (e) {
        result.xmlIdError = String(e)
      }

      // Method 2: Search res.groups directly
      try {
        const groups = await execute('res.groups', 'search_read', [
          [['name', 'ilike', 'portal']],
          ['name', 'id'],
        ])
        result.portalGroups = groups
      } catch (e) {
        result.groupsError = String(e)
      }

      return NextResponse.json({ success: true, ...result })
    }

    if (action === 'create-portal-user-debug') {
      // Debug portal user creation step by step
      const partnerId = parseInt(searchParams.get('partner_id') || '0')
      const { execute } = await import('@/lib/odoo')
      const result: Record<string, unknown> = { partnerId }

      if (!partnerId) {
        return NextResponse.json({ success: false, error: 'partner_id required' })
      }

      // Step 1: Get partner details
      try {
        const partner = await execute('res.partner', 'read', [
          [partnerId],
          ['name', 'email'],
        ])
        result.partner = partner
      } catch (e) {
        result.partnerError = String(e)
      }

      // Step 2: Check if user exists
      try {
        const existingUsers = await execute('res.users', 'search', [
          [['partner_id', '=', partnerId]]
        ])
        result.existingUsers = existingUsers
      } catch (e) {
        result.existingUsersError = String(e)
      }

      // Step 3: Try to create user (if none exists)
      if (!result.existingUsers || (Array.isArray(result.existingUsers) && result.existingUsers.length === 0)) {
        const portalGroupId = 10 // We know this from earlier

        try {
          const userId = await execute('res.users', 'create', [
            {
              name: 'Test Portal User',
              login: 'test-portal-' + Date.now() + '@example.com',
              email: 'test-portal-' + Date.now() + '@example.com',
              partner_id: partnerId,
              active: true,
              groups_id: [[4, portalGroupId]],
            }
          ])
          result.createdUserId = userId
        } catch (e) {
          result.createUserError = String(e)

          // Try without groups_id
          try {
            const userId = await execute('res.users', 'create', [
              {
                name: 'Test Portal User',
                login: 'test-portal2-' + Date.now() + '@example.com',
                email: 'test-portal2-' + Date.now() + '@example.com',
                partner_id: partnerId,
                active: true,
              }
            ])
            result.createdUserIdNoGroup = userId
          } catch (e2) {
            result.createUserNoGroupError = String(e2)
          }
        }
      }

      return NextResponse.json({ success: true, ...result })
    }

    if (action === 'add-user-to-group') {
      // Test adding a user to the portal group
      const userId = parseInt(searchParams.get('user_id') || '0')
      const { execute } = await import('@/lib/odoo')
      const result: Record<string, unknown> = { userId }

      if (!userId) {
        return NextResponse.json({ success: false, error: 'user_id required' })
      }

      const portalGroupId = 10

      // Method: Use command 6 to REPLACE groups (not add)
      // This removes the user from User group and sets only Portal group
      try {
        await execute('res.users', 'write', [
          [userId],
          { group_ids: [[6, 0, [portalGroupId]]] }
        ])
        result.replaceGroups = 'success - replaced groups with portal only'
      } catch (e) {
        result.replaceGroupsError = String(e)
      }

      // Verify user groups
      try {
        const user = await execute('res.users', 'read', [
          [userId],
          ['group_ids', 'login', 'email'],
        ])
        result.userAfter = user
      } catch (e) {
        result.userError = String(e)
      }

      return NextResponse.json({ success: true, ...result })
    }

    if (action === 'send-password-reset') {
      // Test sending password reset email
      const userId = parseInt(searchParams.get('user_id') || '0')
      const { execute } = await import('@/lib/odoo')
      const result: Record<string, unknown> = { userId }

      if (!userId) {
        return NextResponse.json({ success: false, error: 'user_id required' })
      }

      // Try different methods
      try {
        await execute('res.users', 'action_reset_password', [[userId]])
        result.actionResetPassword = 'success'
      } catch (e) {
        result.actionResetPasswordError = String(e)
      }

      try {
        // In newer Odoo versions this might be the method
        await execute('res.users', 'send_unregistered_user_reminder', [[userId]])
        result.sendReminder = 'success'
      } catch (e) {
        result.sendReminderError = String(e)
      }

      return NextResponse.json({ success: true, ...result })
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
