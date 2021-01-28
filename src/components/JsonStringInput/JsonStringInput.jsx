import React, {useState} from 'react';

export const JsonStringInput = ({onButtonClick, ...rest}) => {
  const [textAreaValue, setTextAreaValue] = useState("");

  const onChangeHandle = ({target}) => {
    const {value} = target;
    setTextAreaValue(value);
  }
  const handleOnButtonClick = () => {
    try {
      const jsonParsedObject = JSON.parse(textAreaValue);
      if(jsonParsedObject) {
        onButtonClick && onButtonClick(jsonParsedObject)
      }
    } catch {
      onButtonClick && onButtonClick({});
    }
  }

  return (<>
    <h1>Put your JSON here!</h1>
    <textarea onChange={onChangeHandle} cols={50} rows={10} {...rest}></textarea>
    <div>
      <button onClick={handleOnButtonClick} style={{marginBottom: "20px"}}>Prettify JSON</button>
    </div>
    </>)
}