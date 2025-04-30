import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Força JSON para todas as rotas API
  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.set("Content-Type", "application/json");

    // Configuração CORS básica (opcional)
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
