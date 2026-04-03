import { PaginatedResponse } from "./pagination.interface";


export function paginate<T>(
  items   : T[],
  page    : number = 1,
  limit   : number = 10,
): PaginatedResponse<T> {
  const total  = items.length;
  const start  = (page - 1) * limit;
  const end   = start + limit;
  const data   = items.slice(start, end);
  return { data, total, page, limit };
}

export function sortItems<T>(
  items  : T[],
  sortBy?: string,
  order  : 'asc' | 'desc' = 'asc',
): T[] {
  if (!sortBy) return items;
  return [...items].sort((a: any, b: any) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (aVal === undefined || bVal === undefined) return 0;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });
}