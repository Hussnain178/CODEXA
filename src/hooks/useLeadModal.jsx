import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const LeadModalContext = createContext(null)

export function LeadModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [courseName, setCourseName] = useState(null)

  const openLeadModal = useCallback((course = null) => {
    setCourseName(course ? (typeof course === 'string' ? course : course.title) : null)
    setIsOpen(true)
  }, [])

  const closeLeadModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      courseName,
      openLeadModal,
      closeLeadModal,
    }),
    [isOpen, courseName, openLeadModal, closeLeadModal],
  )

  return (
    <LeadModalContext.Provider value={value}>
      {children}
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext)
  if (!ctx) {
    throw new Error('useLeadModal must be used within LeadModalProvider')
  }
  return ctx
}
