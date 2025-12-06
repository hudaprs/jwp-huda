import { z, ZodSchema } from 'zod'

// MUTATION MODE (schema provided)
export function makeAction<S extends ZodSchema, Output>(
  schema: S,
  handler: (data: z.infer<S>) => Promise<Output>
): (raw: unknown) => Promise<Output>

// QUERY MODE (no schema)
export function makeAction<Output>(
  schema: null,
  handler: () => Promise<Output>
): () => Promise<Output>

export function makeAction(
  schema: ZodSchema | null,
  handler: ((data: unknown) => Promise<unknown>) | (() => Promise<unknown>)
) {
  // MUTATION HANDLER
  if (schema) {
    return async (raw: unknown): Promise<unknown> => {
      const parsed = schema.safeParse(raw)

      if (!parsed.success) {
        const flat = parsed.error.flatten()

        const fieldError = Object.values(flat.fieldErrors)
          .flat()
          .find(msg => typeof msg === 'string')

        const formError = flat.formErrors[0]

        throw new Error(fieldError ?? formError ?? 'Invalid input.')
      }

      try {
        // handler is the mutation handler here, guaranteed by overload
        return await (handler as (data: unknown) => Promise<unknown>)(
          parsed.data
        )
      } catch {
        throw new Error('Something went wrong.')
      }
    }
  }

  // QUERY HANDLER
  return async (): Promise<unknown> => {
    try {
      // guaranteed by overload: handler has zero args
      return await (handler as () => Promise<unknown>)()
    } catch {
      throw new Error('Something went wrong.')
    }
  }
}
