import { toast } from "sonner";
import { formSchema } from "./form";
import { z } from "zod";

// Definindo o tipo do formSchema para reutilização
export type FormValues = z.infer<typeof formSchema>;

export class FormService {
  static async submitForm(values: FormValues): Promise<boolean> {
    try {
      const response = await fetch("/api/pesquisa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      // Verificação robusta do Content-Type
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const errorText = await response.text();
        throw new Error(
          `Resposta inválida (${response.status}): ${errorText.slice(
            0,
            100
          )}...`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no servidor");
      }

      toast.success("Formulário enviado!");
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(message);
      console.error("Submission error:", error);
      return false;
    }
  }
}
