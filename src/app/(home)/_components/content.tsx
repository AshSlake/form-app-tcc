/**
 * Termo de consentimento utilizado na pesquisa acadêmica.
 * Informa ao participante que seus dados serão usados apenas para fins acadêmicos
 * e protegidos conforme a LGPD (Lei nº 13.709/2018).
 */
export const academicResearchTerm = `
    Ao participar desta pesquisa, você concorda que os dados fornecidos serão utilizados exclusivamente para fins acadêmicos, 
    em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Garantimos que nenhuma informação será compartilhada 
    com terceiros e que os dados serão tratados de forma anônima e segura.
`;

/**
 * Opções de funcionalidades voltadas para terapeutas.
 * Cada item descreve um recurso que pode ser útil na condução e acompanhamento das terapias.
 */
export const terapeutasOptions = [
  {
    value: "Monitoramento de Sintomas",
    description:
      "Registro diário de sintomas e comportamentos com gráficos evolutivos para identificar padrões e progressos.",
  },
  {
    value: "Registro de Sessões",
    description:
      "Permite que o terapeuta registre as sessões realizadas com o paciente, incluindo detalhes como data, duração e observações.",
  },
  {
    value: "Definição de Metas",
    description:
      "Permite que o terapeuta defina metas específicas para o paciente, ajudando a direcionar o tratamento e monitorar o progresso.",
  },
  {
    value: "Relatórios Personalizados",
    description:
      "Permite que o terapeuta gere relatórios personalizados com base nos dados do paciente, facilitando a análise e o acompanhamento do progresso.",
  },
  {
    value: "Galeria de Imagens",
    description:
      "Permite o Terapeuta a tirar e enviar fotos do paciente para uma galeria do aplicativo, podendo o responsável visualizar as fotos.",
  },
  {
    value: "Agenda de Consultas",
    description:
      "Permite que o terapeuta agende as sessões do paciente, facilitando o acompanhamento dos dias e horários das consultas ou reposições das sessões.",
  },
];

/**
 * Opções de funcionalidades voltadas para pais ou responsáveis.
 * Cada item descreve um recurso que visa facilitar o acompanhamento do tratamento.
 */
export const paisOptions = [
  {
    value: "graficos de evolução",
    description:
      "Permite que os pais ou responsáveis visualizem gráficos de evolução do paciente, facilitando a compreensão do progresso ao longo do tempo.",
  },
  {
    value: "Orientações Práticas",
    description:
      "Fornece orientações práticas para os pais ou responsáveis, ajudando a aplicar as técnicas e estratégias discutidas nas sessões.",
  },
  {
    value: "Comunicação com o Terapeuta",
    description:
      "Permite que os pais ou responsáveis se comuniquem diretamente com o terapeuta, facilitando o esclarecimento de dúvidas e o acompanhamento do tratamento.",
  },
  {
    value: "Acesso a Arquivos",
    description:
      "Permite que os pais ou responsáveis possam acessar relatórios e arquivos enviados pelo terapeuta, facilitando o acompanhamento do tratamento.",
  },
];

/**
 * Funcionalidades nativas do aplicativo acessíveis por terapeutas.
 * Essas funcionalidades são aplicáveis em um contexto mais amplo, como integração entre clínicas.
 */
export const funcionalidadesNativas = [
  {
    value: "relatorio compartilhado entre clinicas",
    description:
      "Permite que o terapeuta compartilhe relatórios entre diferentes clínicas que tenham o aplicativo, facilitando a continuidade do tratamento com diferentes terapeutas.",
  },
];
