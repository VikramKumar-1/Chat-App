import { api } from "../lib/api"
import type { User } from "../types/chat.types"

export const userService = {
  async search(query: string): Promise<User[]> {
    const { data } = await api.get<User[]>(
      `/users/search?q=${query}`
    )

    return data
  },
}