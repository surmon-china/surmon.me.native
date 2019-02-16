

// 分类数据
export interface ICategory {
  id?: number
  _id?: string
  pid?: string
  name: string
  slug: string
  count?: number
  description: string
  update_at: string
  create_at: string
  selected?: boolean
  checked?: boolean
  children?: ICategory[]
}