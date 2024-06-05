import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import purgecss from 'astro-purgecss';
import { defineConfig, squooshImageService } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
    site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
    base: config.site.base_path ? config.site.base_path : "/",
    trailingSlash: config.site.trailing_slash ? "always" : "never",
    image: {
        service: squooshImageService(),
    },
    integrations: [
        react(),
        sitemap(),
        tailwind({
            config: {
                applyBaseStyles: false,
            },
        }),
        AutoImport({
            imports: [
                "@/shortcodes/Button",
                "@/shortcodes/Accordion",
                "@/shortcodes/Notice",
                "@/shortcodes/Video",
                "@/shortcodes/Youtube",
                "@/shortcodes/Tabs",
                "@/shortcodes/Tab",
            ],
        }),
        mdx(),
        purgecss({
            fontFace: true,
            keyframes: true,
            variables: true,
            content: [
                process.cwd() + '/src/**/*.{astro,vue}' // Watching astro and vue sources (for SSR, read the note below)
            ],
            extractors: [
                {
                    extractor: (content) =>
                        content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
                    extensions: ["astro", "html"],
                },
            ],
        })
    ],
    markdown: {
        remarkPlugins: [
            remarkToc,
            [
                remarkCollapse,
                {
                    test: "Table of contents",
                },
            ],
        ],
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: true,
        },
        extendDefaultPlugins: true,
    },
});
