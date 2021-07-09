import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export default function NumberFormatCI(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        decimalSeparator=","
        thousandSeparator="."
        allowNegative={false}
        // allowLeadingZeros={false}
        decimalScale={0}
        isNumericString
        // prefix="CI "
      />
    );
  }
  
  NumberFormatCI.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };