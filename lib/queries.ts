import { neon } from '@neondatabase/serverless'
import type { Product, Category, ContactSubmission } from './types'

export const sql = neon(process.env.DATABASE_URL!)

// Categories queries
export async function getCategories(): Promise<Category[]> {
  const result = await sql`
    SELECT * FROM categories
    ORDER BY sort_order ASC
  `
  return result as Category[]
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const result = await sql`
    SELECT * FROM categories WHERE id = ${id}
  `
  return (result[0] as Category) || null
}

export async function createCategory(data: {
  name: string
  description?: string
  sort_order?: number
}): Promise<Category> {
  const result = await sql`
    INSERT INTO categories (name, description, sort_order)
    VALUES (${data.name}, ${data.description || null}, ${data.sort_order || 0})
    RETURNING *
  `
  return result[0] as Category
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string; sort_order?: number }
): Promise<Category | null> {
  const result = await sql`
    UPDATE categories 
    SET name = COALESCE(${data.name}, name),
        description = COALESCE(${data.description}, description),
        sort_order = COALESCE(${data.sort_order}, sort_order)
    WHERE id = ${id} 
    RETURNING *
  `
  return (result[0] as Category) || null
}

export async function deleteCategory(id: string): Promise<void> {
  await sql`DELETE FROM categories WHERE id = ${id}`
}

// Products queries
export async function getProducts(
  options?: {
    category?: string
    isActive?: boolean
    limit?: number
    offset?: number
  }
): Promise<Product[]> {
  const result = await sql`SELECT * FROM products ORDER BY sort_order ASC`
  let filtered = result as Product[]
  
  if (options?.isActive !== undefined) {
    filtered = filtered.filter(p => p.is_active === options.isActive)
  }
  
  if (options?.category) {
    filtered = filtered.filter(p => p.category === options.category)
  }
  
  if (options?.offset) {
    filtered = filtered.slice(options.offset)
  }
  
  if (options?.limit) {
    filtered = filtered.slice(0, options.limit)
  }
  
  return filtered
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await sql`SELECT * FROM products WHERE id = ${id}`
  return (result[0] as Product) || null
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const result = await sql`
    SELECT * FROM products
    WHERE is_featured = true AND is_active = true
    ORDER BY sort_order ASC
    LIMIT ${limit}
  `
  return result as Product[]
}

export async function createProduct(data: {
  name: string
  description?: string
  category: string
  material?: string
  dimensions?: string
  image_url?: string
  is_featured?: boolean
  is_active?: boolean
  sort_order?: number
}): Promise<Product> {
  const result = await sql`
    INSERT INTO products (name, description, category, material, dimensions, image_url, is_featured, is_active, sort_order)
    VALUES (
      ${data.name}, 
      ${data.description || null}, 
      ${data.category}, 
      ${data.material || null}, 
      ${data.dimensions || null}, 
      ${data.image_url || null}, 
      ${data.is_featured || false}, 
      ${data.is_active !== false}, 
      ${data.sort_order || 0}
    )
    RETURNING *
  `
  return result[0] as Product
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product | null> {
  const result = await sql`
    UPDATE products SET
      name = COALESCE(${data.name}, name),
      description = COALESCE(${data.description}, description),
      category = COALESCE(${data.category}, category),
      material = COALESCE(${data.material}, material),
      dimensions = COALESCE(${data.dimensions}, dimensions),
      image_url = COALESCE(${data.image_url}, image_url),
      is_featured = COALESCE(${data.is_featured}, is_featured),
      is_active = COALESCE(${data.is_active}, is_active),
      sort_order = COALESCE(${data.sort_order}, sort_order),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `
  return (result[0] as Product) || null
}

export async function deleteProduct(id: string): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`
}

export async function toggleProductActive(id: string): Promise<Product | null> {
  const result = await sql`
    UPDATE products 
    SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ${id} 
    RETURNING *
  `
  return (result[0] as Product) || null
}

export async function toggleProductFeatured(id: string): Promise<Product | null> {
  const result = await sql`
    UPDATE products 
    SET is_featured = NOT is_featured, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ${id} 
    RETURNING *
  `
  return (result[0] as Product) || null
}

export async function getProductsCount(options?: {
  category?: string
  isActive?: boolean
  isFeatured?: boolean
}): Promise<number> {
  const result = await sql`SELECT * FROM products`
  let filtered = result as Product[]
  
  if (options?.category) {
    filtered = filtered.filter(p => p.category === options.category)
  }
  
  if (options?.isActive !== undefined) {
    filtered = filtered.filter(p => p.is_active === options.isActive)
  }
  
  if (options?.isFeatured !== undefined) {
    filtered = filtered.filter(p => p.is_featured === options.isFeatured)
  }
  
  return filtered.length
}

export async function getCategoriesCount(): Promise<number> {
  const result = await sql`SELECT * FROM categories`
  return result.length
}

export async function getProductCountByCategory(category: string): Promise<number> {
  const result = await sql`SELECT * FROM products WHERE category = ${category}`
  return result.length
}

export async function getRecentProducts(limit: number = 5): Promise<Product[]> {
  const result = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return result as Product[]
}

// Contact Submissions queries
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const result = await sql`
    SELECT * FROM contact_submissions
    ORDER BY created_at DESC
  `
  return result as ContactSubmission[]
}

export async function getUnreadSubmissionsCount(): Promise<number> {
  const result = await sql`SELECT * FROM contact_submissions WHERE is_read = false`
  return result.length
}

export async function createContactSubmission(data: {
  name: string
  phone: string
  email?: string
  company?: string
  message: string
}): Promise<ContactSubmission> {
  const result = await sql`
    INSERT INTO contact_submissions (name, phone, email, company, message)
    VALUES (${data.name}, ${data.phone}, ${data.email || null}, ${data.company || null}, ${data.message})
    RETURNING *
  `
  return result[0] as ContactSubmission
}

export async function markSubmissionAsRead(id: string): Promise<ContactSubmission | null> {
  const result = await sql`
    UPDATE contact_submissions SET is_read = true WHERE id = ${id} RETURNING *
  `
  return (result[0] as ContactSubmission) || null
}

export async function deleteContactSubmission(id: string): Promise<void> {
  await sql`DELETE FROM contact_submissions WHERE id = ${id}`
}
