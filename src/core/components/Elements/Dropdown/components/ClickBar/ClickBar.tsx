import React, { useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import Form from '@components/Form/Form.store';
import { makeClass } from '@util/util';
import Dropdown from '../../Dropdown.store';

// const Value = ({ multiple, onClick, value }: ClickBarValueProps) => {
//   const css = makeClass([
//     'c-tag-attr',
//     'c-form-dd-value',
//     [multiple, 'c-form-dd-value--cancel']
//   ]);

//   return (
//     <button className={css} onClick={onClick}>
//       {value}
//     </button>
//   );
// };

// const ValueContainer = ({
//   isOpen,
//   multiple,
//   openOptions,
//   title
// }: ClickBarProps) => {
//   const values = Form.useStoreState(({ getItem }) => {
//     const result = getItem({ title }).value;
//     if (!result) return null;
//     return Array.isArray(result) ? result : [result];
//   });

//   const updateItem = Form.useStoreActions((store) => store.updateItem);

//   const deleteValue = (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     value: string
//   ) => {
//     if (!isOpen) openOptions();
//     if (!Array.isArray(values)) return;
//     e.stopPropagation();
//     const updatedValues = values.filter((option: string) => option !== value);
//     updateItem({ title, value: updatedValues });
//   };

//   if (!values?.length) return null;

//   return (
//     <div className="c-form-dd-value-ctr">
//       {values.map((value: string) => (
//         <Value
//           key={value}
//           multiple={multiple}
//           value={value}
//           onClick={(e) => deleteValue(e, value)}
//         />
//       ))}
//     </div>
//   );
// };

export default () => {
  const isOpen = Dropdown.useStoreState((store) => store.isOpen);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);
  const setWidth = Dropdown.useStoreActions((store) => store.setWidth);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  const onClick = () => setIsOpen(!isOpen);

  const css = makeClass(['c-form-dd-bar', [isOpen, 'c-form-dd-bar--open']]);

  return (
    <div ref={ref} className={css} onClick={onClick}>
      <div>{/* <ValueContainer {...props} /> */}</div>

      <IoCaretDown />
    </div>
  );
};
