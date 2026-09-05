import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0950F6] text-white hover:bg-[#073ec2] shadow-md hover:shadow-lg",
        cta:
          "bg-[#FFF12E] text-[#052C87] hover:bg-[#FFF44A] shadow-[0_0_20px_rgba(255,241,46,0.35)] hover:shadow-[0_0_25px_rgba(255,241,46,0.50)] font-extrabold",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-border/80 bg-transparent hover:bg-muted/30 hover:text-foreground text-foreground",
        secondary:
          "bg-[#052C87] text-white hover:bg-[#073ab2] border border-white/10 shadow-sm",
        ghost: "hover:bg-muted/40 hover:text-foreground text-muted-foreground",
        link: "text-[#FFF12E] underline-offset-4 hover:underline lowercase tracking-normal font-normal",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
