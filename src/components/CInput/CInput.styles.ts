import styled from "styled-components/native";
import { TextInputMask } from "react-native-masked-text";
import { css } from "styled-components";
import { FieldError } from "react-hook-form";
import { TextInput } from "react-native";

interface InputContainerProps {
  isFocused: boolean
  isError: FieldError
  isFilled?: boolean
}

export const InputContainer = styled.View<InputContainerProps>`
  ${({ isFilled, isFocused, isError }) => css`
    background-color: white;
    border-width: 2px;
    border-radius: 8px;
    border-color: ${isFocused || isFilled ? 'green' : isError ? 'red' : 'gray'};
    flex-direction: row;
    align-items: center;
    padding: 5px;
  `}
`;

export const InputNormal = styled(TextInput)`
  flex: 1;
  padding: 0 8px 0 8px;
  color: black;
`;

export const InputMask = styled(TextInputMask)`
  flex: 1;
  padding: 0 8px 0 8px;
  color: black;
`;

export const Label = styled.Text`
  width: 100%;
  font-size: 16px;
  margin-bottom: 4px;
  text-align: left;
`;

export const ErrorMessage = styled.Text`
  color: red;
  font-size: 12px;
`;
