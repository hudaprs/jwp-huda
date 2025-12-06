'use client'

import { updateTodo } from '@/actions/todo.action'
import { UpdateTodoForm } from '@/schemas/todo.schema'
import { useCallback, useState } from 'react'

type UseUpdateTodoProps = {
  onCompleted?: () => void
}

export const useUpdateTodo = (props?: UseUpdateTodoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = useCallback(
    async (form: UpdateTodoForm) => {
      setError(null)

      try {
        setIsLoading(true)

        await updateTodo(form)

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
    update
  }
}
