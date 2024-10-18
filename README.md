# Astro NPM Loader

> Load information about NPM packages into a content collection

## How To

```ts
// src/content/config.ts
import { npmLoader } from 'astro-npm-loader';
import { defineCollection } from 'astro:content';

const npm = defineCollection({
    loader: npmLoader({ username: '$$your_username$$' }),
});

export const collections = {
    npm
};
```

## TODO:

- [ ] Include download stats
- [ ] Test against users with multiple pages of packages
- [ ] Tests?
- [ ] Improve typing