"use client"
import { useState } from "react"
import { Floatzone } from "../Floatzone"
import RoflCreation from "./RoflCreation"
import { useLocalStorage } from "usehooks-ts"

export default function MemeCreationZone() {
  const [visible, setVisible] = useState(false)
  const [opened, setOpened] = useLocalStorage("floatzone-opened", true, {
    initializeWithValue: false, // for ssr
  })

  const hide = () => visible && setVisible(false)
  const show = () => !visible && setVisible(true)
  const close = () => opened && setOpened(false)
  const open = () => !opened && setOpened(true)

  const onRoflFileDragOver = () => {
    open()
    show()
  }
  const onFloatzoneDragOver = () => {
    open()
    show()
  }

  const onRoflFileAdded = () => {
    show()
  }
  const onUploadCancel = () => {
    hide()
  }
  const onRoflSubmit = () => {
    hide()
    close()
  }

  const onFloatzoneToggle = () => {
    setOpened((val) => !val)
  }

  return (
    <Floatzone
      opened={opened}
      visible={visible}
      title="Загрузить рофлс"
      onToggle={onFloatzoneToggle}
      onDragOver={onFloatzoneDragOver}
    >
      <RoflCreation
        onFileAdded={onRoflFileAdded}
        onUploadCancel={onUploadCancel}
        onFileDragOver={onRoflFileDragOver}
        onRoflSubmit={onRoflSubmit}
        onFocus={show}
        onBlur={hide}
      />
    </Floatzone>
  )
}
