-- Add urlId column (first 8 chars of id), make slug nullable
ALTER TABLE posts ADD COLUMN "urlId" VARCHAR(8);
UPDATE posts SET "urlId" = LEFT(id::text, 8);
ALTER TABLE posts ALTER COLUMN "urlId" SET NOT NULL;
ALTER TABLE posts ADD CONSTRAINT "posts_urlId_key" UNIQUE ("urlId");
CREATE UNIQUE INDEX IF NOT EXISTS "posts_urlId_idx" ON posts ("urlId");

ALTER TABLE posts ALTER COLUMN slug DROP NOT NULL;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS "posts_slug_key";
DROP INDEX IF EXISTS "posts_slug_key";
