import * as React from 'react';
// import styled from '@emotion/styled';
// import { Button, EnumButtonColor, EnumButtonVariant } from '../Button';

export const TARGET_ID = 'reactMagmaMainContent';

// export interface SkipLinkProps {
//   buttonText?: string;
//   className?: string;
//   color?: EnumButtonColor;
//   inverse?: boolean;
//   positionLeft?: number;
//   positionTop?: number;
//   variant?: EnumButtonVariant;
// }

// const handleClick = e => {
//   e.preventDefault();

//   const targetAnchor = document.getElementById(TARGET_ID);

//   if (!targetAnchor) {
//     return;
//   }

//   const targetHeading = targetAnchor.getElementsByTagName('h1')[0];

//   if (targetHeading) {
//     targetHeading.setAttribute('tabIndex', '-1');
//     targetHeading.focus();
//     return;
//   }
//   targetAnchor.focus();
// };

// const StyledSkipButton = styled(Button)<{
//   positionLeft: number;
//   positionTop: number;
// }>`
//     left: -9999px;
//     position: fixed;
//     top: -9999px;

//     &:focus {
//       left: ${props => props.positionLeft}px;
//       top: ${props => props.positionTop}px;
//       z-index: 3;
//     }
//   }
// `;

// export const SkipLink: React.FunctionComponent<SkipLinkProps> = ({
//   buttonText,
//   className,
//   color,
//   inverse,
//   positionLeft,
//   positionTop,
//   variant
// }: SkipLinkProps) => {
//   return (
//     <StyledSkipButton
//       as="a"
//       className={className}
//       color={color ? color : EnumButtonColor.primary}
//       href={`#${TARGET_ID}`}
//       inverse={inverse}
//       onClick={e => {
//         handleClick(e);
//       }}
//       positionLeft={positionLeft ? positionLeft : 10}
//       positionTop={positionTop ? positionTop : 10}
//       variant={variant ? variant : EnumButtonVariant.solid}
//     >
//       {buttonText ? buttonText : 'Skip Navigation'}
//     </StyledSkipButton>
//   );
// };

export const SkipLink: React.FunctionComponent<{}> = () => (
  <div>Bad Skip Link</div>
);
