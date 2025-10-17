import { getDirectusInternal, type Fetch } from './base.js';
import { PRIVATE_DIRECTUS_TOKEN, PRIVATE_DIRECTUS_URL } from '$env/static/private';

export { type Fetch };

export const getBaseDirectus = <S>(fetch: Fetch) => {
  return getDirectusInternal<S>(fetch, PRIVATE_DIRECTUS_URL, PRIVATE_DIRECTUS_TOKEN);
};
