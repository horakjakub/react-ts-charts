import React from "react";
import GlobalStyle from "global-styles/storybook-decorator";
import Dashboard from ".";

export default {
  title: "Dashboard",
  decorators: [GlobalStyle],
};

export const DashboardDefault = () => <Dashboard />;
