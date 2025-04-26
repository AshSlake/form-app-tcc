import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export function renderNavigationMenu(string: string) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{"?"}</NavigationMenuTrigger>
          <NavigationMenuContent className="w-64 p-4 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="text-sm text-gray-700 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {string}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const academicResearchTerm = `
    Ao participar desta pesquisa, você concorda que os dados fornecidos serão utilizados exclusivamente para fins acadêmicos, 
    em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Garantimos que nenhuma informação será compartilhada 
    com terceiros e que os dados serão tratados de forma anônima e segura.
`;

export function renderTermsCheckbox() {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="checkbox"
        id="terms-checkbox"
        required
        style={{ width: "20px", height: "20px" }}
      ></input>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {"Aceito os termos de conscientização"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-64 p-4 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="text-sm text-gray-700 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {academicResearchTerm}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export function ExampleUsage() {
  return (
    <div>
      <h1>Example Usage</h1>
      <div>
        <h2>Navigation Menu</h2>
        {renderNavigationMenu("This is a navigation menu description.")}
      </div>
    </div>
  );
}
