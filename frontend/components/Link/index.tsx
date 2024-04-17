"use client"
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

type AppLinkProps = LinkProps & MuiLinkProps

export default function AppLink({ href, children }: AppLinkProps) {
  const pathname = usePathname()
  const [isHover, setIsHover] = useState(false)

  const isActive = pathname === href

  return (
    <MuiLink
      component={Link}
      href={href}
      underline="none"
      color={isActive || isHover ? "white" : "#999999"}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </MuiLink>
  )
}
