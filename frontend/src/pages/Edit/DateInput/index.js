import React, { useState, useRef, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ name }) {
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(
    parseISO(defaultValue) || new Date()
  );

  const ref = useRef(null);

  useEffect(() => {
    registerField({
      name: 'date',
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <>
      <ReactDatePicker
        placeholder="Data do meetup"
        selected={selected}
        onChange={date => setSelected(date)}
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect
        locale="pt-BR"
        timeCaption="Horário"
        min={new Date()}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
