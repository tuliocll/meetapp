import React, { useState, useEffect, useRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt-BR';

export default function DatePicker({ name }) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [selected, setSelected] = useState(defaultValue);

    registerLocale('pt', pt);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.selected',
            clearValue: pickerRef => {
                pickerRef.clear();
            },
        });

        setSelected(defaultValue);
    }, [ref.current, fieldName, defaultValue]); // eslint-disable-line

    return (
        <>
            <ReactDatePicker
                name={fieldName}
                selected={selected}
                onChange={date => setSelected(date)}
                ref={ref}
                locale="pt"
                showTimeSelect
                timeFormat="p"
                timeInputLabel="Horario"
                timeIntervals={15}
                placeholderText="Data do meetup"
                dateFormat="Pp"
            />
            {error && <span>{error}</span>}
        </>
    );
}

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
};
