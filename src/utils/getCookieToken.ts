const getCookieToken = (): string | null => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)goodie-token\s*=\s*([^;]*).*$)|^.*$/, '$1');
  return token;
};

export default getCookieToken;
