import * as React from 'react';
import styled from '@emotion/styled';
import { magma } from '../../theme/magma';
import { FocusStyles } from '../UtilityStyles';

interface LinkButtonProps {
  autoFocus?: boolean;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
  onClick?: () => void;
  disabled?: boolean;
  inverse?: boolean;
  style?: React.CSSProperties;
}

const LinkButtonComponent = styled.button<LinkButtonProps>`
  background: none;
  border: 0;
  color: ${props =>
    props.inverse ? magma.colors.neutral08 : magma.colors.primary};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline;
  padding: 0;
  opacity: ${props => (props.disabled ? '.8' : '1')};
  text-decoration: underline;

  &:not([disabled]) {
    &:hover,
    &:focus {
      color: ${props =>
        props.inverse ? magma.colors.neutral07 : magma.colors.foundation01};
      text-decoration: none;
    }

    &:focus {
      ${FocusStyles}
      outline-offset: 3px;
    }
  }
`;

export const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  autoFocus,
  className,
  children,
  disabled,
  onClick,
  inverse,
  style
}: LinkButtonProps) => (
  <LinkButtonComponent
    className={className}
    autoFocus={autoFocus}
    onClick={onClick}
    disabled={disabled}
    inverse={inverse}
    style={style}
  >
    {children}
  </LinkButtonComponent>
);