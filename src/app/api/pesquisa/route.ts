import { NextResponse } from "next/server";
import prisma from "@/app/_data/prisma";
import { Prisma } from "@prisma/client"; // Importa tipos do Prisma

/**
 * Manipula requisições POST para o endpoint de pesquisa.
 *
 * Espera um corpo JSON com os seguintes campos obrigatórios:
 * - `name`: Nome do participante
 * - `email`: Email do participante
 *
 * Campos opcionais incluem:
 * - `telefone`: Telefone do participante
 * - `idade`: Idade do participante
 * - `genero`: Gênero do participante
 * - `diagnostico`: Diagnóstico do participante
 * - `funcionalidades`: Funcionalidades relatadas pelo participante
 * - `funcionalidadesPais`: Funcionalidades relatadas pelos pais
 * - `opiniaoEntrevistado`: Opinião do entrevistado
 * - `acompanhamento`: Informações sobre acompanhamento do desenvolvimento
 *
 * A requisição cria um registro na tabela `pesquisa` do banco via Prisma.
 *
 * @param request - Requisição HTTP do tipo POST contendo os dados do formulário
 * @returns Uma resposta JSON indicando sucesso, erro de duplicação ou erro interno
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        { message: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    // Cria um objeto com os campos tratados
    const dadosFiltrados: Prisma.PesquisaCreateInput = removeCamposVazios({
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
    }) as Prisma.PesquisaCreateInput;

    const pesquisaCriada = await prisma.pesquisa.create({
      data: dadosFiltrados,
    });

    return NextResponse.json(
      { success: true, id: pesquisaCriada.id },
      { status: 201 }
    );
  } catch (error) {
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

    console.error("Erro no backend:", error);
    return NextResponse.json(
      { message: "Erro de processamento" },
      { status: 500 }
    );
  }
}

/**
 * Remove campos vazios de um objeto.
 *
 * Um campo é considerado vazio se for:
 * - `null`
 * - `undefined`
 * - Uma string vazia ou composta apenas por espaços
 *
 * @param obj - Objeto a ser filtrado
 * @returns Um novo objeto sem os campos vazios
 */
function removeCamposVazios(obj: Record<string, unknown>) {
  const resultado: Record<string, unknown> = {};
  for (const chave in obj) {
    const valor = obj[chave];

    if (
      valor !== null &&
      valor !== undefined &&
      !(typeof valor === "string" && valor.trim() === "")
    ) {
      resultado[chave] = valor;
    }
  }
  return resultado;
}
