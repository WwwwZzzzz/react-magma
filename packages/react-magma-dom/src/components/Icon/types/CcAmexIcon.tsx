import * as React from 'react';
import { IconProps, renderIcon } from '../utils';

const iconType = {
  viewBox: '0 0 36 24',
  paths: [
    {
      d:
        'M1.86,10.66H3.25L2.55,9Zm9.7,8.22,1.16-1.24-1.1-1.23H9.08v.76H11.3V18H9.08v.85ZM14,17.66l1.55,1.72V16Zm4.5-.74c0-.34-.21-.51-.62-.51H16.59v1.07h1.3C18.32,17.48,18.53,17.3,18.53,16.92Zm4.52-.06q0-.45-.66-.45H21.11v.95h1.27c.44,0,.67-.17.67-.5ZM18.7,9.58c0-.3-.22-.46-.65-.46H16.77v.94H18c.45,0,.67-.16.67-.48Zm7.18,1.08h1.39L26.58,9Zm-15-2.43v4.24h-1V9.16L8.42,12.47H7.53L6.06,9.16v3.31H4l-.39-.94H1.5l-.39.94H0L1.83,8.23h1.5l1.72,4v-4H6.7L8,11.11l1.2-2.88Zm8.69,8.69a1.55,1.55,0,0,1-.09.55,1,1,0,0,1-.22.39,1,1,0,0,1-.35.26,2,2,0,0,1-.4.15,2.06,2.06,0,0,1-.5.07l-.49,0h-1v1.43h-2l-1.25-1.41-1.29,1.41h-4V15.53h4.06l1.25,1.39,1.28-1.39H17.9c1.14,0,1.71.47,1.71,1.39Zm-4.55-5.33v.88H11.67V8.23h3.39v.9H12.69v.76H15v.86H12.69v.84ZM36,20.33v3.58a2,2,0,0,1-.6,1.47,2,2,0,0,1-1.46.62H2.06A2,2,0,0,1,.6,25.38,2,2,0,0,1,0,23.91V13.31H1.73l.39-1H3l.39,1H6.78v-.72l.3.72H8.84l.32-.73v.73h8.45V11.76h.16c.1,0,.15.07.15.22v1.34h4.36V13a2.9,2.9,0,0,0,.86.28,5.18,5.18,0,0,0,.82.11h1l.81,0,.39-1H27l.4,1H31v-.9l.53.9h2.85V7.41H31.52v.68l-.4-.68H28.23v.68l-.36-.68H24a3.54,3.54,0,0,0-1.7.34V7.41H19.59v.34a1.64,1.64,0,0,0-1.14-.34H8.64L8,8.92,7.3,7.41H4.2v.68l-.34-.68H1.22L0,10.2V4.09A2,2,0,0,1,.6,2.62,1.94,1.94,0,0,1,2.06,2H33.94a2,2,0,0,1,1.46.62A2,2,0,0,1,36,4.09v10.6H34.12a2.07,2.07,0,0,0-1.26.34v-.34H30.09a1.75,1.75,0,0,0-1.22.34v-.34H23.94V15a2.34,2.34,0,0,0-1.36-.34H19.31V15a2.11,2.11,0,0,0-1.42-.34H14.23l-.84.9-.78-.9H7.15v5.9h5.36l.86-.92.81.92h3.3V19.2h.33a3.76,3.76,0,0,0,1.41-.2v1.59h2.71V19.05h.13a.3.3,0,0,1,.16,0,.24.24,0,0,1,0,.15v1.36h8.26a2.22,2.22,0,0,0,1.38-.37v.37h2.62A3.59,3.59,0,0,0,36,20.33ZM24.16,16.67a1.3,1.3,0,0,1-.19.67,1.13,1.13,0,0,1-.53.46.91.91,0,0,1,.53.4,1.62,1.62,0,0,1,.14.72v.85h-1v-.71a.94.94,0,0,0-.18-.68,1.16,1.16,0,0,0-.72-.16H21.11v1.55h-1V15.53H22.5a2.56,2.56,0,0,1,1.2.24A.91.91,0,0,1,24.16,16.67ZM19.83,9.38a1.28,1.28,0,0,1-.2.68,1.16,1.16,0,0,1-.52.46.89.89,0,0,1,.54.39,1.65,1.65,0,0,1,.13.73v.83h-1v-.41a2.56,2.56,0,0,0,0-.4,1.86,1.86,0,0,0,0-.28.4.4,0,0,0-.14-.25.68.68,0,0,0-.27-.14,1.89,1.89,0,0,0-.46-.05H16.77v1.53h-1V8.23l2.39,0a2.79,2.79,0,0,1,1.22.23.91.91,0,0,1,.45.9Zm8.26,9.51v.88H24.72V15.53h3.37v.88H25.74v.76h2.31V18H25.74v.85ZM21.44,8.23v4.24h-1V8.23ZM32.27,18.42c0,.9-.54,1.35-1.6,1.35h-2v-.91h2c.36,0,.53-.13.53-.39a.32.32,0,0,0-.26-.33,2.46,2.46,0,0,0-.65-.08,6.64,6.64,0,0,1-.77,0,1.13,1.13,0,0,1-.66-.35,1.25,1.25,0,0,1-.27-.86,1.14,1.14,0,0,1,.41-.94,1.57,1.57,0,0,1,1-.33h2v.89H30.2c-.37,0-.56.13-.56.39a.31.31,0,0,0,.27.32,2.57,2.57,0,0,0,.66.07,4,4,0,0,1,.77,0,1,1,0,0,1,.65.33,1.2,1.2,0,0,1,.27.85ZM36,17.64v1.58a1.57,1.57,0,0,1-1.38.55H32.67v-.91h1.95c.35,0,.52-.13.52-.39a.3.3,0,0,0-.19-.3,1.05,1.05,0,0,0-.49-.08,4.59,4.59,0,0,1-.62,0,2.94,2.94,0,0,1-.63-.12.88.88,0,0,1-.48-.38,1.3,1.3,0,0,1-.2-.75,1.12,1.12,0,0,1,.42-.94,1.6,1.6,0,0,1,1-.33h2v.89H34.16c-.38,0-.56.13-.56.39s.15.33.45.35l1.07.07a1.17,1.17,0,0,1,.88.41ZM33.42,8.25v4.22H32L30.08,9.3v3.17H28l-.41-.94H25.52l-.4.94H24c-1.34,0-2-.69-2-2.08S22.63,8.23,24,8.23h1v.93l-.44,0h-.44l-.36,0a.61.61,0,0,0-.34.11l-.23.21a.65.65,0,0,0-.18.36,2.68,2.68,0,0,0,0,.52,1.63,1.63,0,0,0,.21.91.89.89,0,0,0,.77.31h.45l1.44-3.33h1.52l1.7,4v-4h1.55l1.78,2.94V8.25Z',
      transform: 'translate(0 -2)'
    }
  ]
};

export const CcAmexIcon: React.FunctionComponent<IconProps> = (
  props: IconProps
) => renderIcon(props, iconType);