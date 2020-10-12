import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import GlobalStyle from 'global-styles/storybook-decorator';
import ControlPanel from '.';

export default {
  title: 'ControlPanel',
  decorators: [GlobalStyle],
};

const mockedDataSources = new Set([
  'firstDataSource',
  'secondDataSource',
  'thirdDataSource',
]);

const mockedCampaigns = new Set([
  'firstCampaign',
  'secondCampaign',
  'thirdCampaign',
]);

export const ControlPanelDefault = () => {
  const [currentFilters, setCurrentFilters] = useState({
    selectedCampaigns: [],
    selectedDataSources: [],
  });

  return (
    <ControlPanel
      dataSources={mockedDataSources}
      campaigns={mockedCampaigns}
      currentFilters={currentFilters}
      applyFilters={(filters) => {
        const { selectedDataSources, selectedCampaigns } = filters;
        action('fiters applied')(JSON.stringify(filters));
        setCurrentFilters({
          selectedDataSources,
          selectedCampaigns,
        });
      }}
      isDisabled={false}
    />
  );
};

export const ControlPanelDisabled = () => (
  <ControlPanel
    dataSources={mockedDataSources}
    campaigns={mockedCampaigns}
    currentFilters={[]}
    applyFilters={() => {}}
    isDisabled
  />
);

export const ControlPanelDataSourcesDisabled = () => (
  <ControlPanel
    dataSources={null}
    campaigns={mockedCampaigns}
    currentFilters={[]}
    applyFilters={() => {}}
    isDisabled={false}
  />
);

export const ControlPanelCampaignsDisabled = () => (
  <ControlPanel
    dataSources={mockedDataSources}
    campaigns={null}
    currentFilters={[]}
    applyFilters={() => {}}
    isDisabled={false}
  />
);

