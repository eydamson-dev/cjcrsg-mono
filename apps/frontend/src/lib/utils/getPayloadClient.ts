import { getPayload } from 'payload';
import type { Payload } from 'payload';

import config from '@payload-config';

/**
 * Retrieves the Payload instance.
 *
 * @returns A promise that resolves to the Payload instance.
 */
const getPayloadClient = async (): Promise<Payload> => {
  return await getPayload({ config });
};

export default getPayloadClient;
