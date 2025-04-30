// app/obrigado/page.tsx
"use client";

import Link from "next/link";
import { JSX } from "react";

/**
 * Página de agradecimento exibida após o envio bem-sucedido do formulário.
 *
 * Esta página é mostrada ao usuário como confirmação de que os dados
 * foram enviados corretamente. Contém uma mensagem de sucesso e um botão
 * para retornar à página inicial.
 *
 * @returns {JSX.Element} Componente da página de agradecimento
 */
export default function ObrigadoPage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Título principal da página */}
      <h1 className="text-3xl font-bold mb-4">Obrigado por participar!</h1>

      {/* Mensagem de confirmação */}
      <p className="mb-8">Seus dados foram enviados com sucesso.</p>

      {/* Link para voltar à página inicial */}
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
