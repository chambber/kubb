import type { RequestConfig, ResponseConfig, ResponseErrorConfig } from '../../../../tanstack-query-client'
import type { UpdateUserMutationRequest, UpdateUserMutationResponse, UpdateUserPathParams } from '../../../models/ts/userController/UpdateUser.ts'
import type { UseMutationOptions } from '@tanstack/react-query'
import { updateUser } from '../../axios/userService/updateUser.ts'
import { useMutation } from '@tanstack/react-query'

export const updateUserMutationKey = () => [{ url: '/user/{username}' }] as const

export type UpdateUserMutationKey = ReturnType<typeof updateUserMutationKey>

/**
 * @description This can only be done by the logged in user.
 * @summary Update user
 * {@link /user/:username}
 */
export function useUpdateUser(
  options: {
    mutation?: UseMutationOptions<
      ResponseConfig<UpdateUserMutationResponse>,
      ResponseErrorConfig<Error>,
      { username: UpdateUserPathParams['username']; data?: UpdateUserMutationRequest }
    >
    client?: Partial<RequestConfig<UpdateUserMutationRequest>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateUserMutationKey()

  return useMutation<
    ResponseConfig<UpdateUserMutationResponse>,
    ResponseErrorConfig<Error>,
    { username: UpdateUserPathParams['username']; data?: UpdateUserMutationRequest }
  >({
    mutationFn: async ({ username, data }) => {
      return updateUser({ username, data }, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}
