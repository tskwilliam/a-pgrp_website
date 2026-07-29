# Image Assets

Place your own images here. Supported formats: JPG, PNG, WebP.

## Projects

Each project has its own folder named after its slug (matching the `slug` field in `src/data/index.ts`).

```
public/images/projects/
  wellness-township/
    banner.jpg        ← hero image shown at top of project detail page
    01.jpg            ← gallery image 1
    02.jpg            ← gallery image 2
    03.jpg            ← add as many as you like
  urban-oasis-residences/
    banner.jpg
    01.jpg
    ...
```

Then in `src/data/index.ts`, reference them like this:

```ts
images: [
  '/images/projects/wellness-township/banner.jpg',   // first = banner
  '/images/projects/wellness-township/01.jpg',
  '/images/projects/wellness-township/02.jpg',
],
```

## People

Staff and partner portrait photos go here:

```
public/images/people/
  liew-soong-shoon.jpg
  mei-mei-leong.jpg
  james-liu.jpg
  ...
```

Then in `src/data/index.ts`:

```ts
imageUrl: '/images/people/liew-soong-shoon.jpg',
```

## Notes

- The `public/` folder is served at the root URL — a file at `public/images/people/jane.jpg` is accessed as `/images/people/jane.jpg`.
- Image filenames are case-sensitive on Linux servers.
- Recommended sizes: portraits 900×900px, project banners 1920×800px, gallery images 1200×800px.
