import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 24.01 24.01',
  paths: [
    {
      d:
        'M14,21.5v-3a.52.52,0,0,0-.14-.36A.49.49,0,0,0,13.5,18h-3a.49.49,0,0,0-.36.14.52.52,0,0,0-.14.36v3a.48.48,0,0,0,.5.5h3a.45.45,0,0,0,.36-.14A.49.49,0,0,0,14,21.5ZM18,11a4.24,4.24,0,0,0-.86-2.55A5.85,5.85,0,0,0,15,6.64,5.92,5.92,0,0,0,12.31,6a6.39,6.39,0,0,0-5.8,3.33.45.45,0,0,0,.13.65L8.7,11.55a.45.45,0,0,0,.3.09.44.44,0,0,0,.39-.19A7.84,7.84,0,0,1,10.73,10a2.31,2.31,0,0,1,1.35-.37,2.27,2.27,0,0,1,1.33.4A1.15,1.15,0,0,1,14,11a1.39,1.39,0,0,1-.31.95,3.23,3.23,0,0,1-1.07.7A5.39,5.39,0,0,0,10.82,14a2.89,2.89,0,0,0-.82,2v.56a.51.51,0,0,0,.14.36.49.49,0,0,0,.36.14h3a.51.51,0,0,0,.36-.14A.52.52,0,0,0,14,16.5a1.41,1.41,0,0,1,.34-.77,2.55,2.55,0,0,1,.85-.78c.33-.19.59-.33.76-.44a7,7,0,0,0,.72-.55,4,4,0,0,0,.7-.75,4.23,4.23,0,0,0,.44-1A3.87,3.87,0,0,0,18,11Zm6,3a11.63,11.63,0,0,1-1.61,6A11.94,11.94,0,0,1,18,24.39,11.69,11.69,0,0,1,12,26a11.63,11.63,0,0,1-6-1.61A11.9,11.9,0,0,1,1.61,20,11.63,11.63,0,0,1,0,14,11.69,11.69,0,0,1,1.61,8,11.94,11.94,0,0,1,6,3.61,11.63,11.63,0,0,1,12,2a11.69,11.69,0,0,1,6,1.61A12,12,0,0,1,22.39,8,11.69,11.69,0,0,1,24,14Z',
      transform: 'translate(0 -2)'
    }
  ]
};

export const QuestionCircleIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);