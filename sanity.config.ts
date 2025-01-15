import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

export default defineConfig({
  name: 'default',
  title: 'PRDT Blog',

  projectId: 'm4iqov3f',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            ...S.documentTypeListItems().filter((item: any) => item.getId() !== 'faq'),
            orderableDocumentListDeskItem({type: 'faq', title: 'FAQs', S, context}),
            // ... all other desk items
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: () => {
      return [
        ...schemaTypes,
        {
          name: 'faq',
          title: 'FAQ',
          type: 'document',
          // Optional: The plugin also exports a set of 'orderings' for use in other Document Lists
          // https://www.sanity.io/docs/sort-orders
          orderings: [orderRankOrdering],
          fields: [
            // Minimum required configuration
            orderRankField({type: 'faq'}),

            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
            },
          },
        },
      ]
    },
  },
})
