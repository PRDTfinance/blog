import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import category from './category'
import author from './author'

export const schemaTypes = [category,author,post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category,author,post, blockContent,],
}