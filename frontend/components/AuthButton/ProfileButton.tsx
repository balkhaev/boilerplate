"use client"
import { Dropdown } from "@mui/base/Dropdown"
import React, { useState } from "react"
import { User } from "@supabase/supabase-js"
import { Menu, Button, MenuItem } from "@mui/material"
import { createClient } from "@/utils/supabase/client"

type ProfileButtonProps = {
  user: User
}

export default function ProfileButton({ user }: ProfileButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const onLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <Dropdown open={open}>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        style={{ textTransform: "none" }}
      >
        {user.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          role: "listbox",
        }}
      >
        <MenuItem selected={false}>Профиль</MenuItem>
        <MenuItem selected={false}>Настройки</MenuItem>
        <MenuItem selected={false} onClick={onLogout}>
          Выйти
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
