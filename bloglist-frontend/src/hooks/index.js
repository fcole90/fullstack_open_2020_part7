import { useState } from 'react'

export const useField = (type, reset=false) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const obj = {
    type,
    value,
    onChange
  }

  if (reset) {
    return [obj, () => setValue('')]
  }

  return obj
}