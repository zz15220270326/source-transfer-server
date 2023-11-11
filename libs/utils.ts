export * from './modules/fsExtensions';
export * from './modules/tempDir';
export * from './modules/videoTransfer';
export * from './modules/date';
export * from './modules/audioTransfer';
export * from './modules/logs';
export * from './modules/app';
export * from './modules/qiniu';

/**
 * 根据列表获取分页数据
 */
export function getPaginationListData<T>(origin: T[], page: number, initialPageSize: number) {
  const pageSize = initialPageSize < 5 ? 5 : initialPageSize;

  const start = (page - 1) * pageSize;
  const end = page * (pageSize < 5 ? 5 : pageSize);
  const total = origin.length;
  const totalPage = Math.ceil(total / pageSize);

  const list = origin.slice(start, end);

  return {
    page,
    pageSize,
    page_size: pageSize,
    list,
    total,
    totalPage,
    total_page: totalPage,
  };
}
