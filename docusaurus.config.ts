import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import links from './src/utils/links';


const config: Config = {
  title: 'Flutter Interview Prep',
  tagline: 'Curated Flutter interview questions and answers.',
  favicon: 'img/flutter/icon_flutter.png',
  future: { v4: true },
  url: links.hostedCoreURL,
  baseUrl: "/",
  organizationName: 'narayann7',
  projectName: 'flutter-interview-prep',
  deploymentBranch: 'main',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/narayann7/flutter-interview-prep/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: 'dark',
    },


    navbar: {

      title: 'Flutter Interview Prep',
      logo: {
        alt: 'Flutter Interview Prep Logo',
        src: 'img/flutter/icon_flutter.svg',
      },
      items: [
        {
          href: links.githubLink + '/flutter-interview-prep',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: links.gmailLink,
          label: 'Contact',
          position: 'right',
        }
      ],
    },
    prism: {
      theme: prismThemes.oceanicNext,
      darkTheme: prismThemes.oceanicNext,
      additionalLanguages: ['dart', 'java', 'graphql'],

    },
    metadata: [
      // --- Basic SEO ---
      {
        name: 'description',
        content:
          'Prepare for your Flutter interviews with curated questions, answers, and topic guides. Built for SDE2 aspirants and Flutter developers.',
      },
      {
        name: 'keywords',
        content:
          'Flutter, Dart, interview questions, SDE, coding prep, DSA, software developer, mobile app, technical interview, flutter web',
      },
      { name: 'author', content: 'Narayann Dev' },
      { name: 'robots', content: 'index, follow' },

      // --- Open Graph (for social sharing) ---
      { property: 'og:title', content: 'Flutter Interview Prep Guide' },
      {
        property: 'og:description',
        content:
          'Curated Flutter interview questions and detailed answers for aspiring SDE2 and mobile developers.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: links.hostedCoreURL },
      // { property: 'og:image', content: 'https://narayann.dev/img/flutter-cover.png' },

      // --- Twitter Cards ---
      // { name: 'twitter:card', content: 'summary_large_image' },
      // { name: 'twitter:title', content: 'Flutter Interview Prep Guide' },
      // {
      //   name: 'twitter:description',
      //   content:
      //     'Ace your Flutter interviews with topic-wise curated questions, examples, and explanations.',
      // },
      // { name: 'twitter:image', content: 'https://narayann.dev/img/flutter-cover.png' },
      // { name: 'twitter:creator', content: '@narayann_dev' },

      // --- Canonical ---
      // { rel: 'canonical', href: 'https://narayann.dev/flutter-interview-prep/' },
    ],

  },
};

export default config;
