import { npmLoader } from "../../loader";
import { defineCollection } from "astro:content";

export const collections = {
    npm: defineCollection({
        loader: npmLoader({ username: 'gingerchew' })
    })
}