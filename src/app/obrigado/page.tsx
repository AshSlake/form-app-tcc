// app/obrigado/page.tsx
"use client";

import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Obrigado por participar!</h1>
      <p className="mb-8">Seus dados foram enviados com sucesso.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
