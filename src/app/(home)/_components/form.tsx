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

/**
 * Esquema de validação do formulário utilizando Zod.
 * Define os campos, tipos e regras de validação.
 */
export const formSchema = z.object({
  /** Nome completo do usuário (obrigatório) */
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  /** Email do usuário (obrigatório e validado) */
  email: z.string().email({ message: "Email inválido" }),
  /** Telefone do usuário (opcional) */
  telefone: z.string().optional(),
  /** Idade do usuário (opcional) */
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
  /** Funções nativas do Aplicativo */
  funcionalidadesNativas: z.array(z.string()).optional(),
  /** Opinião ou comentários adicionais do entrevistado (opcional) */
  opiniaoEntrevistado: z.string().optional(),
  /** Pergunta sobre acompanhamento  do aplivativo*/
  acompanhamento: z.boolean().optional(),
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
  const [acompanhamento, setAcompanhamento] = React.useState(false);

  // Inicialização do formulário com react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telefone: "",
      idade: 0,
      genero: undefined,
      diagnostico: "",
      funcionalidades: [],
      funcionalidadesPais: [],
      funcionalidadesNativas: [],
      opiniaoEntrevistado: "",
      acompanhamento: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const success = await FormService.submitForm(values);
    if (success) {
      // Exibe uma mensagem de sucesso ou redireciona o usuário
      alert("Obrigado por participar da pesquisa!");
      form.reset();
    }
  };

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
              <select {...field} className="form-select">
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
            renderFormField(field, "Telefone", "Telefone(Opcional)", "text")
          }
        />

        {/* Campo Diagnóstico (opcional) */}
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

        {/* Checkbox de funcionalidades para terapeutas */}
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

        {/* Checkbox de informações para pais/responsáveis */}
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

        {/* Checkbox de funcionalidades nativas do aplicativo */}
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

        {/* Campo de texto para opinião do entrevistado */}
        <FormField
          control={form.control}
          name="opiniaoEntrevistado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opinião do Entrevistado:</FormLabel>
              <h3 className="text-sm text-gray-500 mb-2">
                A alguma funcionalidades que gostaria de ter no aplicativo que
                não estava nas opções acima? nos conte aqui:
              </h3>
              <FormControl>
                <Input
                  {...field}
                  className="w-full h-20 "
                  placeholder="Escreva aqui sua Sugestão"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox de acompanhamento do aplicativo */}
        <FormField
          control={form.control}
          name="acompanhamento"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 mb-4">
              <Input
                type="checkbox"
                id="acompanhamento-checkbox"
                checked={acompanhamento}
                onChange={(e) => {
                  setAcompanhamento(e.target.checked);
                  field.onChange(e.target.checked);
                }}
                style={{ width: "20px", height: "20px" }}
                className="form-checkbox"
              ></Input>
              {/* Menu de navegação com os termos completos */}
              <label htmlFor="acompanhamento-checkbox">
                <h3 className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1">
                  Você gostaria de acompanhar o desenvolvimento do aplicativo
                  via E-mail e WhatsApp?
                </h3>
              </label>
            </FormItem>
          )}
        />

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
