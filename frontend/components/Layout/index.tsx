import React from "react"
import { Box, CssBaseline } from "@mui/material"
import Header from "../Header"
import RoflCreationZone from "../RoflCreationZone"
import { createClient } from "@/utils/supabase/server"

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const client = createClient()

  const {
    data: { user },
  } = await client.auth.getUser()

  return (
    <Box sx={{ pb: 6 }}>
      <CssBaseline />
      <Header />
      {children}
      {user && <RoflCreationZone />}
    </Box>
  )
}
