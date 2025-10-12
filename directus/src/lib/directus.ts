import '@directus/sdk';
import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { getDirectusInternal, type Fetch } from './base.js';

export { type Fetch };

export const getDirectus = <S>(fetch: Fetch) => {
  return getDirectusInternal<S>(fetch, PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN);
};
