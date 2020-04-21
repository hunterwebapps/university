export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(char => {
          const hex = char.charCodeAt(0).toString(16);
          return '%' + `00${hex}`.slice(-2);
        })
        .join('')
    );

  return JSON.parse(jsonPayload);
}
