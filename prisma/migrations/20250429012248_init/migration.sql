-- CreateTable
CREATE TABLE "Pesquisa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "idade" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "diagnostico" TEXT,
    "funcionalidades" TEXT[],
    "funcionalidadesPais" TEXT[],
    "opiniaoEntrevistado" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pesquisa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pesquisa_email_key" ON "Pesquisa"("email");
