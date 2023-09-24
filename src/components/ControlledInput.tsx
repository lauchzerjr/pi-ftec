import { Text } from "native-base";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { CInput, CInputProps } from "./CInput/CInput";

type Props = CInputProps & {
  control: Control<any>;
  name: string;
  error?: FieldError;
  maskInput?: boolean;
  typeMask?: string;
};

export function ControlledInput({ control, name, error, maskInput, typeMask, ...rest }: Props) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <CInput 
            options={{ format: typeMask }} 
            onChangeText={onChange} 
            value={value} 
            mask={maskInput}
            isFilledValue={!!value}
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
