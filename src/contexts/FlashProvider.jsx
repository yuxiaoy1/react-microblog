import { useState, createContext, useContext } from 'react'

let timer

export const FlashContext = createContext()

export default function FlashProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState({})
  const [visible, setVisible] = useState(false)
  const flash = (message, type, duration = 5) => {
    setFlashMessage({ message, type })
    setVisible(true)

    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    if (duration) {
      timer = setTimeout(hideFlash, duration * 1000)
    }
  }
  const hideFlash = () => {
    setVisible(false)
  }

  return (
    <FlashContext.Provider value={{ flash, flashMessage, visible, hideFlash }}>
      {children}
    </FlashContext.Provider>
  )
}

export function useFlash() {
  return useContext(FlashContext).flash
}
