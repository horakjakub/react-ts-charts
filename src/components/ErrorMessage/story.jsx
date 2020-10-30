import React from 'react';
import GlobalStyle from 'global-styles/storybook-decorator';
import ErrorMessage from '.';

export default {
  title: 'ErrorMessage',
  decorator: GlobalStyle,
};

export const ErrorMessageDefault = () => {
  return <ErrorMessage error={new Error('mocked error message')} />;
};
