import React from "react"
import AppLink from "../Link"

type NavProps = {
  href: string
  name: string
}

export default function Nav({ href, name }: NavProps) {
  return <AppLink href={href}>{name}</AppLink>
}
