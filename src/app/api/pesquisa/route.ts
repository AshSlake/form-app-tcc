import { NextResponse } from "next/server";
import prisma from "@/app/_data/prisma";
import { Prisma } from "@prisma/client"; // importa tipos do Prisma

/**
 * Manipula requisições POST para o endpoint de pesquisa.
 *
 * Espera um corpo JSON com os seguintes campos obrigatórios:
 * - `name`: Nome do participante
 * - `email`: Email do participante
 *
 * Campos opcionais incluem:
 * - `telefone`, `idade`, `genero`, `diagnostico`, `funcionalidades`,
 *   `funcionalidadesPais`, `opiniaoEntrevistado`, `acompanhamento`
 *
 * A requisição cria um registro na tabela `pesquisa` do banco via Prisma.
 *
 * @param request - Requisição HTTP do tipo POST contendo os dados do formulário
 * @returns Uma resposta JSON indicando sucesso, erro de duplicação ou erro interno
 */
export async function POST(request: Request) {
  try {
    // Parseia o corpo JSON da requisição
    const data = await request.json();

    // Validação básica dos campos obrigatórios
    if (!data.name || !data.email) {
      return NextResponse.json(
        { message: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    // Criação do registro no banco de dados
    const pesquisaCriada = await prisma.pesquisa.create({
      data: {
        nome: data.name,
        email: data.email,
        telefone: data.telefone,
        idade: data.idade,
        genero: data.genero,
        diagnostico: data.diagnostico,
        funcionalidades: data.funcionalidades,
        funcionalidadesPais: data.funcionalidadesPais,
        opiniaoEntrevistado: data.opiniaoEntrevistado,
        acompanharDesenvolvimento: data.acompanhamento,
      },
    });

    // Retorno de sucesso com ID do novo registro
    return NextResponse.json(
      { success: true, id: pesquisaCriada.id },
      { status: 201 }
    );
  } catch (error) {
    // Tratamento específico para erro de duplicidade (P2002)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[] | undefined;

      if (target?.includes("email")) {
        return NextResponse.json(
          { message: "Email já cadastrado" },
          { status: 409 }
        );
      }

      if (target?.includes("telefone")) {
        return NextResponse.json(
          { message: "Telefone já cadastrado" },
          { status: 409 }
        );
      }
    }

    // Tratamento genérico de erro inesperado
    console.error("Erro no backend:", error);
    return NextResponse.json(
      { message: "Erro de processamento" },
      { status: 500 }
    );
  }
}
