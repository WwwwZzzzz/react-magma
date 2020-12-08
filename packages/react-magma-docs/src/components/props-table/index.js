import React from 'react';
import './styles.css';
import { AsteriskIcon, NotificationIcon } from 'react-magma-icons';
import { magma, Tooltip, IconButton } from 'react-magma-dom';

export const SimplePropsTable = ({ propertyValues }) => {
  if (propertyValues === undefined) {
    return null;
  }

  const hasDescription = Object.keys(propertyValues).some(name => {
    return Boolean(propertyValues[name].description);
  });

  return (
    <div>
      <div className="legend">
        <AsteriskIcon size="12" color={magma.colors.primary} /> = required prop
      </div>
      <table className="props-table" cellSpacing="0" cellPadding="0">
        <thead
          style={{
            textAlign: 'left',
          }}
        >
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            {hasDescription && <th scope="col">Description</th>}
          </tr>
        </thead>
        <tbody>
          {propertyValues &&
            Object.keys(propertyValues).map(name => {
              const prop = propertyValues[name];

              if (!prop.type.name) {
                return null;
              }

              return (
                <tr key={name}>
                  <td>
                    <span className="prop-name">
                      {name}
                      {prop.required && (
                        <span aria-label="Required" className="required">
                          <AsteriskIcon
                            size="12"
                            color={magma.colors.primary}
                          />
                        </span>
                      )}
                      {prop.deprecated && (
                        <Tooltip content="Deprecated">
                          <IconButton
                            aria-label="deprecated"
                            icon={
                              <NotificationIcon
                                size="16"
                                color={magma.colors.danger}
                              />
                            }
                            variant="link"
                          />
                        </Tooltip>
                      )}
                    </span>
                  </td>
                  <td>
                    {prop.type.name === 'enum'
                      ? 'enum, one of:'
                      : prop.type.name}
                    <br />
                    {prop.type.options &&
                      Object.keys(prop.type.options).map(i => {
                        return (
                          <div key={i}>
                            <code>{prop.type.options[i]}</code>
                            <br />
                          </div>
                        );
                      })}
                  </td>
                  {!prop.defaultValue ? (
                    <td>
                      <em>-</em>
                    </td>
                  ) : (
                    <td>
                      {prop.defaultValue === "''" ? (
                        <em>[Empty String]</em>
                      ) : (
                        prop.defaultValue.replace(/'/g, '')
                      )}
                    </td>
                  )}
                  {hasDescription && (
                    <td>{prop.description && prop.description}</td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
