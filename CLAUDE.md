# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a podcast/blog website called "Just Pij" built with Sapper (Svelte), Sanity.io CMS, and deployed on Netlify. It's a monorepo managed with Lerna containing two main packages:

- **studio/**: Sanity Studio CMS for content management
- **web/**: Sapper frontend application

## Development Commands

### Root Level (runs both packages in parallel)
- `npm install` - Install all dependencies and bootstrap Lerna packages
- `npm run dev` - Start both studio and web in development mode
- `npm run build` - Build both packages for production
- `npm run lint` - Run linters across all packages
- `npm run format` - Format code across all packages

### Studio Commands (from `studio/` directory)
- `npm run dev` or `sanity start` - Start Sanity Studio on http://localhost:3333
- `npm run build` or `sanity build` - Build Studio for production
- `npm run graphql-deploy` - Deploy GraphQL API with playground
- `npm run lint` - Run ESLint
- `npm run test` or `sanity check` - Validate Sanity configuration

### Web Commands (from `web/` directory)
- `npm run dev` or `sapper dev` - Start Sapper dev server on http://localhost:3000
- `npm run build` or `npm run export` - Export static site (uses `sapper export`)
- `npm run start` - Run production build from `__sapper__/build`

## Architecture

### Monorepo Structure
The project uses Lerna for managing two independent but connected packages. The `web` package imports configuration from `studio/sanity.json` to access Sanity API credentials.

### Sanity CMS (studio/)
- **Content Types**: `post` (blog/podcast episodes), `author`, `category`, `siteSettings`
- **Schema Location**: `studio/schemas/` with separate `documents/` and `objects/` subdirectories
- **Key Files**:
  - `studio/sanity.json` - Contains projectId, dataset, and API token (WARNING: token is committed to repo)
  - `studio/schemas/schema.js` - Schema registry
  - `studio/deskStructure.js` - Custom desk structure
  - `studio/dashboardConfig.js` - Dashboard widgets configuration

### Sapper Frontend (web/)
- **Framework**: Sapper (Svelte-based) with server-side rendering
- **Server**: Polka (lightweight Express alternative)
- **Build Tool**: Rollup
- **Content Rendering**: `@movingbrands/svelte-portable-text` for Sanity's portable text

### Route Structure (web/src/routes/)
Sapper uses file-based routing:
- `index.svelte` - Homepage
- `about.svelte` - About page
- `donate.svelte` - Donate page
- `blog/` - Blog listing and posts
- `episodes/` - Podcast episodes
  - `[slug].svelte` - Dynamic episode page
- `api/` - Server-side API routes
  - `api/episodes/[slug].js` - Server endpoint fetching episode data from Sanity
  - `api/blog/[slug].js` - Server endpoint for blog posts

### Data Flow Pattern
1. Svelte page component uses `preload()` function (module context)
2. `preload()` calls internal `/api/` route via `this.fetch()`
3. API route (`get()` function) queries Sanity using GROQ via `sanityClient.js`
4. API returns JSON to page component
5. Component renders using Svelte and portable text serializers

Example from `episodes/[slug].svelte`:
```javascript
// Module context - runs on server during SSR
export async function preload({ params }) {
  const res = await this.fetch(`api/episodes/${params.slug}`);
  const { post } = await res.json();
  return { post };
}
```

### Internationalization (i18n)
- Uses `svelte-i18n` for bilingual support (English/Ukrainian)
- Language files: `messages/en.json`, `messages/uk.json`
- Language preference stored in cookies
- Middleware in `web/src/i18n.js` handles SSR and client-side initialization
- Server middleware: `i18nMiddleware()` detects language from cookies or Accept-Language header
- Client initialization: `startClient()` called in browser

### Content Schema Features
The `post` document type (used for both blog and podcast episodes) includes:
- Standard blog fields: title, slug, publishedAt, body, excerpt, authors, categories
- Podcast-specific: `spotifyLink`, `youtubeLink`, `playlistDuration`, `playlistSize`
- Images: `mainImage` (for listings), `coverImage` (for post content)
- Language field: supports `en` and `uk`

### Components (web/src/components/)
- `serializers.js` - Custom renderers for Sanity portable text (code blocks, images, links, author references)
- `Playing.svelte` - Animated "now playing" indicator
- `Nav.svelte` - Navigation with language switcher
- `Link.svelte`, `Button.svelte`, `Donate.svelte`, `Socials.svelte`

### Services
- `fetchNowPlaying.js` - Fetches currently playing track from external API

## Key Integration Points

### Sanity Client Configuration
The Sanity client is configured in `web/src/sanityClient.js` and imports credentials from `studio/sanity.json`:
```javascript
import { api } from '../../studio/sanity.json'
const { projectId, dataset, token } = api
```

This creates a tight coupling between the two packages - changes to studio configuration affect the web package.

### GROQ Queries
API routes use Sanity's GROQ query language. Common patterns:
- Filter by type and slug: `*[_type == "post" && slug.current == $slug][0]`
- Projection with nested references: Expand `authorReference` with `author->`
- Example in `api/episodes/[slug].js`:
```javascript
const query = '*[_type == "post" && slug.current == $slug][0]{..., body[]{..., children[]{..., _type == \'authorReference\' => {_type, author->}}}}'
```

### Image Handling
Uses `@sanity/image-url` helper (imported via `web/src/helpers/image`):
```javascript
urlFor(post.mainImage).width('256').height('256').auto('format').url()
```

## Deployment

### Two-Site Architecture
The project deploys to **two separate Netlify sites**:

1. **Sanity Studio** (`pj-podcast-studio`)
   - Hosts the CMS admin interface
   - Netlify site ID: `603b22e4-4fae-4337-ba2e-b57def1ee54c`
   - Build hook ID: `6162b90ea31520128b2a45c6`
   - Configuration: `studio/netlify.toml` (redirects all routes to `/` for SPA behavior)

2. **Frontend Website** (`pj-podcast`)
   - Public-facing site at https://pj-podcast.netlify.app
   - Netlify site ID: `66241ece-6efc-4781-aa40-d98ed56f9fc3`
   - Build hook ID: `6162b90e9d8104abf5d8b22c`
   - No netlify.toml (uses Netlify defaults)

### Deployment Methods

#### Automatic (Git-based)
1. Push commits to `main` branch on GitHub (`VladimirTaytor/pj-podcast`)
2. Netlify auto-detects changes via GitHub integration
3. Runs build commands:
   - Studio: `npm run build-studio` → `cd studio && npm run build`
   - Web: `npm run build-web` → `cd web && npm run export`
4. Deploys static files to CDN

#### Manual (from Sanity Studio Dashboard)
- Netlify widget integrated in Studio dashboard (`studio/dashboardConfig.js:15-34`)
- Content editors can trigger rebuilds by clicking deploy buttons
- Uses Netlify build hooks to trigger deployments
- **Critical**: Content changes in Sanity don't auto-rebuild the static site - manual deployment required to publish changes

### Build Process Details

**Studio Build**:
```bash
cd studio && sanity build
```
- Builds Sanity Studio React application
- Outputs static files for CMS interface
- Deployed to studio subdomain

**Web Build**:
```bash
cd web && sapper export
```
- Runs Sapper's static site generator
- Pre-fetches all content from Sanity API at build time
- Generates pre-rendered HTML for all routes
- Output directory: `web/__sapper__/export/`
- Deployed as static files (no Node.js server required)

### Static Site Implications
- **Content Publishing Workflow**: Publish in Sanity → Trigger rebuild via dashboard → Wait for deployment
- **No Real-time Updates**: Frontend shows cached content from last build time
- **Build-time Data Fetching**: All GROQ queries run during `sapper export`, not at request time
- The Studio dashboard displays this warning to editors:
  > "Because these sites are static builds, they need to be re-deployed to see the changes when documents are published."

## Important Notes

- **Security Issue**: Sanity API token is committed to `studio/sanity.json:9` - this should be moved to environment variables
- **Build Output**: Sapper exports to `web/__sapper__/export/` for static deployment
- **Service Worker**: Custom service worker in `web/src/service-worker.js`
- **Deployment**: Netlify auto-deploys from `main` branch
- **Lerna Bootstrap**: Automatically runs on `npm install` (postinstall hook)
