/**
 * Odoo XML-RPC API Client
 *
 * This module provides a typed interface to communicate with Odoo's External API.
 * Used for creating leads, subscriptions, and calendar events from the booking form.
 */

const ODOO_URL = process.env.ODOO_URL || ''
const ODOO_DB = process.env.ODOO_DB || ''
const ODOO_USERNAME = process.env.ODOO_USERNAME || ''
const ODOO_API_KEY = process.env.ODOO_API_KEY || ''
const ODOO_APPOINTMENT_URL = 'https://warmano.odoo.com/book/warmano-wartungstermin'

// Types for Odoo operations
export interface OdooLead {
  name: string
  contact_name: string
  email_from: string
  phone: string
  street?: string
  zip?: string
  city?: string
  description?: string
  source_id?: number
  tag_ids?: number[]
}

export interface OdooSubscription {
  partner_id: number
  template_id: number
  date_start: string
  recurring_invoice_line_ids: Array<{
    product_id: number
    quantity: number
  }>
}

export interface OdooCalendarEvent {
  name: string
  start: string
  stop: string
  partner_ids: number[]
  description?: string
  location?: string
}

export interface BookingData {
  // Customer info
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  zipCode: string
  city: string
  // Booking details
  package: 'basis' | 'standard' | 'premium'
  contractDuration: '1year' | '3years'
  paymentFrequency: 'yearly' | 'monthly'
  // Heat pump info
  manufacturer: string
  model?: string
  installationYear?: string
  // Additional
  preferredDate?: string
  message?: string
}

/**
 * XML-RPC helper to make calls to Odoo
 */
async function xmlRpcCall(
  endpoint: string,
  method: string,
  params: unknown[]
): Promise<unknown> {
  const url = `${ODOO_URL}${endpoint}`

  // Build XML-RPC request body
  const xmlBody = buildXmlRpcRequest(method, params)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
    },
    body: xmlBody,
  })

  if (!response.ok) {
    throw new Error(`Odoo API error: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()
  return parseXmlRpcResponse(text)
}

/**
 * Build XML-RPC request body
 */
function buildXmlRpcRequest(method: string, params: unknown[]): string {
  const paramsXml = params.map((p) => `<param>${valueToXml(p)}</param>`).join('')

  return `<?xml version="1.0"?>
<methodCall>
  <methodName>${method}</methodName>
  <params>${paramsXml}</params>
</methodCall>`
}

/**
 * Convert JavaScript value to XML-RPC value
 */
function valueToXml(value: unknown): string {
  if (value === null || value === undefined) {
    return '<value><boolean>0</boolean></value>'
  }
  if (typeof value === 'boolean') {
    return `<value><boolean>${value ? 1 : 0}</boolean></value>`
  }
  if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return `<value><int>${value}</int></value>`
    }
    return `<value><double>${value}</double></value>`
  }
  if (typeof value === 'string') {
    return `<value><string>${escapeXml(value)}</string></value>`
  }
  if (Array.isArray(value)) {
    const items = value.map((v) => valueToXml(v)).join('')
    return `<value><array><data>${items}</data></array></value>`
  }
  if (typeof value === 'object') {
    const members = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `<member><name>${k}</name>${valueToXml(v)}</member>`)
      .join('')
    return `<value><struct>${members}</struct></value>`
  }
  return `<value><string>${String(value)}</string></value>`
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Parse XML-RPC response
 */
function parseXmlRpcResponse(xml: string): unknown {
  // Check for fault
  const faultMatch = xml.match(/<fault>[\s\S]*?<string>([\s\S]*?)<\/string>/)
  if (faultMatch) {
    throw new Error(`Odoo fault: ${faultMatch[1]}`)
  }

  // Simple extraction for common types
  // Integer (first occurrence after params)
  if (xml.includes('<params>')) {
    // Check for empty array
    if (xml.includes('<array><data></data></array>') || xml.includes('<array><data/></array>')) {
      return []
    }

    // Check for boolean false
    if (xml.includes('<boolean>0</boolean>')) {
      return false
    }

    // Check for boolean true
    if (xml.includes('<boolean>1</boolean>')) {
      return true
    }

    // Extract single integer
    const intMatch = xml.match(/<params>[\s\S]*?<int>(\d+)<\/int>/)
    if (intMatch && !xml.includes('<array>')) {
      return parseInt(intMatch[1], 10)
    }

    // Extract array of integers (for search results)
    if (xml.includes('<array>') && !xml.includes('<struct>')) {
      const intMatches = xml.match(/<int>(\d+)<\/int>/g)
      if (intMatches) {
        return intMatches.map(m => parseInt(m.replace(/<\/?int>/g, ''), 10))
      }
    }

    // Extract array of structs (for search_read results)
    if (xml.includes('<struct>')) {
      const results: Record<string, unknown>[] = []
      const structRegex = /<struct>([\s\S]*?)<\/struct>/g
      let structMatch
      while ((structMatch = structRegex.exec(xml)) !== null) {
        const obj: Record<string, unknown> = {}
        const memberRegex = /<member>\s*<name>(\w+)<\/name>\s*<value>(?:<(\w+)>)?([\s\S]*?)(?:<\/\2>)?<\/value>\s*<\/member>/g
        let memberMatch
        while ((memberMatch = memberRegex.exec(structMatch[1])) !== null) {
          const name = memberMatch[1]
          const type = memberMatch[2]
          const value = memberMatch[3]

          if (type === 'int' || type === 'i4') {
            obj[name] = parseInt(value, 10)
          } else if (type === 'boolean') {
            obj[name] = value === '1'
          } else if (type === 'double') {
            obj[name] = parseFloat(value)
          } else {
            obj[name] = value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
          }
        }
        if (Object.keys(obj).length > 0) {
          results.push(obj)
        }
      }
      return results.length > 0 ? results : []
    }

    // Extract single string
    const stringMatch = xml.match(/<params>[\s\S]*?<string>([\s\S]*?)<\/string>/)
    if (stringMatch) {
      return stringMatch[1]
    }
  }

  return null
}

/**
 * Authenticate and get user ID
 */
async function authenticate(): Promise<number> {
  const uid = await xmlRpcCall('/xmlrpc/2/common', 'authenticate', [
    ODOO_DB,
    ODOO_USERNAME,
    ODOO_API_KEY,
    {},
  ])

  if (!uid || uid === false) {
    throw new Error('Odoo authentication failed')
  }

  return uid as number
}

/**
 * Execute a method on an Odoo model
 */
export async function execute(
  model: string,
  method: string,
  args: unknown[],
  kwargs: Record<string, unknown> = {}
): Promise<unknown> {
  const uid = await authenticate()

  return xmlRpcCall('/xmlrpc/2/object', 'execute_kw', [
    ODOO_DB,
    uid,
    ODOO_API_KEY,
    model,
    method,
    args,
    kwargs,
  ])
}

/**
 * Create or find a partner (customer) in Odoo
 */
export async function createOrFindPartner(data: {
  name: string
  email: string
  phone: string
  street: string
  zip: string
  city: string
}): Promise<number> {
  // First, try to find existing partner by email
  const existingIds = await execute('res.partner', 'search', [
    [['email', '=', data.email]],
  ]) as number[]

  if (Array.isArray(existingIds) && existingIds.length > 0) {
    // Update existing partner
    await execute('res.partner', 'write', [
      existingIds,
      {
        phone: data.phone,
        street: data.street,
        zip: data.zip,
        city: data.city,
      },
    ])
    return existingIds[0]
  }

  // Create new partner
  const partnerId = await execute('res.partner', 'create', [
    {
      name: data.name,
      email: data.email,
      phone: data.phone,
      street: data.street,
      zip: data.zip,
      city: data.city,
      country_id: 57, // Germany
    },
  ])

  return partnerId as number
}

/**
 * Create a CRM lead in Odoo
 */
export async function createLead(data: BookingData): Promise<number> {
  const packageNames = {
    basis: 'Basis (249€/Jahr)',
    standard: 'Standard (349€/Jahr)',
    premium: 'Premium (499€/Jahr)',
  }

  const durationNames = {
    '1year': '1 Jahr',
    '3years': '3 Jahre (1. Jahr gratis)',
  }

  const paymentNames = {
    yearly: 'Jährlich',
    monthly: 'Monatlich',
  }

  const description = `
WARMANO Buchungsanfrage

Paket: ${packageNames[data.package]}
Vertragslaufzeit: ${durationNames[data.contractDuration]}
Zahlweise: ${paymentNames[data.paymentFrequency]}

Wärmepumpe:
- Hersteller: ${data.manufacturer}
- Modell: ${data.model || 'Nicht angegeben'}
- Installationsjahr: ${data.installationYear || 'Nicht angegeben'}

${data.preferredDate ? `Wunschtermin: ${data.preferredDate}` : ''}
${data.message ? `Nachricht: ${data.message}` : ''}
  `.trim()

  const leadId = await execute('crm.lead', 'create', [
    {
      name: `WARMANO ${packageNames[data.package]} - ${data.firstName} ${data.lastName}`,
      contact_name: `${data.firstName} ${data.lastName}`,
      email_from: data.email,
      phone: data.phone,
      street: data.street,
      zip: data.zipCode,
      city: data.city,
      description: description,
      type: 'opportunity', // or 'lead'
    },
  ])

  return leadId as number
}

/**
 * Create a calendar event for the maintenance appointment
 */
export async function createCalendarEvent(data: {
  partnerId: number
  title: string
  date: string
  street: string
  city: string
  description?: string
}): Promise<number> {
  // Parse date and create 2-hour time slot (default 9:00-11:00)
  const startDate = new Date(data.date)
  startDate.setHours(9, 0, 0, 0)
  const endDate = new Date(startDate)
  endDate.setHours(11, 0, 0, 0)

  const eventId = await execute('calendar.event', 'create', [
    {
      name: data.title,
      start: startDate.toISOString().replace('T', ' ').substring(0, 19),
      stop: endDate.toISOString().replace('T', ' ').substring(0, 19),
      partner_ids: [[6, 0, [data.partnerId]]], // Many2many relation syntax
      location: `${data.street}, ${data.city}`,
      description: data.description || '',
    },
  ])

  return eventId as number
}

/**
 * Main function to process a booking from the website
 */
export async function processBooking(data: BookingData): Promise<{
  success: boolean
  leadId?: number
  partnerId?: number
  calendarEventId?: number
  error?: string
}> {
  try {
    // 1. Create or find the customer
    const partnerId = await createOrFindPartner({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      street: data.street,
      zip: data.zipCode,
      city: data.city,
    })

    // 2. Create the CRM lead/opportunity
    const leadId = await createLead(data)

    // 3. Create calendar event if preferred date is provided
    let calendarEventId: number | undefined
    if (data.preferredDate) {
      const packageNames = {
        basis: 'Basis',
        standard: 'Standard',
        premium: 'Premium',
      }
      calendarEventId = await createCalendarEvent({
        partnerId,
        title: `WARMANO Wartung ${packageNames[data.package]} - ${data.firstName} ${data.lastName}`,
        date: data.preferredDate,
        street: data.street,
        city: data.city,
        description: `Wärmepumpe: ${data.manufacturer} ${data.model || ''}`,
      })
    }

    return {
      success: true,
      leadId,
      partnerId,
      calendarEventId,
    }
  } catch (error) {
    console.error('Odoo booking error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Test the Odoo connection
 */
export async function testConnection(): Promise<{
  success: boolean
  uid?: number
  error?: string
}> {
  try {
    const uid = await authenticate()
    return { success: true, uid }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Connection failed',
    }
  }
}

/**
 * List available methods on a model
 */
export async function listModelMethods(modelName: string): Promise<string[]> {
  try {
    // In Odoo, we can get methods by reading ir.model.access or checking the model's fields
    // However, XML-RPC doesn't expose method introspection directly
    // We can try common wizard method names
    const commonWizardMethods = [
      'action_apply',
      'action_grant_access',
      'action_open_wizard',
      'action_send',
      'action_confirm',
      'action_done',
      'button_apply',
      'process',
      'execute',
      'run',
    ]

    // Try each method to see if it exists
    const availableMethods: string[] = []
    for (const method of commonWizardMethods) {
      try {
        // Create a test record and try to call the method
        // This is not ideal but necessary for introspection via XML-RPC
        const testId = await execute(modelName, 'create', [{}])
        try {
          await execute(modelName, method, [[testId as number]])
          availableMethods.push(method)
        } catch {
          // Method doesn't exist or failed - that's ok
        }
        // Clean up
        try {
          await execute(modelName, 'unlink', [[testId as number]])
        } catch {
          // Ignore cleanup errors
        }
        break // We found one test, that's enough
      } catch {
        // Couldn't create test record
      }
    }

    return availableMethods.length > 0 ? availableMethods : ['(could not introspect methods)']
  } catch (error) {
    console.error('Error listing methods:', error)
    return []
  }
}

/**
 * Check available models matching a pattern
 */
export async function findModels(pattern: string): Promise<Array<{ model: string; name: string }>> {
  try {
    const models = await execute('ir.model', 'search_read', [
      [['model', 'ilike', pattern]],
      ['model', 'name'],
    ]) as Array<{ model: string; name: string }>
    return models || []
  } catch (error) {
    console.error('Error finding models:', error)
    return []
  }
}

/**
 * Get fields for a model (for debugging)
 */
export async function getModelFields(modelName: string): Promise<string[]> {
  try {
    const fields = await execute(modelName, 'fields_get', [[], ['string', 'type', 'required']]) as Record<string, unknown>

    // Extract field names from the struct response
    if (typeof fields === 'object' && fields !== null) {
      return Object.keys(fields)
    }
    return []
  } catch (error) {
    console.error(`Error getting fields for ${modelName}:`, error)
    return []
  }
}

/**
 * Get sign items for a template (for debugging)
 */
export async function getSignItems(templateId: number): Promise<unknown[]> {
  try {
    const signItems = await execute('sign.item', 'search_read', [
      [['template_id', '=', templateId]],
      ['name', 'type_id', 'responsible_id', 'required'],
    ])
    return signItems as unknown[]
  } catch (error) {
    console.error('Error getting sign items:', error)
    return []
  }
}

/**
 * Get the role IDs used in a sign template by reading the template's sign_item_ids
 */
export async function getTemplateRoleIds(templateId: number): Promise<number[]> {
  try {
    // First get the template to get sign_item_ids
    const templates = await execute('sign.template', 'read', [
      [templateId],
      ['sign_item_ids'],
    ]) as Array<{ sign_item_ids?: number[] | string }>

    if (!templates || templates.length === 0) {
      return []
    }

    // Parse sign_item_ids - might come as XML or array
    let signItemIds: number[] = []
    const rawIds = templates[0].sign_item_ids

    if (typeof rawIds === 'string') {
      // Parse from XML format
      const matches = rawIds.match(/<int>(\d+)<\/int>/g)
      if (matches) {
        signItemIds = matches.map(m => parseInt(m.replace(/<\/?int>/g, ''), 10))
      }
    } else if (Array.isArray(rawIds)) {
      signItemIds = rawIds
    }

    console.log('Found sign item IDs:', signItemIds)

    if (signItemIds.length === 0) {
      return []
    }

    // Get the responsible_id (role) for each item - read all at once
    const roleIds = new Set<number>()

    for (const itemId of signItemIds) {
      try {
        const items = await execute('sign.item', 'read', [
          [itemId],
          ['responsible_id'],
        ]) as Array<{ responsible_id?: unknown }>

        console.log(`Sign item ${itemId} response:`, JSON.stringify(items))

        if (items && items[0]) {
          const respId = items[0].responsible_id
          // Handle different formats: [id, name], id, or string with XML
          if (Array.isArray(respId) && respId.length > 0) {
            roleIds.add(respId[0] as number)
          } else if (typeof respId === 'number') {
            roleIds.add(respId)
          } else if (typeof respId === 'string') {
            const match = respId.match(/<int>(\d+)<\/int>/)
            if (match) {
              roleIds.add(parseInt(match[1], 10))
            }
          }
        }
      } catch (e) {
        console.log(`Error reading sign item ${itemId}:`, e)
      }
    }

    console.log('Found role IDs:', Array.from(roleIds))
    return Array.from(roleIds)
  } catch (error) {
    console.error('Error getting template role IDs:', error)
    return []
  }
}

/**
 * Check Odoo modules and Sign availability
 */
export async function checkOdooModules(): Promise<{
  signInstalled: boolean
  signModels: string[]
  installedApps: string[]
  error?: string
}> {
  try {
    // Check installed modules related to sign
    const signModules = await execute('ir.module.module', 'search_read', [
      [['name', 'ilike', 'sign'], ['state', '=', 'installed']],
      ['name', 'state'],
    ]) as Array<{ name: string; state: string }>

    // Check for sign-related models
    const signModels = await execute('ir.model', 'search_read', [
      [['model', 'ilike', 'sign']],
      ['model', 'name'],
    ]) as Array<{ model: string; name: string }>

    // Get all installed apps
    const installedApps = await execute('ir.module.module', 'search_read', [
      [['state', '=', 'installed'], ['application', '=', true]],
      ['name'],
    ]) as Array<{ name: string }>

    return {
      signInstalled: signModules && signModules.length > 0,
      signModels: signModels?.map(m => m.model) || [],
      installedApps: installedApps?.map(a => a.name) || [],
    }
  } catch (error) {
    return {
      signInstalled: false,
      signModels: [],
      installedApps: [],
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
    }
  }
}

/**
 * List all available Sign templates with their roles
 */
export async function listSignTemplates(): Promise<Array<{ id: number; name: string; sign_item_ids?: number[] }>> {
  try {
    const templateIds = await execute('sign.template', 'search', [[]]) as number[]

    if (!Array.isArray(templateIds) || templateIds.length === 0) {
      return []
    }

    // Get template details with sign items
    const templates = await execute('sign.template', 'read', [
      templateIds,
      ['name', 'sign_item_ids'],
    ]) as Array<{ id: number; name: string; sign_item_ids?: number[] }>

    return templates || []
  } catch (error) {
    console.error('Error listing Sign templates:', error)
    return []
  }
}

/**
 * Get Sign template details including roles
 */
export async function getSignTemplateDetails(templateId: number): Promise<{
  id: number
  name: string
  roles: Array<{ id: number; name: string }>
  signItemIds: number[]
} | null> {
  try {
    // Get template with sign items
    const templates = await execute('sign.template', 'read', [
      [templateId],
      ['name', 'sign_item_ids'],
    ]) as Array<{ id: number; name: string; sign_item_ids?: number[] }>

    if (!templates || templates.length === 0) {
      return null
    }

    const template = templates[0]

    // Get available roles
    const roles = await execute('sign.item.role', 'search_read', [
      [],
      ['name'],
    ]) as Array<{ id: number; name: string }>

    return {
      id: template.id,
      name: template.name,
      roles: roles || [],
      signItemIds: template.sign_item_ids || [],
    }
  } catch (error) {
    console.error('Error getting Sign template details:', error)
    return null
  }
}

/**
 * Find the Sign template by name
 */
export async function findSignTemplate(templateName: string): Promise<number | null> {
  try {
    const templateIds = await execute('sign.template', 'search', [
      [['name', 'ilike', templateName]],
    ]) as number[]

    if (Array.isArray(templateIds) && templateIds.length > 0) {
      return templateIds[0]
    }
    return null
  } catch (error) {
    console.error('Error finding Sign template:', error)
    return null
  }
}

/**
 * Create a Sign request for the customer to sign the contract
 * Creates sign.request directly instead of using wizard (more reliable via XML-RPC)
 */
export async function createSignRequest(data: {
  partnerId: number
  partnerName: string
  partnerEmail: string
  templateId: number
  packageName: string
  packagePrice: number
  contractDuration: string
}): Promise<{
  success: boolean
  signRequestId?: number
  signUrl?: string
  error?: string
}> {
  try {
    // Get the actual role IDs used in this template
    const templateRoleIds = await getTemplateRoleIds(data.templateId)
    console.log('Template role IDs for signing:', templateRoleIds)

    // Use the found role IDs, or fall back to role 7 (Unterzeichner 1 for this template)
    const roleId = templateRoleIds.length > 0 ? templateRoleIds[0] : 7

    // Create the sign.request directly
    console.log('Creating sign.request directly...')

    const signRequestId = await execute('sign.request', 'create', [
      {
        template_id: data.templateId,
        reference: `WARMANO Wartungsvertrag - ${data.partnerName}`,
        request_item_ids: [[0, 0, {
          partner_id: data.partnerId,
          role_id: roleId,
        }]],
      },
    ]) as number

    console.log('Created sign.request with ID:', signRequestId)

    if (!signRequestId || signRequestId <= 0) {
      return {
        success: false,
        error: 'Konnte keine Sign-Request erstellen',
      }
    }

    // Send the sign request to generate access tokens
    try {
      await execute('sign.request', 'action_sent', [[signRequestId]])
      console.log('Sign request sent successfully')
    } catch (e) {
      console.log('action_sent failed (might not be required):', e)
    }

    // Get the sign request item to retrieve the access token
    try {
      const requestItems = await execute('sign.request.item', 'search_read', [
        [['sign_request_id', '=', signRequestId]],
        ['access_token', 'partner_id'],
      ]) as Array<{ id: number; access_token?: string }>

      console.log('Request items:', JSON.stringify(requestItems))

      if (requestItems && requestItems.length > 0) {
        // Parse access_token from the response
        let accessToken: string | undefined
        const item = requestItems[0]

        if (typeof item.access_token === 'string') {
          // Check if it's raw XML or actual token
          if (item.access_token.includes('<string>')) {
            const match = item.access_token.match(/<string>([^<]+)<\/string>/)
            accessToken = match ? match[1] : undefined
          } else {
            accessToken = item.access_token
          }
        }

        if (accessToken) {
          return {
            success: true,
            signRequestId,
            signUrl: `${ODOO_URL}/sign/document/${signRequestId}/${accessToken}`,
          }
        }
      }
    } catch (e) {
      console.log('Could not get request items:', e)
    }

    // Fallback: try to get access_token from the sign.request itself
    try {
      const signRequest = await execute('sign.request', 'read', [
        [signRequestId],
        ['access_token'],
      ]) as Array<{ access_token?: string }>

      if (signRequest?.[0]?.access_token) {
        let token = signRequest[0].access_token
        if (token.includes('<string>')) {
          const match = token.match(/<string>([^<]+)<\/string>/)
          token = match ? match[1] : token
        }
        return {
          success: true,
          signRequestId,
          signUrl: `${ODOO_URL}/sign/document/${signRequestId}/${token}`,
        }
      }
    } catch (e) {
      console.log('Could not get sign request access token:', e)
    }

    // Final fallback - use portal URL
    return {
      success: true,
      signRequestId,
      signUrl: `${ODOO_URL}/my/signature/${signRequestId}`,
    }
  } catch (error) {
    console.error('Error creating Sign request:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Sign request failed',
    }
  }
}

/**
 * Find subscription product by name
 */
export async function findSubscriptionProduct(packageName: string): Promise<number | null> {
  try {
    const productIds = await execute('product.product', 'search', [
      [['name', 'ilike', `WARMANO ${packageName}`], ['recurring_invoice', '=', true]],
    ]) as number[]

    if (Array.isArray(productIds) && productIds.length > 0) {
      return productIds[0]
    }

    // Fallback: search without recurring filter
    const fallbackIds = await execute('product.product', 'search', [
      [['name', 'ilike', `WARMANO ${packageName}`]],
    ]) as number[]

    if (Array.isArray(fallbackIds) && fallbackIds.length > 0) {
      return fallbackIds[0]
    }

    return null
  } catch (error) {
    console.error('Error finding subscription product:', error)
    return null
  }
}

/**
 * Create a subscription for the customer
 */
export async function createSubscription(data: {
  partnerId: number
  productId: number
  packageName: string
  contractDuration: '1year' | '3years'
}): Promise<{
  success: boolean
  subscriptionId?: number
  error?: string
}> {
  try {
    // Calculate end date based on duration
    const startDate = new Date()
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + (data.contractDuration === '3years' ? 3 : 1))

    const subscriptionId = await execute('sale.subscription', 'create', [
      {
        partner_id: data.partnerId,
        date_start: startDate.toISOString().split('T')[0],
        date: endDate.toISOString().split('T')[0],
        pricelist_id: 1, // Default pricelist
        stage_id: 1, // Draft stage
      },
    ]) as number

    // Add subscription line
    await execute('sale.subscription.line', 'create', [
      {
        analytic_account_id: subscriptionId,
        product_id: data.productId,
        name: `WARMANO ${data.packageName} Wartungspaket`,
        quantity: 1,
      },
    ])

    return {
      success: true,
      subscriptionId,
    }
  } catch (error) {
    console.error('Error creating subscription:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Subscription creation failed',
    }
  }
}

/**
 * Process booking with Sign integration
 * Creates partner, sends Sign request, and returns URL for signing
 */
export async function processBookingWithSign(data: BookingData): Promise<{
  success: boolean
  partnerId?: number
  leadId?: number
  signUrl?: string
  appointmentUrl?: string
  portalUrl?: string
  error?: string
}> {
  try {
    // 1. Create or find the customer
    const partnerId = await createOrFindPartner({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      street: data.street,
      zip: data.zipCode,
      city: data.city,
    })

    // 2. Create the CRM lead/opportunity
    const leadId = await createLead(data)

    // 3. Grant portal access and send registration email
    console.log('Granting portal access to customer...')
    const portalResult = await grantPortalAccess(partnerId)
    if (portalResult.success) {
      console.log('Portal access granted successfully, user ID:', portalResult.userId)
    } else {
      console.warn('Portal access could not be granted:', portalResult.error)
      // Continue anyway - sign and appointment still work
    }

    // 3b. Create subscription order
    const packagePricesForSub = {
      basis: { name: 'Basis', price: 249 },
      standard: { name: 'Standard', price: 349 },
      premium: { name: 'Premium', price: 499 },
    }
    const pkgForSub = packagePricesForSub[data.package]

    console.log('Creating subscription order...')
    const subscriptionResult = await createSubscriptionOrder({
      partnerId,
      packageName: pkgForSub.name,
      packagePrice: pkgForSub.price,
      contractDuration: data.contractDuration,
      paymentFrequency: data.paymentFrequency,
    })
    if (subscriptionResult.success) {
      console.log('Subscription order created:', subscriptionResult.orderName)
    } else {
      console.warn('Subscription order failed:', subscriptionResult.error)
      // Continue anyway
    }

    // 4. Find the Sign template (search with .pdf extension)
    const templateId = await findSignTemplate('WARMANO Wartungsvertrag.pdf')

    if (!templateId) {
      // If no Sign template found, return with appointment URL directly
      console.warn('Sign template not found, skipping signature step')
      return {
        success: true,
        partnerId,
        leadId,
        appointmentUrl: `${ODOO_APPOINTMENT_URL}?partner_id=${partnerId}`,
        portalUrl: `${ODOO_URL}/my`,
      }
    }

    // 5. Get package details
    const packagePrices = {
      basis: { name: 'Basis', price: 249, price3y: 498 },
      standard: { name: 'Standard', price: 349, price3y: 698 },
      premium: { name: 'Premium', price: 499, price3y: 998 },
    }
    const pkg = packagePrices[data.package]
    const price = data.contractDuration === '3years' ? pkg.price3y : pkg.price

    // 6. Create Sign request
    const signResult = await createSignRequest({
      partnerId,
      partnerName: `${data.firstName} ${data.lastName}`,
      partnerEmail: data.email,
      templateId,
      packageName: pkg.name,
      packagePrice: price,
      contractDuration: data.contractDuration,
    })

    if (!signResult.success) {
      // If Sign fails, still return success with appointment URL
      console.warn('Sign request failed:', signResult.error)
      return {
        success: true,
        partnerId,
        leadId,
        appointmentUrl: `${ODOO_APPOINTMENT_URL}?partner_id=${partnerId}`,
        portalUrl: `${ODOO_URL}/my`,
      }
    }

    return {
      success: true,
      partnerId,
      leadId,
      signUrl: signResult.signUrl,
      appointmentUrl: `${ODOO_APPOINTMENT_URL}?partner_id=${partnerId}`,
      portalUrl: `${ODOO_URL}/my`,
    }
  } catch (error) {
    console.error('Odoo booking with sign error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get the appointment booking URL
 */
export function getAppointmentUrl(partnerId?: number): string {
  if (partnerId) {
    return `${ODOO_APPOINTMENT_URL}?partner_id=${partnerId}`
  }
  return ODOO_APPOINTMENT_URL
}

/**
 * Grant portal access to a customer and send invitation email
 * Note: portal.wizard doesn't work via XML-RPC, so we use direct user creation
 */
export async function grantPortalAccess(partnerId: number): Promise<{
  success: boolean
  portalUrl?: string
  userId?: number
  error?: string
}> {
  try {
    console.log('Granting portal access to partner:', partnerId)

    // First, get partner details
    const partners = await execute('res.partner', 'read', [
      [partnerId],
      ['name', 'email'],
    ]) as Array<{ name: string; email: string }>

    if (!partners || partners.length === 0) {
      return {
        success: false,
        error: 'Partner not found',
      }
    }

    const partner = partners[0]
    if (!partner.email) {
      return {
        success: false,
        error: 'Partner has no email address',
      }
    }

    // Create portal user directly
    const result = await createPortalUser({
      partnerId,
      email: partner.email,
      name: partner.name,
    })

    if (result.success) {
      return {
        success: true,
        portalUrl: `${ODOO_URL}/my`,
        userId: result.userId,
      }
    }

    return {
      success: false,
      error: result.error || 'Portal user creation failed',
    }
  } catch (error) {
    console.error('Error granting portal access:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Portal access failed',
    }
  }
}

/**
 * Create a portal user directly via res.users
 * This is more reliable than using the portal.wizard via XML-RPC
 *
 * The process:
 * 1. Create user without groups (creates with default internal user role)
 * 2. Use write with group_ids command 6 to replace groups with portal only
 * 3. Send password reset email so user can set their password
 */
export async function createPortalUser(data: {
  partnerId: number
  email: string
  name: string
}): Promise<{
  success: boolean
  userId?: number
  error?: string
}> {
  try {
    console.log('Creating portal user for partner:', data.partnerId)

    // Check if user already exists for this partner
    const existingUsers = await execute('res.users', 'search', [
      [['partner_id', '=', data.partnerId]]
    ]) as number[]

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      console.log('User already exists for partner:', existingUsers[0])
      // Try to send password reset email
      try {
        await execute('res.users', 'action_reset_password', [[existingUsers[0]]])
        console.log('Password reset email sent to existing user')
      } catch (e) {
        console.log('Could not send password reset email:', e)
      }
      return {
        success: true,
        userId: existingUsers[0],
      }
    }

    // Find the portal group ID via XML ID (base.group_portal)
    let portalGroupId: number | null = null
    try {
      const xmlIdResult = await execute('ir.model.data', 'search_read', [
        [['module', '=', 'base'], ['name', '=', 'group_portal']],
        ['res_id'],
      ]) as Array<{ res_id: number }>

      if (xmlIdResult && xmlIdResult.length > 0) {
        portalGroupId = xmlIdResult[0].res_id
        console.log('Found portal group via XML ID:', portalGroupId)
      }
    } catch (e) {
      console.log('Could not find portal group via XML ID:', e)
      // Hardcoded fallback - we know it's 10 from our tests
      portalGroupId = 10
    }

    if (!portalGroupId) {
      return {
        success: false,
        error: 'Portal group not found',
      }
    }

    // Step 1: Create the user (will be created as internal user by default)
    console.log('Creating user for email:', data.email)
    const userId = await execute('res.users', 'create', [
      {
        name: data.name,
        login: data.email,
        email: data.email,
        partner_id: data.partnerId,
        active: true,
      }
    ]) as number

    console.log('User created with ID:', userId)

    // Step 2: Replace user groups with portal group only
    // Command 6 = replace all relations with these IDs
    // This removes the internal user group and sets only portal
    try {
      await execute('res.users', 'write', [
        [userId],
        { group_ids: [[6, 0, [portalGroupId]]] }
      ])
      console.log('User converted to portal user')
    } catch (e) {
      console.log('Could not set portal group:', e)
      // User was created but might be internal - still usable
    }

    // Step 3: Send password reset email so user can set their password
    try {
      await execute('res.users', 'action_reset_password', [[userId]])
      console.log('Password reset email sent to new portal user')
    } catch (e) {
      console.log('Could not send password reset email:', e)
    }

    return {
      success: true,
      userId,
    }
  } catch (error) {
    console.error('Error creating portal user:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'User creation failed',
    }
  }
}

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================

/**
 * Create a subscription/recurring sale order for the customer
 */
export async function createSubscriptionOrder(data: {
  partnerId: number
  packageName: string
  packagePrice: number
  contractDuration: '1year' | '3years'
  paymentFrequency: 'yearly' | 'monthly'
}): Promise<{
  success: boolean
  orderId?: number
  orderName?: string
  error?: string
}> {
  try {
    console.log('Creating subscription order for partner:', data.partnerId)

    // Find or create the product for this package
    let productId: number | null = null
    const productName = `WARMANO ${data.packageName} Wartungspaket`

    // Search for existing product
    const existingProducts = await execute('product.product', 'search', [
      [['name', '=', productName]]
    ]) as number[]

    if (Array.isArray(existingProducts) && existingProducts.length > 0) {
      productId = existingProducts[0]
    } else {
      // Create product if not exists
      productId = await execute('product.product', 'create', [
        {
          name: productName,
          type: 'service',
          list_price: data.packagePrice,
          recurring_invoice: true,
        }
      ]) as number
    }

    // Calculate pricing based on contract duration
    let unitPrice = data.packagePrice
    if (data.contractDuration === '3years') {
      // First year free - so 2 years for 3 year contract
      unitPrice = (data.packagePrice * 2) / 3
    }

    // Create sale order
    const orderId = await execute('sale.order', 'create', [
      {
        partner_id: data.partnerId,
        is_subscription: true,
        note: `WARMANO Wartungsvertrag - ${data.packageName}\nLaufzeit: ${data.contractDuration === '3years' ? '3 Jahre (1. Jahr gratis)' : '1 Jahr'}\nZahlweise: ${data.paymentFrequency === 'monthly' ? 'Monatlich' : 'Jährlich'}`,
      }
    ]) as number

    // Add order line
    await execute('sale.order.line', 'create', [
      {
        order_id: orderId,
        product_id: productId,
        name: productName,
        product_uom_qty: 1,
        price_unit: unitPrice,
      }
    ])

    // Get order name
    const orders = await execute('sale.order', 'read', [
      [orderId],
      ['name'],
    ]) as Array<{ name: string }>

    console.log('Subscription order created:', orderId)

    return {
      success: true,
      orderId,
      orderName: orders?.[0]?.name,
    }
  } catch (error) {
    console.error('Error creating subscription:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Subscription creation failed',
    }
  }
}

// ============================================
// HELPDESK / SUPPORT TICKETS
// ============================================

export interface HelpdeskTicketData {
  partnerId?: number
  partnerEmail: string
  partnerName: string
  subject: string
  description: string
  priority?: '0' | '1' | '2' | '3' // 0=Low, 1=Medium, 2=High, 3=Urgent
}

/**
 * Create a helpdesk ticket
 */
export async function createHelpdeskTicket(data: HelpdeskTicketData): Promise<{
  success: boolean
  ticketId?: number
  ticketNumber?: string
  error?: string
}> {
  try {
    console.log('Creating helpdesk ticket for:', data.partnerEmail)

    // Find or create partner
    let partnerId = data.partnerId
    if (!partnerId) {
      const existingPartners = await execute('res.partner', 'search', [
        [['email', '=', data.partnerEmail]]
      ]) as number[]

      if (Array.isArray(existingPartners) && existingPartners.length > 0) {
        partnerId = existingPartners[0]
      } else {
        partnerId = await execute('res.partner', 'create', [
          {
            name: data.partnerName,
            email: data.partnerEmail,
          }
        ]) as number
      }
    }

    // Find helpdesk team (use first available)
    const teams = await execute('helpdesk.team', 'search', [[]]) as number[]
    const teamId = Array.isArray(teams) && teams.length > 0 ? teams[0] : null

    // Create ticket
    const ticketData: Record<string, unknown> = {
      name: data.subject,
      description: data.description,
      partner_id: partnerId,
      partner_email: data.partnerEmail,
      priority: data.priority || '1',
    }

    if (teamId) {
      ticketData.team_id = teamId
    }

    const ticketId = await execute('helpdesk.ticket', 'create', [ticketData]) as number

    // Get ticket number
    const tickets = await execute('helpdesk.ticket', 'read', [
      [ticketId],
      ['ticket_ref', 'name'],
    ]) as Array<{ ticket_ref?: string; name: string }>

    console.log('Helpdesk ticket created:', ticketId)

    return {
      success: true,
      ticketId,
      ticketNumber: tickets?.[0]?.ticket_ref || `#${ticketId}`,
    }
  } catch (error) {
    console.error('Error creating helpdesk ticket:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ticket creation failed',
    }
  }
}

/**
 * Get tickets for a partner
 */
export async function getPartnerTickets(partnerEmail: string): Promise<{
  success: boolean
  tickets?: Array<{
    id: number
    number: string
    subject: string
    status: string
    createDate: string
  }>
  error?: string
}> {
  try {
    // Find partner
    const partners = await execute('res.partner', 'search', [
      [['email', '=', partnerEmail]]
    ]) as number[]

    if (!Array.isArray(partners) || partners.length === 0) {
      return { success: true, tickets: [] }
    }

    // Get tickets
    const ticketIds = await execute('helpdesk.ticket', 'search', [
      [['partner_id', '=', partners[0]]]
    ]) as number[]

    if (!Array.isArray(ticketIds) || ticketIds.length === 0) {
      return { success: true, tickets: [] }
    }

    const ticketsData = await execute('helpdesk.ticket', 'read', [
      ticketIds,
      ['ticket_ref', 'name', 'stage_id', 'create_date'],
    ]) as Array<{
      id: number
      ticket_ref?: string
      name: string
      stage_id?: [number, string]
      create_date: string
    }>

    const tickets = ticketsData.map(t => ({
      id: t.id,
      number: t.ticket_ref || `#${t.id}`,
      subject: t.name,
      status: Array.isArray(t.stage_id) ? t.stage_id[1] : 'Neu',
      createDate: t.create_date,
    }))

    return { success: true, tickets }
  } catch (error) {
    console.error('Error getting partner tickets:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get tickets',
    }
  }
}

// ============================================
// INVOICES & PAYMENTS
// ============================================

/**
 * Get invoices for a partner
 */
export async function getPartnerInvoices(partnerEmail: string): Promise<{
  success: boolean
  invoices?: Array<{
    id: number
    number: string
    date: string
    dueDate: string
    amount: number
    amountDue: number
    status: 'draft' | 'posted' | 'paid' | 'cancelled'
    pdfUrl?: string
  }>
  error?: string
}> {
  try {
    // Find partner
    const partners = await execute('res.partner', 'search', [
      [['email', '=', partnerEmail]]
    ]) as number[]

    if (!Array.isArray(partners) || partners.length === 0) {
      return { success: true, invoices: [] }
    }

    // Get invoices (account.move with move_type = out_invoice)
    const invoiceIds = await execute('account.move', 'search', [
      [
        ['partner_id', '=', partners[0]],
        ['move_type', '=', 'out_invoice'],
      ]
    ]) as number[]

    if (!Array.isArray(invoiceIds) || invoiceIds.length === 0) {
      return { success: true, invoices: [] }
    }

    const invoicesData = await execute('account.move', 'read', [
      invoiceIds,
      ['name', 'invoice_date', 'invoice_date_due', 'amount_total', 'amount_residual', 'state', 'payment_state'],
    ]) as Array<{
      id: number
      name: string
      invoice_date: string
      invoice_date_due: string
      amount_total: number
      amount_residual: number
      state: string
      payment_state: string
    }>

    const invoices = invoicesData.map(inv => ({
      id: inv.id,
      number: inv.name,
      date: inv.invoice_date,
      dueDate: inv.invoice_date_due,
      amount: inv.amount_total,
      amountDue: inv.amount_residual,
      status: (inv.payment_state === 'paid' ? 'paid' : inv.state) as 'draft' | 'posted' | 'paid' | 'cancelled',
      pdfUrl: `${ODOO_URL}/my/invoices/${inv.id}`,
    }))

    return { success: true, invoices }
  } catch (error) {
    console.error('Error getting partner invoices:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get invoices',
    }
  }
}

// ============================================
// REFERRAL PROGRAM
// ============================================

/**
 * Create a referral lead when someone uses a referral code
 */
export async function createReferralLead(data: {
  referrerEmail: string
  referredName: string
  referredEmail: string
  referredPhone: string
}): Promise<{
  success: boolean
  leadId?: number
  referrerId?: number
  error?: string
}> {
  try {
    console.log('Creating referral lead from:', data.referrerEmail)

    // Find referrer partner
    const referrers = await execute('res.partner', 'search', [
      [['email', '=', data.referrerEmail]]
    ]) as number[]

    const referrerId = Array.isArray(referrers) && referrers.length > 0 ? referrers[0] : null

    // Create lead for referred person
    const leadId = await execute('crm.lead', 'create', [
      {
        name: `Empfehlung: ${data.referredName}`,
        contact_name: data.referredName,
        email_from: data.referredEmail,
        phone: data.referredPhone,
        description: `Empfohlen von: ${data.referrerEmail}\n\nDieser Lead wurde über das Empfehlungsprogramm erstellt.`,
        referred: referrerId || undefined,
        source_id: 1, // Website source - adjust as needed
      }
    ]) as number

    console.log('Referral lead created:', leadId)

    return {
      success: true,
      leadId,
      referrerId: referrerId || undefined,
    }
  } catch (error) {
    console.error('Error creating referral lead:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Referral creation failed',
    }
  }
}

/**
 * Get referral statistics for a partner
 */
export async function getReferralStats(partnerEmail: string): Promise<{
  success: boolean
  stats?: {
    totalReferrals: number
    successfulReferrals: number
    pendingReferrals: number
    referralCode: string
  }
  error?: string
}> {
  try {
    // Find partner
    const partners = await execute('res.partner', 'search', [
      [['email', '=', partnerEmail]]
    ]) as number[]

    if (!Array.isArray(partners) || partners.length === 0) {
      return {
        success: true,
        stats: {
          totalReferrals: 0,
          successfulReferrals: 0,
          pendingReferrals: 0,
          referralCode: '',
        }
      }
    }

    const partnerId = partners[0]

    // Generate referral code from partner ID
    const referralCode = `WARMANO-${partnerId.toString().padStart(5, '0')}`

    // Count referrals (leads where description contains the referrer email)
    const allReferrals = await execute('crm.lead', 'search_count', [
      [['description', 'ilike', partnerEmail]]
    ]) as number

    // Count won referrals
    const wonReferrals = await execute('crm.lead', 'search_count', [
      [
        ['description', 'ilike', partnerEmail],
        ['stage_id.is_won', '=', true],
      ]
    ]) as number

    return {
      success: true,
      stats: {
        totalReferrals: allReferrals || 0,
        successfulReferrals: wonReferrals || 0,
        pendingReferrals: (allReferrals || 0) - (wonReferrals || 0),
        referralCode,
      }
    }
  } catch (error) {
    console.error('Error getting referral stats:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get referral stats',
    }
  }
}

// ============================================
// LIVECHAT CONFIGURATION
// ============================================

/**
 * Get LiveChat channel configuration for embedding
 */
export async function getLiveChatConfig(): Promise<{
  success: boolean
  channelId?: number
  channelUuid?: string
  error?: string
}> {
  try {
    // Find first active livechat channel
    const channels = await execute('im_livechat.channel', 'search_read', [
      [],
      ['id', 'name'],
    ]) as Array<{ id: number; name: string }>

    if (!Array.isArray(channels) || channels.length === 0) {
      return {
        success: false,
        error: 'No LiveChat channel found',
      }
    }

    return {
      success: true,
      channelId: channels[0].id,
    }
  } catch (error) {
    console.error('Error getting LiveChat config:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get LiveChat config',
    }
  }
}
