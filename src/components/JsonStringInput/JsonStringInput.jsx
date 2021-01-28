import React from 'react';

export const JsonStringInput = ({onChange, ...rest}) => {
  const onChangeHandle = ({target}) => {
    const {value} = target;
    
    try {
      const jsonParsedObject = JSON.parse(value);
      if(jsonParsedObject) {
        onChange && onChange(jsonParsedObject)
      }
    } catch {
      onChange && onChange({});
    }
  } 

  return <textarea onChange={onChangeHandle} {...rest}></textarea>
}