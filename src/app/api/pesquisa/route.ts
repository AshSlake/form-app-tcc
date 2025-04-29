import { NextResponse } from "next/server";
import prisma from "@/app/_data/prisma";
import { Prisma } from "@prisma/client"; // importa tipos do Prisma

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        { message: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

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

    return NextResponse.json(
      { success: true, id: pesquisaCriada.id },
      { status: 201 }
    );
  } catch (error) {
    // Tratamento de erro P2002 (duplicação)
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
