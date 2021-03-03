import React, { useEffect, useState } from 'react';

import Show from '@containers/Show';
import { useStoreState } from '@store/Store';
import Loader1 from './images/loader-1.svg';
import Loader2 from './images/loader-2.svg';
import Loader3 from './images/loader-3.svg';
import Loader4 from './images/loader-4.svg';
import Loader5 from './images/loader-5.svg';

const LoaderContent: React.FC = () => (
  <>
    <div>
      <div>
        <Loader2 />
      </div>

      <div>
        <Loader4 />
      </div>
    </div>

    <div>
      <div>
        <Loader1 />
      </div>

      <div>
        <Loader3 />
      </div>

      <div>
        <Loader5 />
      </div>
    </div>

    <div>
      <div>
        <Loader2 />
      </div>

      <div>
        <Loader4 />
      </div>
    </div>
  </>
);

/**
 * Hexagon-styled loader that is overlayed over the entire page when the entire
 * application is being loaded for the first time.
 */
const Loader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const isShowing = useStoreState(({ loader }) => loader.isShowing);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isShowing && !loading) setLoading(true);
    else {
      timeout = setTimeout(() => {
        if (!isShowing && loading) setLoading(false);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [isShowing, loading]);

  return (
    <Show show={loading}>
      <div className="c-loader-ctr">
        <div className="c-loader">
          <LoaderContent />
        </div>
      </div>
    </Show>
  );
};

export default Loader;
