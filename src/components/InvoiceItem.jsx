import React from 'react';
import InvoiceField from './InvoiceField';

const InvoiceItem = ({ id, name, qty, price, taxVal, taxPer, disVal, disPer, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td >
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Item name',
            type: 'text',
            name: 'name',
            id: id,
            value: name,
            required: true
          }}
        />
      </td>
      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'qty',
            id: id,
            value: qty,
            required : true
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
       
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: 'text-right',
            type: 'number',
            min: '1',
            step: '1',
            name: 'price',
            id: id,
            value: price,
            required : true
          }}
        />
      </td>
      


      <td className="relative min-w-[100px] md:min-w-[100px]">
       
       <InvoiceField
         onEditItem={(event) => onEdtiItem(event)}
         cellData={{
           className: 'text-right',
           type: 'number',
           min: '0',
           step: '0.01',
           name: 'taxVal',
           id: id,
           value: taxVal,
           required : false
         }}
       />
     </td>
     <td className="relative min-w-[100px] md:min-w-[100px]">
       
       <InvoiceField
         onEditItem={(event) => onEdtiItem(event)}
         cellData={{
           className: 'text-right',
           type: 'number',
           min: '1',
           step: '1',
           name: 'taxPer',
           id: id,
           value: taxPer,
           required : false
         }}
       />
     </td>
     <td className="relative min-w-[100px] md:min-w-[100px]">
       
       <InvoiceField
         onEditItem={(event) => onEdtiItem(event)}
         cellData={{
           className: 'text-right',
           type: 'number',
           min: '1',
           step: '1',
           name: 'disVal',
           id: id,
           value: disVal,
           required : false
         }}
       />
     </td>
     <td className="relative min-w-[100px] md:min-w-[100px]">
       
       <InvoiceField
         onEditItem={(event) => onEdtiItem(event)}
         cellData={{
           className: 'text-right',
           type: 'number',
           min: '0',
           step: '0.01',
           name: 'disPer',
           id: id,
           value: disPer,
           required : false
         }}
       />
     </td>
      <td className="flex items-center justify-center">
        <button
          className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
          onClick={deleteItemHandler}
        >
          <h2>Delete</h2>
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
