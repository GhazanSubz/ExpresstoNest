-- CreateTable
CREATE TABLE "benefit_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "benefit_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax" (
    "id" SERIAL NOT NULL,
    "min_salary" DECIMAL(10,2),
    "max_salary" DECIMAL(10,2),
    "tax_percent" DECIMAL(5,2),

    CONSTRAINT "tax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_benefits" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "benefit_type_id" INTEGER,

    CONSTRAINT "user_benefits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "salary" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "benefit_types_name_key" ON "benefit_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_benefits_user_id_benefit_type_id_key" ON "user_benefits"("user_id", "benefit_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_benefits" ADD CONSTRAINT "user_benefits_benefit_type_id_fkey" FOREIGN KEY ("benefit_type_id") REFERENCES "benefit_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_benefits" ADD CONSTRAINT "user_benefits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
