import { Card } from "@/components/ui/card";
import { ProfileForm } from "./_components/form";
import { Separator } from "@/components/ui/separator";

/**
 * Página inicial da pesquisa acadêmica.
 *
 * Este componente representa a página principal que contém:
 * - Cabeçalho com título e instruções
 * - Mensagem sobre o uso dos dados
 * - Formulário de pesquisa
 *
 * @returns {React.ReactElement} A página inicial da pesquisa
 */
const HomePage = () => {
  return (
    <div>
      {/* Seção de cabeçalho e informações */}
      <Card
        className="w-full max-w-2xl mx-auto p-6 shadow-black rounded-lg space-y-4 justify-center"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <Card className="bg-purple-200 p-4 rounded-lg shadow-md space-y-4">
          {/* Título principal */}
          <h1 className="text-2xl font-bold justify-center items-center text-center">
            <u>Bem vindo à Pesquisa da Equipe de Desenvolvimento da Etec</u>
          </h1>

          {/* Instruções para o usuário */}
          <p className="font-medium text-gray-800 text-center">
            Olá! a equipe de desenvolvimento de sistemas da Etec esta criando um
            projeto para o TCC de um aplicativo de celular que ajudara no
            feedback das sessões de Terapia de pessoas neurodivergentes e está
            pesquisa tem como objetivo coletar a opnião dos
            Responsáveis/Profissionais sobre funções e funcionalidades que eles
            achariam interessantes para o aplicativo.
            <br />
          </p>
        </Card>

        <Separator className="my-4 bg-black shadow-2xl" />
        {/* Componente do formulário de perfil */}
        <ProfileForm />
      </Card>
    </div>
  );
};

export default HomePage;
