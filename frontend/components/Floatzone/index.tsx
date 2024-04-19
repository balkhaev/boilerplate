"use client"
import React from "react"
import cn from "classnames"
import { useLocalStorage } from "usehooks-ts"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

import styles from "./styles.module.css"
import { Box, IconButton, Typography } from "@mui/material"

type FloatzoneProps = {
  children: React.ReactNode
  title?: React.ReactNode
  visible?: boolean
  opened?: boolean
  onToggle?: () => void
  onDragOver?: () => void
}

export function Floatzone({
  children,
  title,
  visible,
  opened,
  onToggle,
  onDragOver,
}: FloatzoneProps) {
  return (
    <div
      className={cn(styles.root, visible && styles.visible)}
      onDragOver={onDragOver}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={onToggle}
        style={{ cursor: "pointer" }}
      >
        {title && <Typography variant="body1">{title}</Typography>}
        <Box gap={1} display="flex" alignItems="center">
          <Typography variant="caption">
            {opened ? "Скрыть" : "Показать"}
          </Typography>
          <IconButton className={styles.icon} color="primary">
            {opened ? <KeyboardArrowDownIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>
      </Box>
      <div
        className={styles.wrapper}
        style={{ maxHeight: opened ? "550px" : "0px" }}
      >
        {children}
      </div>
    </div>
  )
}
