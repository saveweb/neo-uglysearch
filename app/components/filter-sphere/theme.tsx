import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type FilterTheme,
  createFilterTheme,
  presetTheme,
  useView,
} from "@fn-sphere/filter";
import { type ChangeEvent, useCallback } from "react";

const componentsSpec = {
  Button: (props) => {
    return <Button variant="noShadow" {...props} />;
  },
  Input: ({ onChange, ...props }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );
    return <Input onChange={handleChange} {...props} />;
  },
  Select: ({ value, onChange, options = [], className, disabled }) => {
    const selectedIdx = options.findIndex((option) => option.value === value);
    const handleChange = useCallback(
      (value: string) => {
        const index = Number(value);
        onChange?.(options[index].value);
      },
      [options, onChange]
    );
    return (
      <Select
        value={String(selectedIdx)}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger className="min-w-24">
          <SelectValue className={className} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem key={option.label} value={String(index)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
} satisfies Partial<FilterTheme["components"]>;

const templatesSpec = {
  FilterGroupContainer: (props) => {
    const PresetFilterGroupContainer = presetTheme.templates.FilterGroupContainer;
    return (
      <PresetFilterGroupContainer
        className="flex flex-col items-start rounded-base border-2  border-border px-3 py-2 gap-4"
        {...props}
      />
    );
  },
} satisfies Partial<FilterTheme["templates"]>;

export const filterTheme = createFilterTheme({
  components: componentsSpec,
  templates: templatesSpec,
});
