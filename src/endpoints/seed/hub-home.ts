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
  title: 'Hub Home',
  hero: {
    type: 'none',
  },
  layout: [
    // GlassHero Block
    {
      blockType: 'glassHero',
      blockName: 'Hero Section',
      headline: 'Your Community Hub for Learning & Connection',
      subheadline: createRichText(
        'Join our vibrant community of learners, creators, and innovators. Discover exciting meetups, hands-on courses, and networking opportunities.',
      ),
      primaryCTA: {
        type: 'custom',
        appearance: 'default',
        label: 'Explore Events',
        url: '/events',
        newTab: false,
      },
      secondaryCTA: {
        type: 'custom',
        appearance: 'outline',
        label: 'View Courses',
        url: '/courses',
        newTab: false,
      },
    },
    // Features Block
    {
      blockType: 'features',
      blockName: 'What We Offer',
      sectionTitle: 'What We Offer',
      sectionDescription:
        'Everything you need to grow, connect, and succeed in your professional journey.',
      features: [
        {
          icon: 'calendar',
          title: 'Weekly Meetups',
          description:
            'Connect with like-minded professionals at our regular community gatherings. Network, share ideas, and build lasting relationships.',
        },
        {
          icon: 'book',
          title: 'Expert-Led Courses',
          description:
            'Learn from industry experts in hands-on courses designed to accelerate your career. From beginner to advanced levels.',
        },
        {
          icon: 'users',
          title: 'Vibrant Community',
          description:
            'Join a supportive community of 5,000+ members. Collaborate on projects, find mentors, and grow together.',
        },
        {
          icon: 'star',
          title: 'Exclusive Workshops',
          description:
            'Participate in intensive workshops and hackathons. Put your skills to the test and learn by doing.',
        },
      ],
    },
    // Upcoming Events Block
    {
      blockType: 'upcomingEvents',
      blockName: 'Upcoming Events',
      sectionTitle: 'Upcoming Events',
      sectionDescription:
        "Don't miss out on these exciting upcoming events. Reserve your spot today!",
      events: [
        {
          title: 'Tech Talks: AI & Machine Learning',
          description:
            'Join us for an evening of insights into the latest AI trends and practical applications in business.',
          date: '2025-01-15T18:00:00.000Z',
          location: 'Downtown Innovation Hub',
          link: {
            type: 'custom',
            label: 'Register Now',
            url: '/events/tech-talks-ai',
            newTab: false,
          },
        },
        {
          title: 'Design Systems Workshop',
          description:
            'A hands-on workshop on building scalable design systems for modern web applications.',
          date: '2025-01-22T10:00:00.000Z',
          location: 'Creative Space Studio',
          link: {
            type: 'custom',
            label: 'Register Now',
            url: '/events/design-workshop',
            newTab: false,
          },
        },
        {
          title: 'Networking Night: Startup Edition',
          description:
            'Connect with founders, investors, and startup enthusiasts. Pitch your ideas and find co-founders.',
          date: '2025-02-01T19:00:00.000Z',
          location: 'Main Hall Conference Center',
          link: {
            type: 'custom',
            label: 'Register Now',
            url: '/events/networking-night',
            newTab: false,
          },
        },
      ],
      viewAllLink: {
        type: 'custom',
        label: 'View All Events',
        url: '/events',
        newTab: false,
      },
    },
    // Courses Showcase Block
    {
      blockType: 'coursesShowcase',
      blockName: 'Popular Courses',
      sectionTitle: 'Popular Courses',
      sectionDescription:
        'Accelerate your career with our most popular courses taught by industry experts.',
      courses: [
        {
          title: 'Full-Stack Web Development',
          description:
            'Master modern web development with React, Node.js, and databases. Build real-world projects from scratch.',
          duration: '12 weeks',
          level: 'beginner',
          price: '$499',
          link: {
            type: 'custom',
            label: 'Enroll Now',
            url: '/courses/web-development',
            newTab: false,
          },
        },
        {
          title: 'UI/UX Design Masterclass',
          description:
            'Learn user-centered design principles, Figma, prototyping, and how to create stunning user experiences.',
          duration: '8 weeks',
          level: 'intermediate',
          price: '$349',
          link: {
            type: 'custom',
            label: 'Enroll Now',
            url: '/courses/ui-ux-design',
            newTab: false,
          },
        },
        {
          title: 'Data Science & Analytics',
          description:
            'Dive into Python, machine learning, data visualization, and statistical analysis for data-driven decisions.',
          duration: '16 weeks',
          level: 'advanced',
          price: '$699',
          link: {
            type: 'custom',
            label: 'Enroll Now',
            url: '/courses/data-science',
            newTab: false,
          },
        },
      ],
      viewAllLink: {
        type: 'custom',
        label: 'Browse All Courses',
        url: '/courses',
        newTab: false,
      },
    },
    // Testimonials Block
    {
      blockType: 'testimonials',
      blockName: 'Testimonials',
      sectionTitle: 'What Our Community Says',
      sectionDescription:
        'Hear from members who have transformed their careers through our programs.',
      testimonials: [
        {
          quote:
            'The web development course completely changed my career trajectory. Within 3 months of completing it, I landed my dream job at a tech startup. The instructors are amazing!',
          author: 'Sarah Chen',
          role: 'Software Developer at TechCorp',
          rating: 5,
        },
        {
          quote:
            "I've attended dozens of meetups here and every single one has been valuable. The community is incredibly welcoming and I've made connections that have led to real business opportunities.",
          author: 'Michael Torres',
          role: 'Startup Founder',
          rating: 5,
        },
        {
          quote:
            "As someone transitioning from a non-tech background, the support I received was incredible. The courses are well-structured and the mentorship program is a game-changer.",
          author: 'Emily Johnson',
          role: 'Product Designer',
          rating: 5,
        },
      ],
    },
    // Contact CTA Block
    {
      blockType: 'contactCTA',
      blockName: 'Get Started',
      headline: 'Ready to Start Your Journey?',
      description: createRichText(
        'Join thousands of learners and professionals who are already part of our community. Get access to exclusive events, courses, and networking opportunities.',
      ),
      contactEmail: 'hello@yourhub.com',
      contactPhone: '+1 (555) 123-4567',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com/yourhub' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/yourhub' },
        { platform: 'discord', url: 'https://discord.gg/yourhub' },
        { platform: 'instagram', url: 'https://instagram.com/yourhub' },
      ],
      primaryCTA: {
        type: 'custom',
        appearance: 'default',
        label: 'Join the Community',
        url: '/register',
        newTab: false,
      },
    },
  ],
  meta: {
    title: 'Your Community Hub - Meetups, Courses & Networking',
    description:
      'Join our vibrant community for tech meetups, professional courses, and networking events. Learn, connect, and grow with us.',
  },
}
