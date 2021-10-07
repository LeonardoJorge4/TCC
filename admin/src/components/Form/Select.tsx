import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import { FormControl, FormErrorMessage, FormLabel, Select as ChakraSelect, SelectProps as ChakraSelectProps } from "@chakra-ui/react";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction <HTMLSelectElement, SelectProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>

      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraSelect 
        name={name} 
        id={name}
        focusBorderColor="pink.500" 
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900'
        }}
        size="lg"
        {...rest}
      >
        <option style={{ color: '#000' }} value="master">master</option>
        <option style={{ color: '#000' }} value="admin">admin</option>
      </ChakraSelect>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}

    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)