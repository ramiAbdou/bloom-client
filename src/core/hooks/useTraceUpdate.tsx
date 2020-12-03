/**
 * @fileoverview Hook: useTraceUpdate

 */

import { useEffect, useRef } from 'react';

export default (props) => {
  const prev = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) ps[k] = [prev.current[k], v];

      return ps;
    }, {});

    if (Object.keys(changedProps).length > 0)
      console.log('Changed Props:', changedProps);

    prev.current = props;
  });
};
