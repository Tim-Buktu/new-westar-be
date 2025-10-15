# CMS Data Model

This backend mirrors the WesternStar frontend contract defined in `app/utils/cms.ts`. All domain types can be found in `src/domain/types.ts`.

## Entities

### Newsletter
- Identifier: `string | number` (stored as string in the database)
- Required: `title`, `date`, `tags`
- Optional text fields include `displayDate`, `summary`, `category`, `newsletterUrl`, `content`, `contentHtml`, `keyDiscussion`
- Structured fields: `author` (`{ name; role?; avatar? }`), `image` (`https` URL string or `{ url; alt? }`), `resources` (array of `{ title; description; url; type: "video" | "download" }`)
- Arrays (`tags`, `insights`) default to empty on ingest.

### Article
- Builds on `Newsletter` shape with extra `showcaseSection: "featured" | "mosaic" | "loop"`, `isVisible` (defaults to `true`), and optional `position`
- `resources` support additional `type` literals (`"report"`, `"guide"`)

### AvailableTag
- `name` is case-insensitive unique (normalized to lowercase)
- Optional `color` stored as a hex string (`#RRGGBB`)

### Testimonial
- `id` is numeric
- `isActive` toggles visibility (defaults to `true`)

### TrendingTopic
- Optional descriptive fields (`description`, `imageUrl`, `linkUrl`, `position`)
- Shares the same validation payload as the frontend (`TrendingTopicPayload`)

## Validation Rules (Zod)
- Defined in `src/domain/schemas.ts`
- Dates must be ISO strings; positions are integers ≥ 0
- Image fields require `https` URLs whether plain or nested
- Tag payloads enforce hex color strings when provided
- Reorder payloads validate `id` + integer `position` pairs

## Persistence Mapping (Prisma)
- Database schema lives in `prisma/schema.prisma`
- JSON columns store flexible structures (`author`, `image`, `resources`, `keyDiscussion`)
- `tags` and `insights` are stored as Postgres text arrays
- `Tag.normalizedName` enforces case-insensitive uniqueness
- Default timestamps (`createdAt`, `updatedAt`) are included on every table

## Repository Layer
- Located under `src/repositories`
- Interfaces expose domain-shaped methods (`findAll`, `findById`, `create`, `update`, `delete`)
- Prisma-backed implementations live in `src/repositories/prisma`
- Aggregated entry point: `cmsRepositories` (`src/repositories/index.ts`)

## Services
- Located in `src/services`
- Wrap repositories and provide placeholders for upcoming business logic (Prompt 3)
- TODO comments mark where CMS-specific behavior will be added
