export const getSecret = () => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error('No SECRET provided');
  }

  return secret;
};
