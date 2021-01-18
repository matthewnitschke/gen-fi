import React from 'react';

import 'styles/util/button';

export enum ButtonSkin {
  add,
  close,
  link,
  default
}

interface ButtonProps {
  skin: ButtonSkin
  value: string
}

export default function Button(props: ButtonProps & React.HTMLProps<HTMLDivElement>) {
  const {skin, value, ...divProps} = props;

  let buttonContent = value;
  if (props.skin == ButtonSkin.add) {
    buttonContent = '＋';
  } else if (props.skin == ButtonSkin.close) {
    buttonContent = '✕';
  }

  return <div
    {...divProps}
    className={`button skin-${ButtonSkin[props.skin]} ${props.className ?? ''}`}
  >{buttonContent}</div>;
}

Button.defaultProps = {
  skin: ButtonSkin.default,
  value: '',
} as Partial<ButtonProps>
