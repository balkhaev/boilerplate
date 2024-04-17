import { createClient } from "@/utils/supabase/server"
import React from "react"
import ProfileButton from "./ProfileButton"
import AnonButton from "./AnonButton"

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return <ProfileButton user={user} />
  }

  return <AnonButton />
}
