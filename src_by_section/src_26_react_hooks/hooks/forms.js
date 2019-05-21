import { useState } from 'react';

export const useFormImput = () => {
  const [ value, setValue] = useState('');
  const [ validity, setValidity ] = useState(false);

  const inputChangedHandler = event => {
    setValue(event.target.value);
    setValidity(event.target.value.trim() !== '');
  };

  return { value: value, onChanage: inputChangedHandler, validity: validity}
}