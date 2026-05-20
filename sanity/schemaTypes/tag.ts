import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Displayed name, e.g. "Rust" or "Anti-detection".',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {title: 'title'},
  },
})
