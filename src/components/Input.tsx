import {
  Input as InputNativeBase,
  IInputProps,
  FormControl,
} from "native-base";

export type InputProps = IInputProps & {
  errorMessage?: string | null;
  flexSize?: number | null;
  mbSize?: number | null;
  inputLabel?: string;
};

export function Input({
  errorMessage,
  isInvalid,
  flexSize,
  mbSize,
  inputLabel,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl mb={mbSize} flex={flexSize} isInvalid={invalid}>
      <FormControl.Label>{inputLabel}</FormControl.Label>
      <InputNativeBase
        rounded={10}
        backgroundColor="white"
        borderWidth={2}
        fontSize="md"
        isInvalid={invalid}
        _focus={{
          borderWidth: 2,
          borderColor: "green.400",
        }}
        _invalid={{
          borderWidth: 2,
          borderColor: "red.500",
        }}
        {...rest}
      />

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
