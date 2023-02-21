import zod from 'zod'

export const deleteUserParamsSchema = zod.object({ username: zod.string().optional() })
export const deleteUserRequestSchema = zod.any()
export const deleteUserResponseSchema = zod.any()
