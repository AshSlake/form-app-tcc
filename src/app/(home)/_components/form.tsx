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
const formSchema = z.object({
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
  opiniaoEntrevistado: z.string().optional(),
});

export function ProfileForm() {
  const [accepted, setAccepted] = React.useState(false);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert("Formulário enviado com sucesso!" + JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => renderFormField(field, "Nome", "Nome", "text")}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) =>
            renderFormField(field, "Email", "Email", "email")
          }
        />
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) =>
            renderFormField(field, "Idade", "Idade", "number")
          }
        />
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
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) =>
            renderFormField(field, "Telefone", "Telefone", "text")
          }
        />
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
        {renderTermsConcientiCheckbox(accepted, setAccepted)}
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
