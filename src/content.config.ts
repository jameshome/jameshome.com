import { defineCollection } from "astro:content";
import { ObsidianMdLoader } from "astro-loader-obsidian";

const notes = defineCollection({
  loader: ObsidianMdLoader({
    base: "/Users/jh/vagabondage/public/",
    url: "notes",
  }),
});

export const collections = { notes };
