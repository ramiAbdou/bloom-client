/**
 * @fileoverview Component: ConfirmationModal
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';

// Precondition: The modal options (confirmation) MUST already be set, meaning
// this should only display if the type is CONFIRMATION.

export default () => {
  const body = useStoreState(({ modal }) => modal.options.body);
  const description = useStoreState(({ modal }) => modal.options.description);
  const header = useStoreState(({ modal }) => modal.options?.header);
  const primaryButton = useStoreState(
    ({ modal }) => modal.options.primaryButton
  );
  const outlineButton = useStoreState(
    ({ modal }) => modal.options.outlineButton
  );
  const title = useStoreState(({ modal }) => modal.options?.title);

  return (
    <>
      {header ?? <h1>{title}</h1>}
      {body ?? <p>{description}</p>}
      <div className="c-modal--confirmation-action-ctr">
        {primaryButton}
        {outlineButton}
      </div>
    </>
  );
};
