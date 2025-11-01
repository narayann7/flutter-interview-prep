import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';


const coreDomainUrl = "https://narayann.dev"
const baseGitHubUrl = 'https://github.com/narayann7/';
const config: Config = {
  title: 'Flutter Interview Prep',
  tagline: 'Prepare for your Flutter interviews with curated questions and answers.',
  favicon: 'img/favicon.ico',
  future: { v4: true },

  // ✅ For GitHub Pages
  url: 'https://narayann7.github.io',
  baseUrl: '/flutter-interview-prep/',

  organizationName: 'narayann7',
  projectName: 'flutter-interview-prep',

  onBrokenLinks: 'throw',
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
          editUrl: ({ versionDocsDirPath, docPath }) =>
            `${baseGitHubUrl}flutter-interview-prep/blob/main/${versionDocsDirPath}/${docPath}`,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
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
          href: `${baseGitHubUrl}flutter-interview-prep`,
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
          items: [{ label: 'Intro', to: '/docs/intro' }],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
            { label: 'X', href: 'https://x.com/docusaurus' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Narayan N. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};
