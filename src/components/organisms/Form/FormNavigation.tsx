import React from 'react';

import useTooltip from '@hooks/useTooltip';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormNavigationPageProps } from './Form.types';

const FormNavigationBar: React.FC<FormNavigationPageProps> = ({ id }) => {
  const disabled = FormStore.useStoreState(({ pages }) => {
    return pages.find((page: FormNavigationPageProps) => page.id === id)
      ?.disabled;
  });

  const title = FormStore.useStoreState(({ pages }) => {
    return pages.find((page: FormNavigationPageProps) => page.id === id)?.title;
  });

  const setPageId = FormStore.useStoreActions((store) => store.setPageId);
  const ref: React.LegacyRef<any> = useTooltip(title);

  const onClick = () => {
    if (!disabled) setPageId(id);
  };

  const css = cx('o-form-nav', { 'o-form-nav--disabled': disabled });

  return <div ref={ref} className={css} onClick={onClick} />;
};

const FormNavigation: React.FC = () => {
  const pages = FormStore.useStoreState((store) => store.pages);
  if (pages?.length === 1) return null;

  return (
    <div className="o-form-nav-ctr">
      {pages.map(({ id }: FormNavigationPageProps) => {
        return <FormNavigationBar key={id} id={id} />;
      })}
    </div>
  );
};

export default FormNavigation;
