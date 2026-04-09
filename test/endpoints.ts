export const usersRoutes = {
  getAll: '/user',
  getById: (userId: string) => `/user/${userId}`,
  create: '/user',
  update: (userId: string) => `/user/${userId}`,
  delete: (userId: string) => `/user/${userId}`,
};

export const categoriesRoutes = {
  getAll: '/category',
  getById: (categoryId: string) => `/category/${categoryId}`,
  create: '/category',
  update: (categoryId: string) => `/category/${categoryId}`,
  delete: (categoryId: string) => `/category/${categoryId}`,
};

export const articlesRoutes = {
  getAll: '/article',
  getById: (articleId: string) => `/article/${articleId}`,
  create: '/article',
  update: (articleId: string) => `/article/${articleId}`,
  delete: (articleId: string) => `/article/${articleId}`,
};

export const commentsRoutes = {
  getByArticle: (articleId: string) => `/comment?articleId=${articleId}`,
  getById: (commentId: string) => `/comment/${commentId}`,
  create: '/comment',
  delete: (commentId: string) => `/comment/${commentId}`,
};

export const authRoutes = {
  signup: '/auth/signup',
  login: '/auth/login',
  refresh: '/auth/refresh',
};