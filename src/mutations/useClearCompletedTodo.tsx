'use client'

import { clearCompletedTodo } from '@/actions/todo.action'
import { useCallback, useState } from 'react'

type UseClearCompletedTodoProps = {
  onCompleted?: () => void
}

export const useClearCompletedTodo = (props?: UseClearCompletedTodoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearCompleted = useCallback(async () => {
    setError(null)

    try {
      setIsLoading(true)

      await clearCompletedTodo()

      props?.onCompleted?.()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, [props])

  return {
    isLoading,
    error,
    clearCompleted
  }
}
