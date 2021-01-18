import { default as basicComponentTypes } from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

import { TextField } from '../TextField';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import { DatePicker } from '../DatePicker';
import { TimePicker } from '../TimePicker';
import { Toggle } from '../Toggle';
import { Textarea } from '../Textarea';
import { FormGroup } from '../FormGroup';
import { Review } from '../Review';
import { Password } from '../Password';
import { Combobox } from '../Combobox';
import { Select } from '../Select';
// import { Wizard } from '../Wizard';
// import { FieldArray } from '../FieldArray';

export const componentTypes = {
  ...basicComponentTypes,
  SWITCH: 'TOGGLE',
  TOGGLE: 'TOGGLE',
  REVIEW: 'REVIEW',
  FORM_GROUP: 'FORM_GROUP',
  PASSWORD: 'PASSWORD',
  COMBOBOX: 'COMBOBOX',
};

export const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.FORM_GROUP]: FormGroup,
  [componentTypes.RADIO]: Radio,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.TOGGLE]: Toggle,
  [componentTypes.TEXTAREA]: Textarea,
  [componentTypes.COMBOBOX]: Combobox,
  [componentTypes.SELECT]: Select,
  // [componentTypes.WIZARD]: Wizard,
  // [componentTypes.FIELD_ARRAY]: FieldArray,
  [componentTypes.REVIEW]: Review,
  [componentTypes.PASSWORD]: Password,
};
