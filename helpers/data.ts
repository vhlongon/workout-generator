import { User } from '@clerk/nextjs/server';

export const getUserNameOrId = (user: User) => {
  if (user.username) {
    return user.username;
  }

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) {
    return user.firstName;
  }

  return user.id;
};
