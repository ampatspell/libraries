import { PUBLIC_DIRECTUS_TOKEN, PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { isTruthy } from '@ampatspell/base/utils/array';
import type { Fetch } from '@ampatspell/directus/base';
import { error } from '@sveltejs/kit';

export const baseProxy = async (fetch: Fetch, req: Request, url: string) => {
  req.headers.set('Accept-Encoding', 'gzip');

  const res = await fetch(url, {
    body: req.body,
    method: req.method,
    headers: req.headers,
  });

  if (!res.body) {
    error(500, 'No body');
  }

  const headers = new Headers(res.headers);
  headers.delete('Content-Length');
  headers.delete('Accept-Ranges');
  headers.delete('Access-Control-Allow-Credentials');
  headers.delete('Access-Control-Allow-Origin');
  headers.delete('Access-Control-Expose-Headers');
  headers.set('Content-Encoding', 'gzip');

  const gzip = res.body.pipeThrough(new CompressionStream('gzip'));

  return new Response(gzip, {
    headers,
    status: res.status,
    statusText: res.statusText,
  });
};

const href = PUBLIC_DIRECTUS_URL;
const token = PUBLIC_DIRECTUS_TOKEN;

const toQuery = (params: Record<string, string>) => {
  return Object.keys(params)
    .reduce<string[]>((arr, key) => {
      const value = params[key];
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      return arr;
    }, [])
    .join('&');
};

export const proxy = async (fetch: Fetch, req: Request, path: string, params: Record<string, string>) => {
  const query = toQuery({ ...params, access_token: token });
  return baseProxy(fetch, req, [`${href}${path}`, query].filter(isTruthy).join('?'));
};
