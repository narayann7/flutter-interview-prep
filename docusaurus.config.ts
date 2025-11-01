import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const isDev = process.env.NODE_ENV === 'development';

const config: Config = {
  title: 'Flutter Interview Prep',
  tagline: 'Curated Flutter interview questions and answers.',
  favicon: 'img/favicon.ico',
  future: { v4: true },
  url: 'https://narayann.dev',
  baseUrl: isDev ? '/' : '/flutter-interview-prep/',
  organizationName: 'narayann7',
  projectName: 'flutter-interview-prep',
  deploymentBranch: 'gh-pages',

  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
    },
    navbar: {
      title: 'Flutter Interview Prep',
      logo: {
        alt: 'Flutter Interview Prep Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/narayann7/flutter-interview-prep',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Start', to: '/docs/intro' }],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/flutter' },
            { label: 'Twitter', href: 'https://x.com/docusaurus' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Narayann. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    metadata: [
      {
        name: 'description',
        content: 'Prepare for your Flutter interviews with curated questions and answers.',
      },
      {
        name: 'keywords',
        content: 'Flutter, Dart, interview questions, SDE, coding prep',
      },
    ],
  },
};

export default config;
