import InvoiceForm from './components/InvoiceForm';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl">
        <InvoiceForm />
      </div>
    </div>
    </RecoilRoot>
  );

}

export default App;
