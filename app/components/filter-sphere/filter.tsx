import {
  FilterSphereProvider,
  FilterBuilder,
  useFilterSphere,
} from "@fn-sphere/filter";
import { filterFnList, filterSchema, getLocaleText } from "./schema";
import { filterTheme } from "./theme";
import { filterRuleToQueryString } from "./transform";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const AdvancedFilterBuilder = (props: Props) => {
  const { context } = useFilterSphere({
    schema: filterSchema,
    // defaultRule: queryStringToFilterRule(props.value),
    filterFnList,
    getLocaleText,
    onRuleChange: ({ filterRule }) => {
      props.onChange?.(filterRuleToQueryString(filterRule));
    },
  });
  return (
    <FilterSphereProvider context={context} theme={filterTheme}>
      <FilterBuilder />
    </FilterSphereProvider>
  );
};

export default AdvancedFilterBuilder;
