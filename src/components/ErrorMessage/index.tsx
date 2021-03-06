import React, { memo, useState, useEffect } from 'react';
import Button from '@atlaskit/button';
import { DATA_URL } from 'hooks/useFetchChartData';
import { ButtonWrapper } from './styled';

export default memo(ErrorMessage);

interface Props {
  error: Error;
}

function ErrorMessage({ error }: Props) {
  const [showErrorDetails, setShowErrorDetails] = useState<boolean>(false);

  useEffect(() => {
    setShowErrorDetails(false);
  }, [error]);

  return (
    <div>
      Ooops! There are some issues with given <a href={DATA_URL}>API point</a>.
      {!showErrorDetails && (
        <ButtonWrapper>
          <Button onClick={() => setShowErrorDetails(true)}>
            SHOW DETAILS
          </Button>
        </ButtonWrapper>
      )}
      {showErrorDetails && <div> Error message: "{error.message}" </div>}
    </div>
  );
}
