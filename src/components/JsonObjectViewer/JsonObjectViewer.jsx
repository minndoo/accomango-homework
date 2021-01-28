import React, {useState} from 'react';

import './JsonObjectViewer.scss';

export const JsonObjectViewer = ({objectToView, objectKey, currentDepth = 0,...rest}) => {
  const [isTreeOpen, setIsTreeOpen] = useState(true);

  const buttonToggleClassName = `json-object-viewer-tree-toggle ${isTreeOpen ? 'tree-open' : ''}`.trim();

  const toggleTreeOpen = () => {
    setIsTreeOpen(!isTreeOpen);
  }

  const renderSimpleType = ({value, key, index}) => <li className="json-object-viewer-list-item" key={`${currentDepth}-${index}`}>{key && <span>"{key}" : </span>}{value},</li>
  
  const handleRender = ({value, key, index}) => {
    const objectType = typeof value;
    let valueComponent = null;

    switch (objectType) {
      case 'object' : {
        return <JsonObjectViewer currentDepth={currentDepth+1} objectToView={value} objectKey={key} />;
      }

      case 'undefined' : {
        valueComponent = <span className="object-value-type-undefined">{value}</span>;
        break;
      }

      case 'string' : {
        valueComponent = <span className="object-value-type-string">"{value}"</span>;
        break;
      }

      case 'number' :  {
        valueComponent = <span className="object-value-type-number">{value}</span>
        break;
      }

      case 'boolean' : {
        const booleanTypeValue = value ? 'true' : 'false';
        valueComponent = <span className={`object-value-type-boolean-${booleanTypeValue}`}>{booleanTypeValue}</span>;
        break;
      }
    }

    return renderSimpleType({value: valueComponent, key, index});
  }

  const renderChildren = (objectToView) => {
    if(typeof objectToView === "object" && Array.isArray(objectToView)) {
      return <>
      {'['}
      <ul className="json-object-viewer-list">
        {objectToView.map((currentValue, index) => {
          return handleRender({value:currentValue, index});
        })}
      </ul>
      {']'}
      </>
    } else if(typeof objectToView === "object" && !Array.isArray(objectToView)) {
      const objectToViewKeys = Object.keys(objectToView);

      return(
        <>
        {'{'}
        <ul className="json-object-viewer-list">
          {objectToViewKeys.map((currentValue, index) => {
            return handleRender({value: objectToView[currentValue], key: currentValue, index});
          })}
        </ul>
        {'},'}
        </>
      );
    }
  }

  if(!objectToView || Object.keys(objectToView).length === 0) {
    return null;
  }

  return <div className="json-object-viewer-wrapper">
      <button className={buttonToggleClassName} onClick={toggleTreeOpen} >{'>'}</button>
        {objectKey && <span>{objectKey} : </span>}
        {!isTreeOpen && <span>...</span>}
        {isTreeOpen && renderChildren(objectToView)}
    </div>;
}