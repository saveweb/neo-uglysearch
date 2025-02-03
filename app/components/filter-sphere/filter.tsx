import {
  FilterSphereProvider,
  FilterBuilder,
  useFilterSphere,
  FilterGroup,
} from "@fn-sphere/filter";
import { filterFnList, filterSchema, getLocaleText } from "./schema";
import { filterTheme } from "./theme";
import { filterRuleToQueryString } from "./transform";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

let cacheKey = "";
let cacheRule: FilterGroup | undefined = undefined;

const AdvancedFilterBuilder = (props: Props) => {
  const defaultRule = props.value === cacheKey ? cacheRule : undefined;
  const { context } = useFilterSphere({
    schema: filterSchema,
    defaultRule,
    filterFnList,
    getLocaleText,
    onRuleChange: ({ filterRule }) => {
      const query = filterRuleToQueryString(filterRule);
      props.onChange?.(query);
      cacheKey = query;
      cacheRule = filterRule;
    },
  });
  return (
    <FilterSphereProvider context={context} theme={filterTheme}>
      <FilterBuilder />
    </FilterSphereProvider>
  );
};

export default AdvancedFilterBuilder;
