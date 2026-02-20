import { defineCollection } from "astro:content";
import { ObsidianMdLoader } from "astro-loader-obsidian";

const notes = defineCollection({
  loader: ObsidianMdLoader({
    base: "src/content/vagabondage",
    url: "notes",
  }),
});

export const collections = { notes };
