import React from 'react';

const InvoiceField = ({ onEditItem, cellData, required }) => {
  return (
    <input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required={required}
      contentEditable = {true}
      readOnly = {false}
    />
  );
};

export default InvoiceField;
