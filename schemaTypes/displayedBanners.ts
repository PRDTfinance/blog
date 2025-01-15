import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'displayedBanner',
  title: 'Displayed Banner',
  type: 'document',
  fields: [
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
})
