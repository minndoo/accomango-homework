import React from 'react';

import './JsonObjectViewer.css';

export const JsonObjectViewer = ({objectToView, objectKey, currentDepth = 0,...rest}) => {

  const renderSimpleType = ({value, key}) => <li className="json-object-viewer-list-item">{key && <span>"{key}" : </span>}{value},</li>
  
  const handleRender = ({value, key}) => {
    const objectType = typeof value;
    let valueComponent = null;

    switch (objectType) {
      case 'object' : {
        return <li><JsonObjectViewer currentDepth={currentDepth+1} objectToView={value} objectKey={key} /></li>
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
        const booleanTypeClassName = objectToView ? 'true' : 'false';
        valueComponent = <span className={`object-value-type-boolean-${booleanTypeClassName}`}>{value}</span>;
        break;
      }
    }

    return renderSimpleType({value: valueComponent, key: key});
  }

  const renderChildren = (objectToView) => {
    if(typeof objectToView === "object" && Array.isArray(objectToView)) {
      return <>
      {'['}
      <ul className="json-object-viewer-list">
        {objectToView.map((currentValue) => {
          return handleRender({value:currentValue});
        })}
      </ul>
      {']'}
      </>
    } else if(typeof objectToView === "object" && !Array.isArray(objectToView)) {
      const objectToViewKeys = Object.keys(objectToView);

      return <>
      {objectKey && <span>"{objectKey}" : </span>}
      {'{'}
        <ul className="json-object-viewer-list">
          {objectToViewKeys.map((currentValue) => {
            return handleRender({value: objectToView[currentValue], key: currentValue});
          })}
        </ul>
      {'},'}
      </>
    }
  }

  

  return renderChildren(objectToView);
}