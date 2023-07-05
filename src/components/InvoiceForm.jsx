import React, { useState, useEffect } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';
import { useRecoilState, useRecoilValue } from 'recoil';
import { invoicesState } from '../atoms/invoices';



const date = new Date();


const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [lastInvoiceNum, setLastInvoiceNum] = useState(1)
  const [rerender, makeRender] = useState(false)

  const [allInvoices, setAllInvoices] = useRecoilState(invoicesState)
  // console.log(allInvoices)

  //each invoice basic outline
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
      taxVal : 0,
      taxPer : 0,
      disVal : 0,
      disPer : 0
    },
  ]);


  const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
  ]

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
    const invoiceInfo = {
      invoiceNumber,
      cashierName,
      customerName,
      subtotal,
      tax,
      discount,
      total,
    }
    // console.log(invoiceInfo)
  };



  const addNextInvoiceHandler = () => {


    //check if this invoice already exists (edit mode)
    console.log('looking for invoice num', invoiceNumber)

    const invoiceInfo = {
      invoiceNumber,
      cashierName,
      customerName,
      subtotal,
      tax,
      discount,
      total,
      items: items,
    }

    const objIndex = allInvoices.findIndex(obj => obj.invoiceNumber === invoiceNumber)
    if (objIndex != -1) {
      console.log('found')

      const updatedArray = [...allInvoices]
      updatedArray[objIndex] = { ...invoiceInfo }
      console.log(updatedArray)
      setAllInvoices([...updatedArray])
      const nextInvoiceNum = incrementString(lastInvoiceNum)
      setInvoiceNumber(lastInvoiceNum)


    } else {
      //this invoice is new it doesn't exist
      setInvoiceNumber((prevNumber) => incrementString(prevNumber));
      // setLastInvoiceNum((prev)=>incrementString(prev))  
      const invoiceInfo = {
        invoiceNumber,
        cashierName,
        customerName,
        subtotal,
        tax,
        discount,
        total,
        items: items,
      }
      console.log(invoiceInfo)

      setAllInvoices([...allInvoices, invoiceInfo])
    }


    // const allInvoices 

    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
        taxVal : 0,
        taxPer : 0,
        disVal : 0,
        disPer : 0
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
        taxVal : 0,
        taxPer : 0,
        disVal : 0,
        disPer : 0
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const deleteInvoice = (myInvoice) =>{
    setAllInvoices((prev)=>prev.filter((item)=>item.invoiceNumber !== myInvoice.invoiceNumber))
  }

  
  const edtiItemHandler = (event) => {
    // console.log(event.target.value)
    // event.preventDefault()
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

   
    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {


          if(editedItem.name === "price" || editedItem.name === "qty"){
            if(items['taxPer']!=0){
              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newTaxRate = (items['taxPer'] * currTotal) / 100
              items['taxVal'] = newTaxRate
            }
            if(items['taxVal']!=0){
              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newTaxPer = (items['taxVal']*100 / currTotal)
              items[key] = editedItem.value
              items['taxPer'] = newTaxPer
            }
            if(items['disPer'] !=0){

              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newDisRate = (items['disPer'] * currTotal) / 100;
              items[key] = editedItem.value
              items['disVal'] = newDisRate
            }
          }
          
         else if(editedItem.name === "taxPer"){

            if(items['taxPer'] !=0){

              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newTaxRate = (editedItem.value * currTotal) / 100;
              items[key] = editedItem.value
              items['taxVal'] = newTaxRate
            }
            

          }else if(editedItem.name === "taxVal" ){

            if(items['taxVal']!=0){
              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newTaxPer = editedItem.value / currTotal
              items[key] = editedItem.value
              items['taxPer'] = newTaxPer
            }

          }else if(editedItem.name === "disVal"){

            if(items['disVal']!=0){
              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newDisPer = editedItem.value / currTotal
              items[key] = editedItem.value
              items['disPer'] = newDisPer
            }
          }else if(editedItem.name === "disPer"){

            if(items['disPer'] !=0){

              const currTotal = Number(items['price'] * Math.floor(items['qty']))
              const newDisRate = (editedItem.value * currTotal) / 100;
              items[key] = editedItem.value
              items['disVal'] = newDisRate
            }

          }else{
            items[key] = editedItem.value;
          }
          
          items[key] = editedItem.value;

        }
      }
      return items;
    });
    
    setItems(newItems);
    console.log(items)
    // makeRender(!rerender)
  };



  //calculate subtotal
  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0){
      const prevSubtotal = Number(curr.price * Math.floor(curr.qty) - curr.disVal + curr.taxVal)
      return prev + prevSubtotal;
    }
    else return prev;
  }, 0);


  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const editMyInvoice = (myInvoice) => {
    // console.log(myInvoice)
    setLastInvoiceNum(invoiceNumber)
    setItems(myInvoice.items)
    setCashierName(myInvoice.cashierName)
    setCustomerName(myInvoice.customerName)
    setTax(myInvoice.tax)
    setDiscount(myInvoice.discount)
    // subtotal = myInvoice.subtotal
    // total = myInvoice.total
    // discountRate = myInvoice.discountRate
    // taxRate = myInvoice.taxRate
    setInvoiceNumber(myInvoice.invoiceNumber)
  }

  return (
    <>

    <h1 style={{textAlign:"center", fontSize: '40px'}}>FRONT END TASK - INVOICE APPLICATION </h1>
      <form
        className="relative flex flex-col md:flex-row"
        style={{width:"100%"}}
        onSubmit={reviewInvoiceHandler}
      >
        <div className="flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm">
          <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:space-y-0">
            <div className="flex space-x-2">
              <span className="font-bold">Current Date: </span>
              <span>{today}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="invoiceNumber">
                Invoice Number:
              </label>
              <input
                required
                className="max-w-[130px]"
                type="number"
                name="invoiceNumber"
                id="invoiceNumber"
                min="1"
                step="1"
                value={invoiceNumber}
                onChange={(event) => setInvoiceNumber(event.target.value)}
                contentEditable={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
            <label
              htmlFor="cashierName"
              className="text-sm font-bold sm:text-base"
            >
              Cashier:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Cashier name"
              type="text"
              name="cashierName"
              id="cashierName"
              value={cashierName}
              onChange={(event) => setCashierName(event.target.value)}
            />
            <label
              htmlFor="customerName"
              className="col-start-2 row-start-1 text-sm font-bold md:text-base"
            >
              Customer:
            </label>
            <input
              required
              className="flex-1"
              placeholder="Customer name"
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </div>
          <table className="w-full p-4 text-left">
            <thead>
              <tr className="border-b border-gray-900/10 text-sm md:text-base">
                <th>ITEM</th>
                <th>QTY</th>
                <th className="text-center">PRICE (In Rs)</th>
                <th className="text-center">Tax</th>
                <th className="text-center">Tax %</th>
                <th className="text-center">Discount</th>
                <th className="text-center">Discount %</th>

                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
               <>
                <InvoiceItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  qty={item.qty}
                  price={item.price}
                  onDeleteItem={deleteItemHandler}
                  onEdtiItem={edtiItemHandler}
                />
                <div style={{width:'350px', alignItems:'center', marginTop : '20px', bottom : 20}}>
                  <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                  <h2>Final Tax Value (for this item):  </h2>
                  <h2>{item['taxVal']}</h2>
                  </div>
                  <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                  <h2>Final Tax Percentage(for this item) :  </h2>
                  <h2>{item['taxPer']}</h2>
                  </div>
                  <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                  <h2>Final Discount Rate (for this item):  </h2>
                  <h2>{item['disVal']}</h2>
                  </div>
                  <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                  <h2>Final Discount Percentage (for this item):  </h2>
                  <h2>{item['disPer']}</h2>
                  </div>
                </div>
                
              </>
              ))}
             

            </tbody>
          </table>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="button"
            onClick={addItemHandler}
          >
            Add Item
          </button>
          <div className="flex flex-col items-center">
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Subtotal:</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Discount:</span>
              <span>
                ({discount || '0'}%) {discountRate.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full justify-between md:w-1/2">
              <span className="font-bold">Tax:</span>
              <span>
                ({tax || '0'}%) {taxRate.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                {total % 1 === 0 ? total : total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/4 bg-transparent" style={{marginTop:'280px'}}>
          <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
            <button
              className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
              type="submit"
            >
              SUBMIT
            </button>
            <InvoiceModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              invoiceInfo={{
                invoiceNumber,
                cashierName,
                customerName,
                subtotal,
                taxRate,
                discountRate,
                total,
              }}
              items={items}
              onAddNextInvoice={addNextInvoiceHandler}
            />
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-bold md:text-base" htmlFor="tax">
                  Tax rate:
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full rounded-r-none bg-white shadow-sm"
                    type="number"
                    name="tax"
                    id="tax"
                    min="0.01"
                    step="0.01"
                    placeholder="0.0"
                    value={tax}
                    onChange={(event) => setTax(event.target.value)}
                  />
                  <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                    %
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-bold md:text-base"
                  htmlFor="discount"
                >
                  Discount rate:
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full rounded-r-none bg-white shadow-sm"
                    type="number"
                    name="discount"
                    id="discount"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                  />
                  <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <h2 style={{fontSize: '20px', marginTop: '10px'}}>All Invoices List (Click A row to edit)</h2>
      <table style={{ border: '2px solid forestgreen', width: '950px', height: '200px', left: '3px' }}>
        <tr>
          <th>invoiceNumber</th>
          <th>cashierName</th>
          <th>customerName</th>
          <th>discount</th>
          <th>subtotal</th>
          <th>tax</th>
          <th>total</th>

        </tr>
        {allInvoices.map((val, key) => {
          return (
            <tr onClick={() => editMyInvoice(val)} key={key}>
              <td style={{ textAlign: 'center' }}>{val.invoiceNumber}</td>
              <td style={{ textAlign: 'center' }}>{val.cashierName}</td>
              <td style={{ textAlign: 'center' }}>{val.customerName}</td>
              <td style={{ textAlign: 'center' }}>{val.discount}</td>
              <td style={{ textAlign: 'center' }}>{val.subtotal}</td>

              <td style={{ textAlign: 'center' }}>{val.tax}</td>

              <td style={{ textAlign: 'center' }}>{val.total}</td>

              <td className="flex items-center justify-center">
                <button
                  className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
                  onClick={()=>deleteInvoice(val)}
                >
                  <h2>Delete</h2>
                </button>
              </td>
            </tr>
          )
        })}
      </table>

    </>
  );
};

export default InvoiceForm;
