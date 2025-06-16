-- CreateTable
CREATE TABLE "user_table" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "posts_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_email_address_key" ON "user_table"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_user_name_key" ON "user_table"("user_name");

-- AddForeignKey
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
