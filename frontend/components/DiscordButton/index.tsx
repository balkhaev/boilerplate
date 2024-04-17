"use client"
import { Button, ButtonProps } from "@mui/material"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

type DiscordButtonProps = ButtonProps

export default function DiscordButton(props: DiscordButtonProps) {
  const signInDiscord = async () => {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })

    if (error) {
      return redirect("/login?message=" + error?.message)
    }

    return redirect("/")
  }

  return (
    <Button
      {...props}
      onClick={signInDiscord}
      variant="outlined"
      style={{ color: "#7289da" }}
    >
      Discord
    </Button>
  )
}
