// Adapted from https://equk.co.uk/2023/02/02/generating-slug-from-title-in-astro/

import { GENERATE_SLUG_FROM_TITLE } from '../types/config'

// Set GENERATE_SLUG_FROM_TITLE = true for generate slug from title
// Set GENERATE_SLUG_FROM_TITLE = false for generate slug from file name

export default function (title: string, staticSlug: string) {
  return (
    !GENERATE_SLUG_FROM_TITLE ? staticSlug : title
      // remove leading & trailing whitespace
      .trim()
      // output lowercase
      .toLowerCase()
      // remove accents and diacritics (including tildes from vowels)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      // replace spaces with hyphens
      .replace(/\s+/g, '-')
      // remove special characters (keep only letters, numbers and hyphens)
      .replace(/[^\w-]/g, '')
      // remove leading & trailing separators
      .replace(/^-+|-+$/g, '')
  )
}
