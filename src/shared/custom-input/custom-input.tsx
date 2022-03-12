import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder?: string;
  textarea?: boolean;
};

const CustomInput = ({ label, textarea, size: _, ...props }: CustomInputProps) => {
  const [field, { error }] = useField(props);

  const ComponentType = !textarea ? Input : (Textarea as any);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <ComponentType
        {...field}
        {...props}
        id={field.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default CustomInput;
