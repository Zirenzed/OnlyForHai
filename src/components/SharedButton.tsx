import type { ComponentProps } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface Props extends ComponentProps<'button'> {
  variant?: Variant
}

/** Tangerine primary, cream secondary, or a quiet text-style ghost button. */
export function SharedButton({ variant = 'primary', className = '', type = 'button', ...rest }: Props) {
  return <button type={type} className={`btn btn--${variant} ${className}`.trim()} {...rest} />
}
