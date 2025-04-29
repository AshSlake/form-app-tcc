import { toast } from "sonner";
import { z } from "zod";
import { formSchema } from "./form";

// Definindo o tipo do formSchema para reutilização
export type FormValues = z.infer<typeof formSchema>;

export class FormService {
  static async submitForm(values: FormValues): Promise<boolean> {
    try {
      formSchema.parse(values);

      const response = await fetch("/api/pesquisa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Primeiro, trate status específicos
      if (response.status === 409) {
        // corpo JSON com { message: "Email já cadastrado" ou "Telefone já cadastrado" }
        const err = await response.json();
        if (err.message.includes("Email")) {
          throw new Error("Email já cadastrado");
        } else if (err.message.includes("Telefone")) {
          throw new Error("Telefone já cadastrado");
        } else {
          throw new Error(err.message);
        }
      }

      // Se não for JSON (ex: HTML de erro), capte como texto
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(
          `Resposta inválida (${response.status}): ${text.slice(0, 100)}...`
        );
      }

      // Agora sim parse JSON
      const data = await response.json();

      if (!response.ok) {
        const msg = data?.message || `Erro no servidor (${response.status})`;
        throw new Error(msg);
      }

      if (!("success" in data)) {
        throw new Error("Resposta inesperada do servidor");
      }

      toast.success("Formulário enviado!");
      return true;
    } catch (err) {
      const message =
        err instanceof z.ZodError
          ? "Erro de validação: " + err.errors.map((e) => e.message).join(", ")
          : err instanceof Error
          ? err.message
          : "Erro desconhecido";

      toast.error(message);
      console.error("Submission error:", err);
      return false;
    }
  }
}
