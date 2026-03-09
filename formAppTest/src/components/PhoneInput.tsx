import { Input } from 'antd'
import { type ChangeEvent } from 'react'

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''

  const normalizedDigits = digits.startsWith('0') ? digits.slice(0, 10) : `0${digits}`.slice(0, 10)

  if (normalizedDigits.length <= 4) return normalizedDigits
  if (normalizedDigits.length <= 7)
    return `${normalizedDigits.slice(0, 4)} ${normalizedDigits.slice(4)}`
  return `${normalizedDigits.slice(0, 4)} ${normalizedDigits.slice(4, 7)} ${normalizedDigits.slice(7)}`
}

export function PhoneInput({
  value = '',
  onChange,
  placeholder = '0XXX XXX XXX',
}: PhoneInputProps) {
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(formatPhone(event.target.value))
  }

  return <Input value={value} onChange={handlePhoneChange} placeholder={placeholder} maxLength={12} />
}
