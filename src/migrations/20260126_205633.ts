import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_embed_embed_type" AS ENUM('iframe', 'html');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_embed_type" AS ENUM('iframe', 'html');
  ALTER TABLE "pages_blocks_embed" ADD COLUMN "embed_type" "enum_pages_blocks_embed_embed_type" DEFAULT 'iframe';
  ALTER TABLE "pages_blocks_embed" ADD COLUMN "html_code" varchar;
  ALTER TABLE "_pages_v_blocks_embed" ADD COLUMN "embed_type" "enum__pages_v_blocks_embed_embed_type" DEFAULT 'iframe';
  ALTER TABLE "_pages_v_blocks_embed" ADD COLUMN "html_code" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_embed" DROP COLUMN "embed_type";
  ALTER TABLE "pages_blocks_embed" DROP COLUMN "html_code";
  ALTER TABLE "_pages_v_blocks_embed" DROP COLUMN "embed_type";
  ALTER TABLE "_pages_v_blocks_embed" DROP COLUMN "html_code";
  DROP TYPE "public"."enum_pages_blocks_embed_embed_type";
  DROP TYPE "public"."enum__pages_v_blocks_embed_embed_type";`)
}
