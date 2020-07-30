export const userValidator = user => {
  if (!user || user.length <= 0) return 'User cannot be empty.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const urlValidator = url => {
  if (!url || url.length <= 0) return 'Url cannot be empty.';

  return '';
};
