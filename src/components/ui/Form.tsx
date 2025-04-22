import React from 'react'
import { twMerge } from 'tailwind-merge'

const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(({ className, ...props }, ref) => (
    <form ref={ref} className={twMerge('space-y-4 bg-stone-100', className)} {...props} />
))
Form.displayName = 'Form'

export { Form }
