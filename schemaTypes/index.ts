import {SchemaTypeDefinition} from 'sanity'

import blockContent from './blockContent'
import post from './post'
import category from './category'
import author from './author'
import banner from './banner'
import displayedBanner from './displayedBanners'

export const schemaTypes = [category, author, post, blockContent, banner, displayedBanner]
export const schema: {types: SchemaTypeDefinition[]} = {
  types: [category, author, post, blockContent, banner, displayedBanner],
}
