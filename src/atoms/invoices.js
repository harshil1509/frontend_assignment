import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';

export const invoicesState = atom({
    key: 'invoicesState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });