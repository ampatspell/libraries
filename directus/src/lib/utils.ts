import { page } from '$app/state';
import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { setAttr as baseSetAttr } from '@directus/visual-editing';

interface SetAttrOptions {
  collection: string;
  item: string | number;
  fields?: string | string[];
  mode?: 'modal' | 'popover' | 'drawer';
}

export const setAttr = (opts: SetAttrOptions) => {
  if (page.data.visualEditingEnabled) {
    return baseSetAttr({
      ...opts,
    });
  }
  return undefined;
};

export const resolveAsset = (id: string, params: Record<string, unknown>) => {
  const url = PUBLIC_DIRECTUS_URL;
  const access_token = PUBLIC_DIRECTUS_TOKEN;

  params = { access_token, ...params };

  const query = Object.keys(params)
    .reduce<string[]>((arr, key) => {
      const pair = `${key}=${params[key]}`;
      return [...arr, pair];
    }, [])
    .join('&');

  return [`${url}/assets/${id}`, query].join('?');
};

export const resolveImagePreset = (id: string, key: string) => resolveAsset(id, { key });

export const withErrorLogging = async <T>(cb: () => Promise<T>) => {
  try {
    return await cb();
  } catch(err: unknown) {
    if(err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error(err);
    }
    throw err;
  }
}
