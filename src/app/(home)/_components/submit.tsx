import { toast } from "sonner";
import { z } from "zod";
import { formSchema } from "./form";

/**
 * Tipo inferido automaticamente a partir do schema de validação `formSchema`.
 * Representa os dados esperados no formulário.
 */
export type FormValues = z.infer<typeof formSchema>;

/**
 * Serviço responsável por processar o envio de formulários, incluindo
 * validação, requisição à API e tratamento de erros.
 */
export class FormService {
  /**
   * Valida e envia os dados do formulário para a API `/api/pesquisa`.
   *
   * Mostra mensagens de sucesso ou erro via toast conforme o resultado da operação.
   *
   * @param values - Dados do formulário validados com o schema `formSchema`
   * @returns `true` se o envio for bem-sucedido, `false` em caso de erro
   */
  static async submitForm(values: FormValues): Promise<boolean> {
    try {
      // Validação local com Zod
      formSchema.parse(values);

      // Envio dos dados para o endpoint da API
      const response = await fetch("/api/pesquisa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Tratamento específico para conflitos (ex: email ou telefone duplicado)
      if (response.status === 409) {
        const err = await response.json();
        if (err.message.includes("Email")) {
          throw new Error("Email já cadastrado");
        } else if (err.message.includes("Telefone")) {
          throw new Error("Telefone já cadastrado");
        } else {
          throw new Error(err.message);
        }
      }

      // Verifica se a resposta é JSON, caso contrário lança erro com texto cru
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(
          `Resposta inválida (${response.status}): ${text.slice(0, 100)}...`
        );
      }

      // Parse do conteúdo JSON retornado
      const data = await response.json();

      // Tratamento de erros com base no status HTTP
      if (!response.ok) {
        const msg = data?.message || `Erro no servidor (${response.status})`;
        throw new Error(msg);
      }

      // Verificação de estrutura esperada na resposta
      if (!("success" in data)) {
        throw new Error("Resposta inesperada do servidor");
      }

      // Feedback positivo ao usuário
      toast.success("Formulário enviado!");
      return true;
    } catch (err) {
      // Tratamento de erros de validação ou outros
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
