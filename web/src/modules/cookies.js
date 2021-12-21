const isDevelopment = process.env.NODE_ENV === 'development';

export function getCookie(name, cookies) {
  if (cookies == null) {
    if (typeof window === 'undefined') {
      return undefined;
    }
    cookies = document.cookie;
  }

  const kv = cookies.split(';').find((part) => part.trim().startsWith(name));

  if (!kv) return undefined;

  const cookieValue = kv.split('=')[1];
  if (!cookieValue) return undefined;

  return decodeURIComponent(cookieValue.trim());
}

export function setLangCookie(newLocale) {
  // #dk 'None' requires secure: true
  const sameSite = isDevelopment ? 'lax' : 'None'
  const options = isDevelopment ? {
    sameSite
  } : {
    sameSite,
    secure: true
  }

  setCookie('locale', newLocale, options)
}

export function setCookie(name, value, options = {}) {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = {
    [encodeURIComponent(name)]: encodeURIComponent(value),
    sameSite: 'lax',
    path: '/',
    ...options,
  };

  console.log(Object.entries(updatedCookie)
    .map((kv) => kv.join('='))
    .join(';'))

  document.cookie = Object.entries(updatedCookie)
    .map((kv) => kv.join('='))
    .join(';');
}
