import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { academicResearchTerm } from "./content";

/**
 * Componente que renderiza um menu de navegação com conteúdo informativo.
 *
 * @param {string} string - O conteúdo textual a ser exibido no menu
 * @returns {React.ReactElement} Um componente de menu de navegação com trigger "?"
 */
export function renderNavigationMenu(string: string) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* Botão de trigger do menu (ícone de interrogação) */}
          <NavigationMenuTrigger type="button">{"?"}</NavigationMenuTrigger>
          {/* Conteúdo que aparece ao clicar no trigger */}
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

/**
 * Componente que renderiza um checkbox de aceitação de termos com menu explicativo.
 *
 * @param {boolean} accepted - Estado que indica se os termos foram aceitos
 * @param {(value: boolean) => void} setAccepted - Função para atualizar o estado de aceitação
 * @returns {React.ReactElement} Checkbox de termos com menu interativo
 */
export function renderTermsConcientiCheckbox(
  accepted: boolean,
  setAccepted: (value: boolean) => void
) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      {/* Checkbox de aceitação */}
      <input
        type="checkbox"
        id="terms-checkbox"
        required
        checked={accepted}
        onChange={(e) => setAccepted(e.target.checked)}
        style={{ width: "20px", height: "20px" }}
      ></input>

      {/* Menu de navegação com os termos completos */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {/* Trigger com o texto dos termos */}
            <NavigationMenuTrigger type="button">
              {"Aceito os termos de conscientização"}
            </NavigationMenuTrigger>
            {/* Conteúdo expandido com os termos acadêmicos */}
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
