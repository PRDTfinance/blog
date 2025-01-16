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
            ...S.documentTypeListItems().filter((item: any) => item.getId() !== 'banner'),
            orderableDocumentListDeskItem({type: 'banner', title: 'Banners', S, context}),
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
          name: 'banner',
          title: 'Banner',
          type: 'document',
          orderings: [orderRankOrdering],
          fields: [
            orderRankField({type: 'banner'}),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'desktopImage',
              title: 'Desktop Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true,
              },
              description: 'Image with a 2:1 ratio is recommended.',
            }),
            defineField({
              name: 'mobileImage',
              title: 'Mobile Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true,
              },
              description: 'Image with a 1:1 ratio is recommended.',
            }),
            defineField({
              name: 'url',
              title: 'URL to Navigate',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                  allowRelative: false,
                }),
              description: 'Enter the URL to navigate when the banner is clicked.',
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              description: 'Mark this banner as active.',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'desktopImage',
              isActive: 'isActive',
            },
            prepare(selection) {
              const {title, isActive} = selection
              return {
                ...selection,
                title: isActive ? `✅ ${title}` : `❌ ${title}`,
              }
            },
          },
        },
      ]
    },
  },
})
