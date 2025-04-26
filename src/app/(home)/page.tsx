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
import {
  renderNavigationMenu,
  renderTermsCheckbox,
} from "./_components/description_checkbox";

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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telefone: "",
      idade: 0,
      genero: "feminino",
      diagnostico: "",
      funcionalidades: [],
      funcionalidadesPais: [],
      opiniaoEntrevistado: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Idade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de Telefone</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Numero de Telefone(Opcional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diagnostico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnóstico</FormLabel>
              <FormControl>
                <Input placeholder="Diagnóstico(Opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="funcionalidades"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funcionalidades para Terapeutas</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Registro de Sessões</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Registro de Sessões: Permite que o terapeuta registre as sessões realizadas com o paciente, incluindo detalhes como data, duração e observações."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Definição de Metas</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Definição de Metas: Permite que o terapeuta defina metas específicas para o paciente, ajudando a direcionar o tratamento e monitorar o progresso."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Relatórios Personalizados</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Relatórios Personalizados: Permite que o terapeuta gere relatórios personalizados com base nos dados do paciente, facilitando a análise e o acompanhamento do progresso."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Comunicação Direta</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Comunicação Direta: Permite que o terapeuta se comunique diretamente com o paciente ou responsável, facilitando o esclarecimento de dúvidas e o acompanhamento do tratamento."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Biblioteca de Recursos</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Biblioteca de Recursos: Permite que o terapeuta acesse uma biblioteca de recursos, como artigos, vídeos e materiais de apoio, para auxiliar no tratamento do paciente."
                      )}
                    </div>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="funcionalidadesPais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informações para Pais/Responsáveis</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Acompanhamento em Tempo Real</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Acompanhamento em Tempo Real: Permite que os pais ou responsáveis acompanhem o progresso do paciente em tempo real, recebendo atualizações sobre as sessões e as metas estabelecidas."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Orientações Práticas</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Orientações Práticas: Fornece orientações práticas para os pais ou responsáveis, ajudando a aplicar as técnicas e estratégias discutidas nas sessões."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Dados Consolidados</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Dados Consolidados: Permite que os pais ou responsáveis acessem dados consolidados sobre o progresso do paciente, facilitando a compreensão do tratamento."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Comunicação com o Terapeuta</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Comunicação com o Terapeuta: Permite que os pais ou responsáveis se comuniquem diretamente com o terapeuta, facilitando o esclarecimento de dúvidas e o acompanhamento do tratamento."
                      )}
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      className="form-checkbox"
                    />
                    <span>Acesso a Arquivos</span>
                    <div className="ml-2 text-gray-600">
                      {renderNavigationMenu(
                        "Acesso a Arquivos: Permite que os pais ou responsáveis acessem arquivos e documentos relacionados ao tratamento do paciente, como relatórios e materiais de apoio."
                      )}
                    </div>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
        <p className=" font-medium">Obrigado pela sua participação!</p>

        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center">
        <h1 className="text-4xl font-bold ">
          <u>
            Bem vindo à Pesquisa da Equipe
            <br />
            de Desenvolvimento da Etec
          </u>
        </h1>
        <p className=" font-medium text-gray-600">
          Preencha o formulário abaixo para participar da pesquisa.
        </p>
        {renderTermsCheckbox()}
        <p className=" font-medium text-gray-600">
          <u className="text-red-500 font-bold">
            {" "}
            Os dados coletados serão utilizados apenas para fins acadêmicos!
          </u>
        </p>
      </div>

      <br />
      <div className=" space-y-6 p-6 w-full max-w-lg mx-auto bg-white rounded-lg shadow-md">
        <ProfileForm />
      </div>
    </div>
  );
};

export default HomePage;
