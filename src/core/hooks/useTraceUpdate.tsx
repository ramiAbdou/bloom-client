import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Helps to identify which props in a component are forcing it to re-render.
 * In order to accurately identify, include non-prop state variables such as
 * ones provided from a Redux store.
 */
export default (props: any) => {
  const prev: MutableRefObject<any> = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) ps[k] = [prev.current[k], v];
      return ps;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      // eslint-disable-next-line no-console
      console.log('Changed Props:', changedProps);
    }

    prev.current = props;
  });
};
