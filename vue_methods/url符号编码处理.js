
export const handleUrl = (url: string) => {
  // const check = ['\\+'];
  const check = [''];
  check.forEach((item) => {
    url = url.replace(new RegExp(item, 'g'), encodeURIComponent(item));
  });
  return url;
};