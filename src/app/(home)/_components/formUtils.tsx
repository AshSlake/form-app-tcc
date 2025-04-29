import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { renderNavigationMenu } from "./description_checkbox";
import { SelectPerso } from "./select";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Renderiza um campo de formulário com suporte para vários tipos de entrada, incluindo texto, número, email e select.
 *
 * @template T - Um tipo genérico que estende `FieldValues` do React Hook Form.
 *
 * @param field - O objeto `ControllerRenderProps` fornecido pelo React Hook Form, usado para vincular o campo de entrada.
 * @param label - O texto do rótulo exibido acima do campo de formulário.
 * @param placeholder - O texto do placeholder exibido dentro do campo de entrada.
 * @param type - O tipo do campo de entrada. O padrão é `"text"`. Tipos suportados: `"text"`, `"number"`, `"email"`, `"select"`.
 * @param additionalContent - Um ReactNode opcional para renderizar conteúdo personalizado para tipos de entrada não suportados.
 * @param options - Um array opcional de objetos para o tipo de entrada select, onde cada objeto contém um `value` e um `label`.
 *
 * @returns Um elemento JSX representando o campo de formulário.
 */
export function renderFormField<T extends FieldValues>(
  field: ControllerRenderProps<T>,
  label: string,
  placeholder: string,
  type: string = "text",
  additionalContent?: ReactNode,
  options?: { value: string; label: string }[]
) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {type === "select" && options ? (
          SelectPerso(placeholder, options)
        ) : type === "text" || type === "email" ? (
          <Input type={type} placeholder={placeholder} {...field} />
        ) : type === "number" ? (
          <Input
            type={"text"}
            placeholder={placeholder}
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        ) : (
          additionalContent
        )}
      </FormControl>
    </FormItem>
  );
}

/**
 * Renderiza um grupo de checkboxes para aceitar termos, com base em uma lista de opções fornecida.
 *
 * @template T - Um tipo genérico que estende `FieldValues` do React Hook Form.
 * @param field - Propriedades do controlador do React Hook Form para gerenciar o estado do campo.
 * @param label - Rótulo exibido acima do grupo de checkboxes.
 * @param options - Lista de opções para os checkboxes, onde cada opção contém um valor e uma descrição.
 *
 * Cada opção é renderizada como um checkbox com um rótulo e uma descrição adicional.
 * Quando o estado de um checkbox é alterado, o valor correspondente é adicionado ou removido
 * da lista de valores selecionados no estado do formulário.
 */
export function renderTermsCheckbox<T extends FieldValues>(
  field: ControllerRenderProps<T>,
  label: string,
  options: { value: string; description: string }[]
) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex flex-col space-y-2">
          {options.map((option) => (
            <Label key={option.value} className="flex items-center space-x-2">
              <Checkbox
                value={option.value}
                checked={field.value.includes(option.value) || false}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...(field.value || []), option.value]
                    : (field.value || []).filter(
                        (v: string) => v !== option.value
                      );
                  field.onChange(newValue);
                }}
                className="form-checkbox"
              />
              <span>{option.value}</span>
              <span>{renderNavigationMenu(option.description)}</span>
            </Label>
          ))}
        </div>
      </FormControl>
    </FormItem>
  );
}
