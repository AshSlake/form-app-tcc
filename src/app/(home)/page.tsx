import { ProfileForm } from "./_components/form";

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
