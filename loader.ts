import type { Loader } from 'astro/loaders';
import { z } from 'astro:schema';


type Links = {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
}

type Author = {
    name: string;
    email: string;
}

type Publisher = {
    username: string;
    email: string;
}

type Maintainer = {
    username: string;
    email: string;
}

type Package = {
    name: string;
    scope: string;
    version: `${number}.${number}.${number}`;
    description: string;
    keywords: string[],
    date: string;
    links: Links;
    author?: Author;
    publisher: Publisher,
    maintainers: Maintainer[]
}

const LinksSchema = z.object({
    npm: z.optional(z.string()),
    homepage: z.optional(z.string()),
    repository: z.optional(z.string()),
    bugs: z.optional(z.string()),
})

const AuthorSchema = z.object({
    name: z.string(),
    email: z.optional(z.string()),
})
const UserSchema = z.object({
    username: z.string(),
    email: z.string(),
});

const MaintainersSchema = z.array(UserSchema);

export function npmLoader({ username }: { username:string }):Loader {
    const packages:Package[] = [];
    const url = `https://registry.npmjs.com/-/v1/search?from=${packages.length}size=250&text=maintainer:${username}`;

    return {
        name: 'npm-loader',
        schema: z.object({
            name: z.string(),
            scope: z.string(),
            version: z.string(),
            description: z.string(),
            keywords: z.optional(z.array(z.string())),
            date: z.coerce.date(),
            links: LinksSchema,
            author: z.optional(AuthorSchema),
            publisher: UserSchema,
            maintainers: MaintainersSchema
        }),
        load: async  ({ store, logger, parseData, meta, generateDigest }) => {
            const result = await fetch(url);
            const { objects }: { objects: { package: Package }[] } = await result.json();
            const packages = objects.map((x: { package: Package }) => x.package);

            for (const pkg of packages) {
                logger.info(JSON.stringify(pkg));
                const data = await parseData({
                    id: pkg.name,
                    data: pkg
                });
                console.log(data);
                store.set({
                    digest: generateDigest(pkg),
                    data,
                    id: pkg.name
                });
            }
        }
    }
}