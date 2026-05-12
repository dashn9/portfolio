import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main part of the title (before the italic)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEm',
      title: 'Title — italic part',
      type: 'string',
      description: 'Optional italic suffix rendered in the serif style',
    }),
    defineField({
      name: 'titleTail',
      title: 'Title — tail',
      type: 'string',
      description: 'Optional plain text after the italic part',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cat',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Essay', value: 'ESSAY'},
          {title: 'Notes', value: 'NOTES'},
          {title: 'Letter', value: 'LETTER'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description shown in the post listing',
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      titleEm: 'titleEm',
      date: 'publishedAt',
      cat: 'cat',
    },
    prepare({title, titleEm, date, cat}) {
      return {
        title: title + (titleEm ? ` ${titleEm}` : ''),
        subtitle: [cat, date?.slice(0, 10)].filter(Boolean).join(' · '),
      }
    },
  },
})
