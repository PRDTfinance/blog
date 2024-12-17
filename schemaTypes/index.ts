import {SchemaTypeDefinition} from 'sanity'

import blockContent from './blockContent'
import post from './post'
import category from './category'
import author from './author'
import banner from './banner'

export const schemaTypes = [category, author, post, blockContent, banner]
export const schema: {types: SchemaTypeDefinition[]} = {
  types: [category, author, post, blockContent, banner],
}
