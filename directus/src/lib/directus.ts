// No clue why but w/o this import schema generic breaks
import '@directus/sdk';
import { getDirectusInternal, type Fetch } from './base.js';
import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from '$env/static/public';

export { type Fetch };

export const getBaseDirectus = <S>(fetch: Fetch) => {
  return getDirectusInternal<S>(fetch, PUBLIC_DIRECTUS_URL, PUBLIC_DIRECTUS_TOKEN);
};
