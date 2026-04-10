# Life Overview
_A bird's-eye view._

## Intro

I was directly inspired by <a href="https://busterbenson.com/the-life-of/buster/" target="_blank">Buster Benson's project</a> and decided to create my own version. Each square in the grid represents one week of your life, organized into decades. Fill in the weeks that matter to you and see your life at a glance.

This repo is the bones of what powers <a href="https://emilydelacruz.com/life-overview" target="_blank">the live version on my site</a>.

## Tech Stack

- **Next.js 15** (App Router) with **React 19**
- **TypeScript**
- **Supabase** for data storage and authentication
- **date-fns** for date formatting
- **CSS Modules** for component-scoped styles

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

Run the SQL in `seed/records.sql` in your Supabase project's SQL Editor. This creates the `life_overview_records` table with Row Level Security policies. Works fine alongside existing tables.

### 3. Configure environment variables

Copy `.env.local.example` or create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_BIRTH_DATE=2026-04-10
```

Set `NEXT_PUBLIC_BIRTH_DATE` to your own birthday (ISO format: `YYYY-MM-DD`). This is the single place that controls the "today" indicator and all birthday/age calculations.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production. The output goes to the `.next` folder.

## Content

Records are stored in a Supabase `life_overview_records` table. Each record ties an event to a specific week of your life:

```json
{
  "week": 1,
  "date": "April 15, 2020",
  "title": "Example Heading",
  "content": "Longer description shown in the tooltip on hover",
  "tags": ["travel", "milestone"],
  "public": true
}
```

| Field | Description |
|-------|-------------|
| `week` | How many weeks from your birth date to the event. Use a tool like [this one](https://www.timeanddate.com/date/duration.html) to calculate. |
| `date` | Human-readable date string displayed in the tooltip. |
| `title` | Short label shown inside the week cell. |
| `content` | Optional longer text shown in the tooltip on hover. |
| `tags` | Array of strings for grouping/styling weeks (e.g. `["travel"]`). Tagged weeks get a colored left border. |
| `public` | If `false`, the record is only visible when logged in. |

### Authentication

Some records can be marked as private (`public: false`). These are hidden from anonymous visitors and only appear when you're logged in.

- Visit `/login` to sign in with email and password
- Auth is handled by Supabase Auth with JWT sessions stored in cookies
- Row Level Security policies on the database automatically filter records based on auth state

To create a login, go to your Supabase dashboard > Authentication > Add user.

### Today Indicator

The current week is highlighted automatically based on `NEXT_PUBLIC_BIRTH_DATE` in your `.env.local`. No code changes needed.

### Tagged Weeks

Records with `tags` get a colored left border on their week cell. The tag-to-color mapping lives in `components/WeekFilled.tsx` (`TAG_COLORS`). Add or change colors there as needed.

### Example Weeks

Weeks 300-304 have a red background by default as a demo. This is controlled by `isExampleWeek()` in `lib/helpers.ts` — remove or modify the set of IDs there.

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (HTML shell, metadata, global CSS)
  page.tsx              # Home page (server component, fetches from Supabase)
  login/page.tsx        # Login page
components/             # React components
  Overview.tsx          # Grid container (server component)
  Decade.tsx            # One decade row (server component)
  WeekGrid.tsx          # Client boundary — week rendering loop
  Week.tsx              # Core logic: which week variant to render
  WeekFilled.tsx        # Week with record data
  WeekBirthday.tsx      # Birthday milestone marker
  WeekToday.tsx         # "Today" indicator
  Tooltip.tsx           # Hover tooltip (polymorphic)
  AuthButton.tsx        # Login/logout toggle
  LoginForm.tsx         # Login form
  styles/               # CSS Modules
lib/                    # Shared utilities
  types.ts              # TypeScript interfaces
  helpers.ts            # Week math, class builders
  supabase/             # Supabase client setup (server + browser)
middleware.ts           # Auth session refresh on every request
seed/records.sql        # Database schema + seed data
```

## Credits

Thank you to <a href="https://busterbenson.com/" target="_blank">Buster Benson</a> for sharing his work publicly and inspiring this project.
