'use client'

import { useCreateTodo } from '@/mutations/useCreateTodo'
import { StoreTodoForm } from '@/schemas/todo.schema'
import { memo, useCallback } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

export const Form = memo(() => {
  const formMethods = useForm<StoreTodoForm>({
    defaultValues: {
      title: ''
    }
  })
  const { isLoading, store, error } = useCreateTodo({
    onCompleted: () => {
      formMethods.reset({ title: '' })
    }
  })

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        store({ title: formMethods.getValues('title') })
      }
    },
    [formMethods]
  )

  return (
    <FormProvider {...formMethods}>
      <Controller
        name='title'
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              type='text'
              placeholder='What needs to be done'
              className='w-full text-[24px] font-normal h-[75px] bg-[#3b3b3b] px-5 rounded'
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />

            {error?.message && (
              <em className='text-red-400'>{error.message}</em>
            )}
          </>
        )}
      />

      {isLoading && <em>Inserting...</em>}
      {error && <em className='text-red-400'>{error}</em>}
    </FormProvider>
  )
})

Form.displayName = 'Form'
