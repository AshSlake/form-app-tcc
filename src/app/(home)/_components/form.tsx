"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { renderFormField, renderTermsCheckbox } from "./formUtils";
import {
  funcionalidadesNativas,
  paisOptions,
  terapeutasOptions,
} from "./content";
import React from "react";
import { renderTermsConcientiCheckbox } from "./description_checkbox";
import { FormService, FormValues } from "./submit";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

/**
 * Esquema de validação do formulário utilizando Zod.
 * Define os campos, seus tipos e as regras de validação obrigatórias e opcionais.
 */
export const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().optional(),
  idade: z.number().min(1, { message: "Idade é obrigatória" }),
  genero: z.enum(["masculino", "feminino", "outro"], {
    required_error: "Gênero é obrigatório",
  }),
  diagnostico: z.string().optional(),
  funcionalidades: z.array(z.string()).optional(),
  funcionalidadesPais: z.array(z.string()).optional(),
  funcionalidadesNativas: z.array(z.string()).optional(),
  opiniaoEntrevistado: z.string().optional(),
  acompanhamento: z.boolean().optional(),
});

/**
 * Componente principal do formulário de perfil.
 *
 * Funcionalidades:
 * - Usa react-hook-form com Zod para validação.
 * - Campos obrigatórios e opcionais bem definidos.
 * - Checkboxes customizados com múltiplas seleções.
 * - Submissão envia os dados e redireciona para página de agradecimento.
 */
export function ProfileForm() {
  const [accepted, setAccepted] = React.useState(false); // Controle do checkbox de aceite
  const router = useRouter(); // Hook de navegação do Next.js

  // Valores padrão para o formulário
  const defaultValues: FormValues = {
    name: "",
    email: "",
    telefone: "",
    idade: 0,
    genero: "masculino",
    diagnostico: "",
    funcionalidades: [],
    funcionalidadesPais: [],
    funcionalidadesNativas: [],
    opiniaoEntrevistado: "",
    acompanhamento: false,
  };

  // Inicialização do formulário com validação Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  /**
   * Função chamada ao submeter o formulário.
   * Se a submissão for bem-sucedida, redireciona para a página "/obrigado".
   */
  const onSubmit = async (values: FormValues) => {
    const success = await FormService.submitForm(values);
    if (success) {
      router.push("/obrigado"); // Redirecionamento após envio
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Nome completo */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => renderFormField(field, "Nome", "Nome", "text")}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) =>
            renderFormField(field, "Email", "Email", "email")
          }
        />

        {/* Idade */}
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) =>
            renderFormField(field, "Idade", "Idade", "number")
          }
        />

        {/* Gênero (select) */}
        <FormField
          control={form.control}
          name="genero"
          render={({ field }) =>
            renderFormField(
              field,
              "Gênero",
              "Gênero",
              "select",
              <select {...field} className="form-select">
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            )
          }
        />

        {/* Telefone (opcional) */}
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) =>
            renderFormField(field, "Telefone", "Telefone(Opcional)", "text")
          }
        />

        {/* Diagnóstico médico (opcional) */}
        <FormField
          control={form.control}
          name="diagnostico"
          render={({ field }) =>
            renderFormField(
              field,
              "Diagnóstico do Paciente",
              "Diagnóstico(opcional)",
              "text"
            )
          }
        />

        {/* Texto explicativo para funcionalidades */}
        <h3 className="text-sm text-gray-500 mb-2 bg-purple-200 p-2 rounded-md">
          Logo abaixo estão algumas funcionabildiades que a equipe de
          desenvolvimento achou que poderiam ser interessantes. Por favor,
          selecione as que você gostaria de ver no aplicativo:
        </h3>

        {/* Funcionalidades para terapeutas (checkbox múltipla) */}
        <FormField
          control={form.control}
          name="funcionalidades"
          render={({ field }) =>
            renderTermsCheckbox(
              field,
              "Funcionalidades para Terapeutas:",
              terapeutasOptions
            )
          }
        />

        {/* Funcionalidades para responsáveis (checkbox múltipla) */}
        <FormField
          control={form.control}
          name="funcionalidadesPais"
          render={({ field }) =>
            renderTermsCheckbox(
              field,
              "Informações para Responsáveis:",
              paisOptions
            )
          }
        />

        {/* Funcionalidades nativas (checkbox múltipla) */}
        <FormField
          control={form.control}
          name="funcionalidadesNativas"
          render={({ field }) =>
            renderTermsCheckbox(
              field,
              "Funcionalidades Nativas do Aplicativo:",
              funcionalidadesNativas
            )
          }
        />

        {/* Campo de sugestão livre (opcional) */}
        <FormField
          control={form.control}
          name="opiniaoEntrevistado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opinião do Entrevistado:</FormLabel>
              <h3 className="text-sm text-gray-500 mb-2 bg-purple-200 p-2 rounded-md">
                Alguma funcionalidade que gostaria de ver no app e que não está
                listada? Conte aqui:
              </h3>
              <FormControl>
                <Input
                  {...field}
                  className="w-full h-20"
                  placeholder="Escreva aqui sua sugestão"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Separador visual */}
        <Separator className="my-4 bg-black shadow-2xl" />

        {/* Desejo de acompanhamento do projeto */}
        <FormField
          control={form.control}
          name="acompanhamento"
          render={({ field }) => (
            <FormItem className="flex items-center mb-4">
              <FormControl>
                <Checkbox
                  id="acompanhamento-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </FormControl>
              <FormLabel htmlFor="acompanhamento-checkbox" className="ml-2">
                Você gostaria de acompanhar o desenvolvimento do aplicativo via
                E-mail e WhatsApp?
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Termos de consentimento */}
        {renderTermsConcientiCheckbox(accepted, setAccepted)}

        {/* Botão de envio, só habilitado quando os termos forem aceitos */}
        <Button
          type="submit"
          disabled={!accepted}
          className={`bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 ${
            !accepted ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}
