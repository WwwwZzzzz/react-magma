import * as React from 'react';
import { IconProps } from '../iconProps';
import { renderIcon } from '../SvgIcon';

const iconType = {
  viewBox: '0 0 22 22',
  paths: [
    {
      d:
        'M6,22a2.9,2.9,0,0,1-.88,2.12A2.86,2.86,0,0,1,3,25a2.87,2.87,0,0,1-2.13-.88,3,3,0,0,1,0-4.24A2.87,2.87,0,0,1,3,19a2.86,2.86,0,0,1,2.12.88A2.9,2.9,0,0,1,6,22Zm8,1.92a1,1,0,0,1-.27.75A.92.92,0,0,1,13,25H10.89a1,1,0,0,1-1-.91A9.72,9.72,0,0,0,7,18,9.68,9.68,0,0,0,.9,15.09a1,1,0,0,1-.9-1V12a.93.93,0,0,1,.32-.73A.93.93,0,0,1,1,11h.07a14,14,0,0,1,4.79,1.26,13.9,13.9,0,0,1,4,2.83,14,14,0,0,1,2.84,4.05A14.22,14.22,0,0,1,14,23.92Zm8,0a1,1,0,0,1-.28.74A.92.92,0,0,1,21,25H18.76a1,1,0,0,1-.69-.27.94.94,0,0,1-.31-.67,17.32,17.32,0,0,0-1.58-6.38,17.77,17.77,0,0,0-3.61-5.25A18.26,18.26,0,0,0,7.32,8.81,17.79,17.79,0,0,0,.93,7.22a.9.9,0,0,1-.66-.31A1,1,0,0,1,0,6.23V4a.92.92,0,0,1,.31-.72A.94.94,0,0,1,1,3h.05A21.86,21.86,0,0,1,8.88,4.87a22,22,0,0,1,6.65,4.6,21.75,21.75,0,0,1,4.59,6.65A21.61,21.61,0,0,1,22,24Z',
      transform: 'translate(0 -3)',
    },
  ],
};

export const Feed5Icon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);