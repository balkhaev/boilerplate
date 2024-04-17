"use client"
import Link, { LinkProps } from "next/link"
import { redirect } from "next/navigation"
import { MouseEvent, PropsWithChildren } from "react"

type BackButtonProps = { className?: string } & PropsWithChildren & LinkProps

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL!

export default function BackLink(props: BackButtonProps) {
  function go(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (document.referrer.indexOf(FRONTEND_URL) === 0) {
      history.back()
    } else {
      redirect(FRONTEND_URL)
    }
  }

  return <Link {...props} onClick={go} className={props.className} />
}
