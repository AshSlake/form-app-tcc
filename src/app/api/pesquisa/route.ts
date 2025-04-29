import { NextResponse } from "next/server";
import prisma from "@/app/_data/prisma"; // importa o prisma

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    // Aqui você salva no banco de dados
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
    console.error("Erro no backend:", error);
    return NextResponse.json(
      { error: "Erro de processamento" },
      { status: 500 }
    );
  }
}
