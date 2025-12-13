import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { firstEvent } from './first-event'
import { home } from './home'
import { hubHome } from './hub-home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'events',
  'forms',
  'form-submissions',
  'search',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding events...`)

  const eventDoc = await payload.create({
    collection: 'events',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: firstEvent,
  })

  // Add English translation for event
  await payload.update({
    collection: 'events',
    id: eventDoc.id,
    locale: 'en',
    context: {
      disableRevalidate: true,
    },
    data: {
      title: 'Can AI be our junior developer?',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'We invite you to a meetup dedicated to the use of artificial intelligence in everyday developer work. Together we will consider whether AI can act as a junior in a programming team, what its capabilities and limitations are, and how to effectively use AI tools in the software development process.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      meta: {
        title: 'Can AI be our junior developer? - WrocDevs Meetup',
        description:
          'WrocDevs meetup about using AI in developer work. January 28, 2026, inQube Wrocław.',
      },
    },
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [homePage, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      context: {
        disableRevalidate: true,
      },
      data: hubHome,
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  // Add English translation for homepage
  await payload.update({
    collection: 'pages',
    id: homePage.id,
    locale: 'en',
    context: {
      disableRevalidate: true,
    },
    data: {
      title: 'WrocDevs - Home',
      layout: [
        // GlassHero Block
        {
          blockType: 'glassHero',
          blockName: 'Hero Section',
          headline: 'WrocDevs - Wrocław Developer Community',
          subheadline: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Join our meetups, meet people from the IT world and grow together with us. Presentations, networking and knowledge sharing for developers from Wrocław.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          primaryCTA: {
            type: 'custom',
            appearance: 'default',
            label: 'Upcoming Events',
            url: '/events',
            newTab: false,
          },
          secondaryCTA: {
            type: 'custom',
            appearance: 'outline',
            label: 'Join Us',
            url: '/contact',
            newTab: false,
          },
        },
        // Upcoming Events Block
        {
          blockType: 'upcomingEvents',
          blockName: 'Upcoming Events',
          sectionTitle: 'Upcoming Events',
          sectionDescription: "Don't miss the upcoming meetups! Reserve your spot today.",
          events: [
            {
              title: 'Can AI be our junior developer?',
              description:
                'A meetup about using AI in everyday developer work. Can artificial intelligence replace a junior on the team?',
              date: '2026-01-28T18:00:00.000Z',
              location: 'inQube Wrocław, ul. Wielka 67',
              link: {
                type: 'custom',
                label: 'Register',
                url: '/events/czy-ai-moze-byc-naszym-juniorem',
                newTab: false,
              },
            },
          ],
          viewAllLink: {
            type: 'custom',
            label: 'All Events',
            url: '/events',
            newTab: false,
          },
        },
        // Testimonials Block
        {
          blockType: 'testimonials',
          blockName: 'Testimonials',
          sectionTitle: 'What People Say About Us',
          sectionDescription: 'Read what our meetup participants have to say.',
          testimonials: [
            {
              quote:
                'WrocDevs is a great opportunity to meet people from the industry. Every meetup brings new contacts and interesting conversations.',
              author: 'Meetup Participant',
              role: 'Software Developer',
              rating: 5,
            },
            {
              quote:
                'High-quality presentations and an atmosphere that always encourages networking. I recommend it to every developer from Wrocław!',
              author: 'Meetup Participant',
              role: 'Tech Lead',
              rating: 5,
            },
          ],
        },
        // Contact CTA Block
        {
          blockType: 'contactCTA',
          blockName: 'Join Us',
          headline: 'Join the WrocDevs Community!',
          description: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Stay up to date with upcoming events. Follow us on social media and don\'t miss any meetup.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          contactEmail: 'kontakt@wrocdevs.pl',
          socialLinks: [
            { platform: 'linkedin', url: 'https://linkedin.com/company/wrocdevs' },
            { platform: 'discord', url: 'https://discord.gg/wrocdevs' },
            { platform: 'github', url: 'https://github.com/wrocdevs' },
          ],
          primaryCTA: {
            type: 'custom',
            appearance: 'default',
            label: 'Join Discord',
            url: 'https://discord.gg/wrocdevs',
            newTab: true,
          },
        },
      ],
      meta: {
        title: 'WrocDevs - Wrocław Developer Community',
        description:
          'Join meetups for developers from Wrocław. Presentations, networking and knowledge sharing with the IT community.',
      },
    },
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Wydarzenia',
              url: '/events',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Kontakt',
              url: '/contact',
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Wydarzenia',
              url: '/events',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Kontakt',
              url: '/contact',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
