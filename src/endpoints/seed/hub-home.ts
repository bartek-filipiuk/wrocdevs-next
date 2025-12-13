import type { RequiredDataFromCollectionSlug } from 'payload'

// Helper to create simple rich text
const createRichText = (text: string) => ({
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
            text,
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
})

export const hubHome: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'WrocDevs - Strona główna',
  hero: {
    type: 'none',
  },
  layout: [
    // GlassHero Block
    {
      blockType: 'glassHero',
      blockName: 'Hero Section',
      headline: 'WrocDevs - Społeczność Developerów Wrocławia',
      subheadline: createRichText(
        'Dołącz do naszych meetupów, poznawaj ludzi ze świata IT i rozwijaj się razem z nami. Spotkania, prezentacje i networking dla programistów z Wrocławia.',
      ),
      primaryCTA: {
        type: 'custom',
        appearance: 'default',
        label: 'Nadchodzące wydarzenia',
        url: '/events',
        newTab: false,
      },
      secondaryCTA: {
        type: 'custom',
        appearance: 'outline',
        label: 'Dołącz do nas',
        url: '/contact',
        newTab: false,
      },
    },
    // Upcoming Events Block
    {
      blockType: 'upcomingEvents',
      blockName: 'Nadchodzące wydarzenia',
      sectionTitle: 'Nadchodzące wydarzenia',
      sectionDescription: 'Nie przegap najbliższych spotkań! Zarezerwuj miejsce już dziś.',
      events: [
        {
          title: 'Czy AI może być naszym juniorem?',
          description:
            'Meetup o wykorzystaniu AI w codziennej pracy developera. Czy sztuczna inteligencja może zastąpić juniora w zespole?',
          date: '2026-01-28T18:00:00.000Z',
          location: 'inQube Wrocław, ul. Wielka 67',
          link: {
            type: 'custom',
            label: 'Zarejestruj się',
            url: '/events/czy-ai-moze-byc-naszym-juniorem',
            newTab: false,
          },
        },
      ],
      viewAllLink: {
        type: 'custom',
        label: 'Wszystkie wydarzenia',
        url: '/events',
        newTab: false,
      },
    },
    // Testimonials Block
    {
      blockType: 'testimonials',
      blockName: 'Opinie',
      sectionTitle: 'Co mówią o nas',
      sectionDescription: 'Poznaj opinie uczestników naszych spotkań.',
      testimonials: [
        {
          quote:
            'WrocDevs to świetna okazja do poznania ludzi z branży. Każdy meetup to nowe kontakty i ciekawe rozmowy.',
          author: 'Uczestnik meetupu',
          role: 'Software Developer',
          rating: 5,
        },
        {
          quote:
            'Prezentacje na wysokim poziomie, a atmosfera zawsze sprzyja networkingowi. Polecam każdemu developerowi z Wrocławia!',
          author: 'Uczestnik meetupu',
          role: 'Tech Lead',
          rating: 5,
        },
      ],
    },
    // Contact CTA Block
    {
      blockType: 'contactCTA',
      blockName: 'Dołącz do nas',
      headline: 'Dołącz do społeczności WrocDevs!',
      description: createRichText(
        'Bądź na bieżąco z nadchodzącymi wydarzeniami. Śledź nas w mediach społecznościowych i nie przegap żadnego meetupu.',
      ),
      contactEmail: 'kontakt@wrocdevs.pl',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/company/wrocdevs' },
        { platform: 'discord', url: 'https://discord.gg/wrocdevs' },
        { platform: 'github', url: 'https://github.com/wrocdevs' },
      ],
      primaryCTA: {
        type: 'custom',
        appearance: 'default',
        label: 'Dołącz do Discorda',
        url: 'https://discord.gg/wrocdevs',
        newTab: true,
      },
    },
  ],
  meta: {
    title: 'WrocDevs - Społeczność Developerów Wrocławia',
    description:
      'Dołącz do meetupów dla programistów z Wrocławia. Prezentacje, networking i wymiana wiedzy ze społecznością IT.',
  },
}
