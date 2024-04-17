"use client"
import { Button } from "@mui/material"
import Link from "next/link"
import AuthDialog from "./AuthDialog"
import { MouseEvent, useState } from "react"

export default function AnonButton() {
  const [open, setOpen] = useState(false)

  const onButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setOpen(true)
  }

  return (
    <>
      <Button
        size="small"
        href="/login"
        LinkComponent={Link}
        onClick={onButtonClick}
      >
        Войти
      </Button>
      <AuthDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
