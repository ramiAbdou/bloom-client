import React from 'react';

const FormDescription: React.FC = ({ children }) => {
  if (!children) return null;
  return <p className="o-form-desc">{children}</p>;
};

export default FormDescription;
