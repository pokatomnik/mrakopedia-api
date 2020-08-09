export const style = (rules) =>
  Object.entries(rules || {})
    .reduce((acc, [key, value]) => {
      if (!key || !value) {
        console.warn(`Empty key or value for pair ${key}:${value}`);
        return acc;
      }
      return [...acc, `${key}:${value}`];
    }, [])
    .join(';');
