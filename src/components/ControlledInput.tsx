import { Text } from "native-base";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { CInput, CInputProps } from "./CInput/CInput";

type Props = CInputProps & {
  control: Control<any>;
  name: string;
  error?: FieldError;
};

export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CInput
            onChangeText={onChange} 
            value={value} 
            isFilledValue={!!value}
            isError={error}
            {...rest} 
          />
        )}
      />

      {error && (
        <Text color="red.500" backgroundColor="black">
          {error?.message}
        </Text>
      )}
    </>
  );
}
