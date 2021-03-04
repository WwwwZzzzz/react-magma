import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import {
  Radio as MagmaRadio,
  RadioProps,
  RadioGroup,
  RadioGroupProps as MagmaRadioGroupProps,
} from 'react-magma-dom';

type RadioGroupProps = MagmaRadioGroupProps & UseFieldApiConfig;

const RadioMapping = (props: RadioGroupProps) => {
  const {
    input,
    options,
    validateOnMount,
    showError,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi({ ...props, type: 'radio' });
  const name = input.name || uuidv4();

  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) ||
    rest.errorMessage;

  return (
    <RadioGroup
      onChange={input.onChange}
      errorMessage={errorMessage}
      name={name}
      {...rest}
    >
      {options.map((option: RadioProps) => {
        return <MagmaRadio {...option} value={option.value?.toString()} key={option.value?.toString()} />;
      })}
    </RadioGroup>
  );
};

export const Radio = React.memo(RadioMapping);
