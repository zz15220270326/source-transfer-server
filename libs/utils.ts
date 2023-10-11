export * from './modules/fsExtensions';
export * from './modules/tempDir';
export * from './modules/videoTransfer';
export * from './modules/date';
export * from './modules/audioTransfer';
export * from './modules/logs';

/**
 * 根据列表获取分页数据
 */
export function getPaginationListData<T>(origin: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
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
