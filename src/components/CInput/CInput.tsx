import React from 'react';
import * as S from './CInput.styles'
import { TextInputMaskProps } from "react-native-masked-text";
import { TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';

interface CommonInputProps {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isFilledValue?: boolean;
  inputLabel?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isError?: FieldError;
  mask?: boolean;
}

export type CInputProps = (TextInputProps & CommonInputProps) | (TextInputMaskProps & CommonInputProps);

export function CInput({
  errorMessage,
  isInvalid,
  inputLabel,
  leftIcon,
  rightIcon,
  isError,
  mask,
  isFilledValue,
  ...rest
}: CInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(isFilledValue);
  };

  return (
    <>
      {inputLabel && <S.Label>{inputLabel}</S.Label>}
      <S.InputContainer isFocused={isFocused} isFilled={isFilled} isError={isError}>
        {leftIcon && leftIcon}

        {
          mask ? (
            <S.InputMask
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor={'gray'}
              cursorColor={"black"}
              {...rest}
            />
          )
          : (
            <S.InputNormal
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor={'gray'}
              cursorColor={"black"}
              {...rest}
            />
          )
        }
        
        {rightIcon && rightIcon}
      </S.InputContainer>
    </>
  );
}
