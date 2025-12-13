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

export const firstEvent: RequiredDataFromCollectionSlug<'events'> = {
  slug: 'czy-ai-moze-byc-naszym-juniorem',
  _status: 'published',
  title: 'Czy AI może być naszym juniorem?',
  description: createRichText(
    'Zapraszamy na meetup poświęcony wykorzystaniu sztucznej inteligencji w codziennej pracy developera. Zastanowimy się wspólnie, czy AI może pełnić rolę juniora w zespole programistycznym, jakie są jego możliwości i ograniczenia, oraz jak efektywnie wykorzystywać narzędzia AI w procesie tworzenia oprogramowania.',
  ),
  startDate: '2026-01-28T18:00:00.000Z',
  endDate: '2026-01-28T21:00:00.000Z',
  eventType: 'offline',
  location: {
    address: 'ul. Wielka 67',
    city: 'Wrocław',
    country: 'Polska',
  },
  isFree: true,
  agenda: [
    {
      startTime: '18:00',
      title: 'Powitanie i networking',
      description: 'Czas na przywitanie się i luźne rozmowy przy kawie.',
    },
    {
      startTime: '18:30',
      title: 'Główna prezentacja: AI jako junior developer',
      speaker: 'Prelegent TBA',
      description: 'Czy AI może zastąpić juniora w zespole? Analiza możliwości i ograniczeń.',
    },
    {
      startTime: '19:30',
      title: 'Przerwa kawowa',
    },
    {
      startTime: '19:45',
      title: 'Dyskusja panelowa i Q&A',
      description: 'Otwarta dyskusja z uczestnikami na temat praktycznego wykorzystania AI.',
    },
    {
      startTime: '20:30',
      title: 'Networking i zakończenie',
      description: 'Luźne rozmowy i wymiana kontaktów.',
    },
  ],
  meta: {
    title: 'Czy AI może być naszym juniorem? - WrocDevs Meetup',
    description:
      'Meetup WrocDevs o wykorzystaniu AI w pracy developera. 28 stycznia 2026, inQube Wrocław.',
  },
}
