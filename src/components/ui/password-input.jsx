'use client'

import { IconButton, Input } from '@chakra-ui/react'
import { InputGroup } from './input-group'
import * as React from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'

// Simple password input with a show/hide toggle, styled to match the app.
export const PasswordInput = React.forwardRef(function PasswordInput(props, ref) {
  const [visible, setVisible] = React.useState(false)
  const { ...rest } = props
  return (
    <InputGroup
      endElement={
        <IconButton
          aria-label={visible ? 'Hide password' : 'Show password'}
          variant="ghost"
          size="xs"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
        >
          {visible ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      }
    >
      <Input ref={ref} type={visible ? 'text' : 'password'} {...rest} />
    </InputGroup>
  )
})
