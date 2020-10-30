import styled from 'styled-components';

export const Wrapper = styled.aside`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 0.5rem 0.5rem 0;
  padding: 1rem;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SelectWrapper = styled.div`
  width: 20rem;
  margin: 0 0.5rem 0.5rem 0;
  :first-of-type {
    margin-top: 0.5rem;
  }
`;
