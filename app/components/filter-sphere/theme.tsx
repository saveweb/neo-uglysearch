import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  type FilterTheme,
  createFilterTheme,
  presetTheme,
  useFilterGroup,
  useRootRule,
  useView,
} from "@fn-sphere/filter";
import { type ChangeEvent, useCallback } from "react";

// See http://www.waterwater.moe/fn-sphere/customization/theme/

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
    return <Input className="h-10" onChange={handleChange} {...props} />;
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
        <SelectTrigger className="min-w-28">
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
  FilterGroupContainer: ({ rule, children, ...props }) => {
    const { getLocaleText } = useRootRule();
    const {
      ruleState: { isRoot, depth },
      toggleGroupOp,
      appendChildRule,
      appendChildGroup,
      removeGroup,
    } = useFilterGroup(rule);

    const text =
      rule.op === "or"
        ? getLocaleText("operatorOr")
        : getLocaleText("operatorAnd");

    const handleToggleGroupOp = useCallback(() => {
      toggleGroupOp();
    }, [toggleGroupOp]);

    const handleAddCondition = useCallback(() => {
      appendChildRule();
    }, [appendChildRule]);

    const handleAddGroup = useCallback(() => {
      appendChildGroup();
    }, [appendChildGroup]);

    const handleDeleteGroup = useCallback(() => {
      removeGroup();
    }, [removeGroup]);

    return (
      <div
        className={cn(
          "relative flex flex-col items-start rounded-base border-2 border-border px-3 py-2 gap-2 bg-opacity pt-8",
          isRoot ? "mt-8" : "mt-6"
        )}
        {...props}
      >
        <div className="flex gap-2 absolute top-0 -translate-y-1/2">
          <Button onClick={handleToggleGroupOp}>{text}</Button>
          <Button variant="neutral" onClick={handleAddCondition}>
            {getLocaleText("addRule")}
          </Button>
          {depth < 3 && (
            <Button variant="neutral" onClick={handleAddGroup}>
              {getLocaleText("addGroup")}
            </Button>
          )}
          {!isRoot && (
            <Button variant="neutral" onClick={handleDeleteGroup}>
              {getLocaleText("deleteGroup")}
            </Button>
          )}
        </div>
        {children}
      </div>
    );
  },
  FilterSelect: (props) => {
    const PresetFilterSelect = presetTheme.templates.FilterSelect;
    return <PresetFilterSelect tryRetainArgs {...props} />;
  },
} satisfies Partial<FilterTheme["templates"]>;

export const filterTheme = createFilterTheme({
  components: componentsSpec,
  templates: templatesSpec,
});
