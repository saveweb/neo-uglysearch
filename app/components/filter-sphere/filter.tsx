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
  onChange?: (value: string, viewUpdate: any) => void;
}

const AdvancedFilter = (props: Props) => {
  const { filterRule, context } = useFilterSphere({
    schema: filterSchema,
    filterFnList,
    getLocaleText,
  });
  console.log("filterRule:", filterRuleToQueryString(filterRule));
  return (
    <FilterSphereProvider context={context} theme={filterTheme}>
      <FilterBuilder />
    </FilterSphereProvider>
  );
};

export default AdvancedFilter;
