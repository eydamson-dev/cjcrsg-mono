import { getPayload } from "payload"
import type { Payload } from "payload"
import config from '@payload-config'

export default async (): Promise<Payload> => {
  return await getPayload({ config })
}
