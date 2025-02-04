import {
  FilterSphereProvider,
  FilterBuilder,
  useFilterSphere,
  FilterGroup,
} from "@fn-sphere/filter";
import { filterFnList, filterSchema, getLocaleText } from "./schema";
import { filterTheme } from "./theme";
import { filterRuleToQueryString } from "./transform";
import { cacheFilterRule, getCachedFilterRule } from "./utils";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const AdvancedFilterBuilder = (props: Props) => {
  const defaultRule = getCachedFilterRule(props.value ?? "") ?? undefined;
  const { context } = useFilterSphere({
    schema: filterSchema,
    defaultRule,
    filterFnList,
    getLocaleText,
    onRuleChange: ({ filterRule }) => {
      const query = filterRuleToQueryString(filterRule);
      props.onChange?.(query);
      cacheFilterRule(query, filterRule);
    },
  });
  return (
    <FilterSphereProvider context={context} theme={filterTheme}>
      <FilterBuilder />
    </FilterSphereProvider>
  );
};

export default AdvancedFilterBuilder;
