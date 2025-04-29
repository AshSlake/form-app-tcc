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
import { paisOptions, terapeutasOptions } from "./content";
import React from "react";
import { renderTermsConcientiCheckbox } from "./description_checkbox";

/**
 * Esquema de validação do formulário utilizando Zod.
 * Define os campos, tipos e regras de validação.
 */
const formSchema = z.object({
  /** Nome completo do usuário (obrigatório) */
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  /** Email do usuário (obrigatório e validado) */
  email: z.string().email({ message: "Email inválido" }),
  /** Telefone do usuário (opcional) */
  telefone: z.string().optional(),
  /** Idade do usuário (obrigatória, mínimo 1 ano) */
  idade: z.number().min(1, { message: "Idade é obrigatória" }),
  /** Gênero do usuário (obrigatório, com opções pré-definidas) */
  genero: z.enum(["masculino", "feminino", "outro"], {
    required_error: "Gênero é obrigatório",
  }),
  /** Diagnóstico médico (opcional) */
  diagnostico: z.string().optional(),
  /** Lista de funcionalidades de interesse para terapeutas (opcional) */
  funcionalidades: z.array(z.string()).optional(),
  /** Lista de funcionalidades de interesse para pais/responsáveis (opcional) */
  funcionalidadesPais: z.array(z.string()).optional(),
  /** Opinião ou comentários adicionais do entrevistado (opcional) */
  opiniaoEntrevistado: z.string().optional(),
});

/**
 * Componente de formulário de perfil com validação.
 *
 * Este componente implementa um formulário completo com:
 * - Validação de campos utilizando Zod
 * - Renderização dinâmica de campos
 * - Termos de consentimento
 * - Controle de estado do formulário
 *
 * @returns {React.ReactElement} O componente de formulário de perfil
 */
export function ProfileForm() {
  // Estado para controlar a aceitação dos termos
  const [accepted, setAccepted] = React.useState(false);

  // Inicialização do formulário com react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telefone: "",
      idade: undefined,
      genero: "feminino",
      diagnostico: "",
      funcionalidades: [],
      funcionalidadesPais: [],
      opiniaoEntrevistado: "",
    },
  });

  /**
   * Função de submissão do formulário.
   * @param {z.infer<typeof formSchema>} values - Valores do formulário validados
   */
  function onSubmit(values: z.infer<typeof formSchema>) {
    alert("Formulário enviado com sucesso!" + JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Campo Nome */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => renderFormField(field, "Nome", "Nome", "text")}
        />

        {/* Campo Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) =>
            renderFormField(field, "Email", "Email", "email")
          }
        />

        {/* Campo Idade */}
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) =>
            renderFormField(field, "Idade", "Idade", "number")
          }
        />

        {/* Campo Gênero (select) */}
        <FormField
          control={form.control}
          name="genero"
          render={({ field }) =>
            renderFormField(
              field,
              "Gênero",
              "Gênero",
              "select",
              <select {...field} className="form-select bg-secondary">
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            )
          }
        />

        {/* Campo Telefone */}
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) =>
            renderFormField(field, "Telefone", "Telefone", "text")
          }
        />

        {/* Campo Diagnóstico (opcional) */}
        <FormField
          control={form.control}
          name="diagnostico"
          render={({ field }) =>
            renderFormField(
              field,
              "Diagnóstico",
              "Diagnóstico(opcional)",
              "text"
            )
          }
        />

        {/* Checkbox de funcionalidades para terapeutas */}
        <FormField
          control={form.control}
          name="funcionalidades"
          render={({ field }) =>
            renderTermsCheckbox(
              field,
              "Funcionalidades para Terapeutas",
              terapeutasOptions
            )
          }
        />

        {/* Checkbox de informações para pais/responsáveis */}
        <FormField
          control={form.control}
          name="funcionalidadesPais"
          render={({ field }) =>
            renderTermsCheckbox(
              field,
              "Informações para Pais/Responsáveis",
              paisOptions
            )
          }
        />

        {/* Campo de texto para opinião do entrevistado */}
        <FormField
          control={form.control}
          name="opiniaoEntrevistado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opinião do Entrevistado</FormLabel>
              <FormControl>
                <Input {...field} className="w-full h-20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br />

        {/* Checkbox de termos e condições */}
        {renderTermsConcientiCheckbox(accepted, setAccepted)}

        {/* Botão de submissão (desabilitado até aceitar os termos) */}
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
