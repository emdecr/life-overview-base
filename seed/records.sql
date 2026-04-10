-- =============================================================================
-- Life Overview: Supabase Table Schema
-- =============================================================================
-- This creates the `records` table that stores life events/milestones.
-- Each record corresponds to a specific week of life and is displayed
-- as a highlighted cell in the "Life in Weeks" grid.
-- =============================================================================

-- The main records table
CREATE TABLE records (
  -- Auto-incrementing primary key
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- Which week of life this record belongs to (0-based index).
  -- Week 0 = birth week, week 52 = first birthday, etc.
  week INTEGER NOT NULL,

  -- Human-readable date string (e.g. "April 15, 2020")
  date TEXT NOT NULL,

  -- Short title displayed on the week cell
  title TEXT NOT NULL,

  -- Optional longer description shown in the tooltip on hover
  content TEXT,

  -- Tags for grouping/styling. Examples: ["travel", "milestone", "work"]
  -- Used to apply different colors or borders to chunks of weeks.
  tags TEXT[] DEFAULT '{}',

  -- Visibility flag: if false, only authenticated users can see this record.
  -- Public records are visible to everyone (no login required).
  public BOOLEAN DEFAULT true,

  -- Timestamp for when the record was created
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on the `week` column for fast lookups.
-- The app filters records by week ID for each of ~5,720 week cells,
-- so this index is important for performance.
CREATE INDEX idx_records_week ON records (week);

-- =============================================================================
-- Row Level Security (RLS)
-- =============================================================================
-- RLS restricts which rows a user can access based on their auth state.
-- We have two policies:
--   1. Anyone (including anonymous) can read PUBLIC records
--   2. Authenticated users can read ALL records (public + private)
-- =============================================================================

ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public records are visible to everyone (no login needed)
CREATE POLICY "Public records are visible to all"
  ON records
  FOR SELECT
  USING (public = true);

-- Policy 2: Authenticated users bypass the public filter and see everything
CREATE POLICY "Authenticated users can read all records"
  ON records
  FOR SELECT
  TO authenticated
  USING (true);

-- =============================================================================
-- Seed Data (matches the original records.json sample data)
-- =============================================================================
-- These are example records to verify the app works.
-- Replace with your own life events!
-- =============================================================================

INSERT INTO records (week, date, title, content, tags, public) VALUES
  (1,   'April 15, 2020',  'Example Heading 1', 'This is the content',  '{"example"}', true),
  (5,   'May 20, 2020',    'Example Heading 2', 'This is the content',  '{"example"}', true),
  (51,  'Date',            'Example Heading 3', 'This is the content',  '{}',          true),
  (75,  'Date',            'Example Heading 4', 'This is the content',  '{}',          true),
  (100, 'Date',            'Example Heading 5', 'This is the content',  '{}',          false),
  (150, 'Date',            'Example Heading 6', 'This is the content',  '{}',          true),
  (200, 'Date',            'Example Heading 7', 'This is the content',  '{}',          false),
  (225, 'Date',            'Example Heading 8', 'This is the content',  '{}',          true);
