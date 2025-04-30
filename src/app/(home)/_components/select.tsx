import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

/**
 * Componente Select personalizado com Radix UI.
 *
 * Este componente cria um dropdown selecionável com opções personalizadas.
 *
 * @param {string} placeholder - Texto exibido quando nenhuma opção está selecionada
 * @param {Array<{value: string, label: string}>} values - Array de opções para o select
 * @returns {React.ReactElement} Componente Select personalizado
 *
 * @example
 * // Exemplo de uso:
 * <SelectPerso
 *   placeholder="Selecione uma opção"
 *   values={[
 *     { value: "opt1", label: "Opção 1" },
 *     { value: "opt2", label: "Opção 2" }
 *   ]}
 * />
 */
export function SelectPerso(
  placeholder: string,
  values: { value: string; label: string }[]
) {
  return (
    <Select>
      {/* Gatilho do select que mostra o valor selecionado ou o placeholder */}
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      {/* Conteúdo do dropdown */}
      <SelectContent>
        <SelectGroup>
          {/* Label do grupo de opções (fixo como "Options") */}
          <SelectLabel>Options</SelectLabel>

          {/* Mapeamento das opções fornecidas via prop values */}
          {values.map((item) => (
            <SelectItem
              key={item.value} // Chave única para cada item
              value={item.value} // Valor que será retornado quando selecionado
            >
              {item.label} {/* Texto visível para a opção */}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
