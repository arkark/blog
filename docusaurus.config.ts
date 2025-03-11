import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeFootnotesWithTitle from "./src/rehype/footnotes-with-title";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const svg = {
  // https://fontawesome.com/icons/rss?f=classic&s=solid
  rss: `<div style="width: 1.1em; height: 1.1em; vertical-align: -0.125em;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg></div>`,
  // https://fontawesome.com/icons/x-twitter?f=brands&s=solid
  xTwitter: `<div style="width: 1.1em; height: 1.1em; vertical-align: -0.125em;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></div>`,
};

const config: Config = {
  title: "XS-Spin Blog",
  favicon: "img/favicon.ico",

  url: "https://blog.arkark.dev",
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    {
      href: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
      type: "text/css",
      integrity:
        "sha512-fHwaWebuwA7NSF5Qg/af4UeDx9XqUpYpOGgubo3yWu+b2IQR4UeQwbb42Ti7gVAjNtVoI/I9TEoYeu9omwcC6g==",
      crossorigin: "anonymous",
      referrerpolicy: "no-referrer",
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/arkark/blog/tree/main/",

          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",

          blogSidebarCount: "ALL",
          blogSidebarTitle: "All posts",

          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex, rehypeFootnotesWithTitle],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-589KLZJZPC",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/ark_white_512x512.png",
    navbar: {
      title: "XS-Spin Blog",
      logo: {
        alt: "ark",
        src: "img/ark_128x128.png",
      },
      items: [
        {
          href: "https://arkark.dev",
          label: "About me",
          position: "left",
        },
        {
          type: "html",
          value: `<a href="https://x.com/arkark_" target="_blank" rel="noopener noreferrer">${svg.xTwitter}</a>`,
          position: "left",
        },
        {
          type: "html",
          value: `<a href="/rss.xml" target="_blank">${svg.rss}</a>`,
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `© 2020-${new Date().getFullYear()} Ark`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.okaidia,
      additionalLanguages: [
        // ref. https://github.com/PrismJS/prism/blob/v1.29.0/components.json#L42
        "java",
        "php",
        "bash",
        "docker",
        "nginx",
        "apacheconf",
        "properties",
      ],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
    },
    metadata: [{ name: "twitter:card", content: "summary" }],
  } satisfies Preset.ThemeConfig,
};

export default config;
