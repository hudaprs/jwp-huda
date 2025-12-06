'use client'

import { removeTodo } from '@/actions/todo.action'
import { RemoveTodoForm } from '@/schemas/todo.schema'
import { useCallback, useState } from 'react'

type UseRemoveTodoProps = {
  onCompleted?: () => void
}

export const useRemoveTodo = (props?: UseRemoveTodoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = useCallback(
    async (form: RemoveTodoForm) => {
      setError(null)

      try {
        setIsLoading(true)

        await removeTodo(form)

        props?.onCompleted?.()
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [props]
  )

  return {
    isLoading,
    error,
    remove
  }
}
