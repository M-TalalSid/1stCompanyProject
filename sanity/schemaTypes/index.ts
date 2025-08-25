import { type SchemaTypeDefinition } from 'sanity'
import user from './user'
import order  from './order'
import { product } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user , product , order
],
}