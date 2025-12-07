import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'
import { hubHome } from './src/endpoints/seed/hub-home'

async function seedHubHome() {
  console.log('Starting hub home seed...')

  const payload = await getPayload({ config })

  // First, delete existing home page if any
  try {
    const existingHome = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (existingHome.docs.length > 0) {
      console.log('Deleting existing home page...')
      await payload.delete({
        collection: 'pages',
        id: existingHome.docs[0].id,
        context: {
          disableRevalidate: true,
        },
      })
    }
  } catch (e) {
    console.log('No existing home page found')
  }

  // Create the hub home page
  console.log('Creating hub home page...')
  const page = await payload.create({
    collection: 'pages',
    data: hubHome,
    context: {
      disableRevalidate: true,
    },
  })

  console.log(`Hub home page created with ID: ${page.id}`)
  console.log('Done! Visit http://localhost:3000 to see your new homepage.')

  process.exit(0)
}

seedHubHome().catch((err) => {
  console.error('Error seeding:', err)
  process.exit(1)
})
