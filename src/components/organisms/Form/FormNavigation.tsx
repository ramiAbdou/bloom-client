import React, { useEffect } from 'react';

import useTooltip from '@hooks/useTooltip';
import { cx } from '@util/util';
import FormStore from './Form.store';
import { FormNavigationPageProps } from './Form.types';

interface FormNavigationProps {
  pages?: FormNavigationPageProps[];
}

const FormNavigationBar: React.FC<FormNavigationPageProps> = ({
  disabled,
  id,
  title
}) => {
  const setPageId = FormStore.useStoreActions((store) => store.setPageId);
  const ref: React.LegacyRef<any> = useTooltip(title);

  const onClick = () => {
    if (!disabled) setPageId(id);
  };

  const css = cx({ 'o-form-nav': true, 'o-form-nav--disabled': disabled });

  return <div ref={ref} className={css} onClick={onClick} />;
};

const FormNavigation: React.FC<FormNavigationProps> = ({ pages }) => {
  const setPages = FormStore.useStoreActions((store) => store.setPages);
  const formattedPages = pages.map((page, i) => ({ ...page, disabled: !!i }));

  useEffect(() => {
    if (pages?.length) setPages(pages);
  }, [pages]);

  if (!pages?.length) return null;

  return (
    <div className="o-form-nav-ctr">
      {formattedPages.map((page: FormNavigationPageProps) => {
        return <FormNavigationBar key={page.id} {...page} />;
      })}
    </div>
  );
};

export default FormNavigation;
