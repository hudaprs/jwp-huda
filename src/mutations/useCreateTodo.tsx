'use client'

import { storeTodo } from '@/actions/todo.action'
import { StoreTodoForm } from '@/schemas/todo.schema'
import { useCallback, useState } from 'react'

type UseCreateTodoProps = {
  onCompleted?: () => void
}

export const useCreateTodo = (props?: UseCreateTodoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const store = useCallback(
    async (form: StoreTodoForm) => {
      setError(null)

      try {
        setIsLoading(true)

        await storeTodo({
          title: form.title
        })

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
    store
  }
}
