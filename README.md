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

## Users tested with

- [gingerchew](https://www.npmjs.com/~gingerchew)
- [mathias](https://www.npmjs.com/~mathias)

> Found a bug? Create an issue with the username and we'll get to fixing it!

## TODO:

- [ ] Include download stats
- [x] Test against users with multiple pages of packages
- [ ] Tests?
- [ ] Improve typing