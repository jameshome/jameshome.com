// content.config.mjs
import {
  ObsidianDocumentSchema,
  ObsidianMdLoader,
} from "astro-loader-obsidian";
import { defineCollection } from "astro:content";

export const collections = {
  documents: defineCollection({
    loader: ObsidianMdLoader({
      base: "src/content/vagabondage/",
      url: "notes",
    }),
    schema: ({ image }) =>
      ObsidianDocumentSchema.extend({
        image: image().optional(),
        // or
        cover: image().optional(),
      }),
  }),
};
