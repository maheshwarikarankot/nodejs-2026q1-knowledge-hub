import { usersRoutes } from '../endpoints';

const removeTokenUser = async (request: any, userId: string, commonHeaders: Record<string, string>) => {
  // delete user
  await request.delete(usersRoutes.delete(userId)).set(commonHeaders);
};

export default removeTokenUser;