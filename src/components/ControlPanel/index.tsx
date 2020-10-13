import React, { ReactElement, useState, memo, useMemo } from 'react';
import Button from '@atlaskit/button';
import Select, { ValueType } from '@atlaskit/select';
import { Filters } from 'hooks/useFilterChartData';

export interface Props {
  campaigns: Set<string> | null;
  dataSources: Set<string> | null;
  currentFilters: Filters;
  applyFilters: (filters: Filters) => void;
  isDisabled: boolean;
}

function mapArrayToSelectOptions(
  options: string[]
): { label: string; value: string }[] {
  return options.map((opt: string) => ({
    label: opt,
    value: opt,
  }));
}

export default memo(ControlPanel);

function ControlPanel({
  campaigns,
  dataSources,
  applyFilters,
  currentFilters,
  isDisabled,
}: Props): ReactElement {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const campaignsSelectOptions = useMemo(
    () => (campaigns ? mapArrayToSelectOptions([...campaigns]) : []),
    [campaigns]
  );
  const dataSourcesSelectOptions = useMemo(
    () => (dataSources ? mapArrayToSelectOptions([...dataSources]) : []),
    [dataSources]
  );

  return (
    <section>
      <div>
        <Select
          className="campaign-select"
          classNamePrefix="react-select"
          isDisabled={isDisabled || !campaigns}
          isSearchable={campaigns !== null && campaigns.size > 9}
          isMulti
          options={campaignsSelectOptions}
          placeholder="Choose Campaigns"
          value={mapArrayToSelectOptions(selectedCampaigns)}
          onChange={(values: ValueType<{ label: string; value: string }>) => {
            setSelectedCampaigns(
              values && values instanceof Array
                ? values.map(({ value }: { value: string }) => value)
                : []
            );
          }}
        />
      </div>
      <div>
        <Select
          className="data-source-select"
          classNamePrefix="react-select"
          isDisabled={isDisabled || !dataSources}
          isSearchable={dataSources !== null && dataSources.size > 9}
          isMulti
          options={dataSourcesSelectOptions}
          placeholder="Choose Data Sources"
          value={mapArrayToSelectOptions(selectedDataSources)}
          onChange={(values: ValueType<{ label: string; value: string }>) => {
            setSelectedDataSources(
              values && values instanceof Array
                ? values.map(({ value }: { value: string }) => value)
                : []
            ); 
          }}
        />
      </div>
      <Button
        isDisabled={
          isDisabled ||
          !dataSources ||
          !campaigns ||
          (currentFilters.selectedCampaigns === selectedCampaigns &&
            currentFilters.selectedDataSources === selectedDataSources)
        }
        onClick={() => applyFilters({ selectedCampaigns, selectedDataSources })}
      >
        Apply
      </Button>
    </section>
  );
}
