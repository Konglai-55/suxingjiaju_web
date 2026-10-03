export interface Product {
  id: string
  name: string
  description: string | null
  category: string
  material: string | null
  dimensions: string | null
  image_url: string | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string | null
  sort_order: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  phone: string
  email: string | null
  company: string | null
  message: string
  is_read: boolean
  created_at: string
}
