import React from 'react';

function LoadingSpinner(props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border green my-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
export default LoadingSpinner;
