import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <svg
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      viewBox="0 0 193 34"
      fill="currentColor"
      aria-label="WrocDevs Logo"
    >
      <text x="0" y="26" fontSize="28" fontWeight="bold">
        WrocDevs
      </text>
    </svg>
  )
}
