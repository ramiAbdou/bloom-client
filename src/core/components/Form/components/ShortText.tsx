/**
 * @fileoverview Component: ShortText
 * - Input bar that allows for a maximum character limit.
 * @author Rami Abdou
 */

import React from 'react';

import Input from '@components/Misc/Input';
import Form from '../Form.store';
import { FormItemData } from '../Form.types';

export default ({ maxCharacters, title }: FormItemData) => {
  const value = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const updateText = (text: string) => {
    // If the max characters are specfied and the value is longer than that,
    // don't allow the user to type any more characters.
    if (maxCharacters && text.length > maxCharacters) return;
    updateItem({ title, value: text });
  };

  return (
    <Input value={value} onChange={({ target }) => updateText(target.value)} />
  );
};

// return (
//   <input
//     ref={inputRef}
//     onClick={activate}
//     // If the user presses TAB, inactivate the current form item.
//     onKeyDown={onKeyDown}
//   />
// );

// const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

// useEffect(() => {
//   if (isActive) inputRef.current.focus();
// }, [isActive]);
