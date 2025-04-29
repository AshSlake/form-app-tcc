import { ProfileForm } from "./_components/form";

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
      <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center">
        {/* Título principal */}
        <h1 className="text-4xl font-bold ">
          <u>
            Bem vindo à Pesquisa da Equipe
            <br />
            de Desenvolvimento da Etec
          </u>
        </h1>

        {/* Instruções para o usuário */}
        <p className="font-medium text-gray-600">
          Preencha o formulário abaixo para participar da pesquisa.
        </p>

        {/* Aviso sobre uso dos dados */}
        <p className="font-medium text-gray-600">
          <u className="text-red-500 font-bold">
            Os dados coletados serão utilizados apenas para fins acadêmicos!
          </u>
        </p>
      </div>

      <br />

      {/* Container do formulário */}
      <div className="space-y-6 p-6 w-full max-w-lg mx-auto bg-white rounded-lg shadow-md">
        {/* Componente do formulário de perfil */}
        <ProfileForm />
      </div>
    </div>
  );
};

export default HomePage;
