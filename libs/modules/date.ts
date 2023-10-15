/**
 * 获取年份信息
 */
export function getYMD(timestamp = Date.now()) {
  const year = new Date(timestamp).getFullYear();
  const month = new Date(timestamp).getMonth() + 1;
  const dayOfMonth = new Date(timestamp).getDate();

  const hour = new Date(timestamp).getHours();
  const minute = new Date(timestamp).getMinutes();
  const second = new Date(timestamp).getSeconds();

  return {
    year,
    month,
    dayOfMonth,
    hour,
    minute,
    second
  };
}

/**
 * 格式化补零
 */
export function isAddZero(num: number): string {
  if (num < 10) {
    return '0' + num;
  }
  return String(num);
}

/**
 * 获取格式化时间字符串
 */
export function getFormatTime(timestamp = Date.now()) {
  const { year, month, dayOfMonth, hour, minute, second } = getYMD(timestamp);
  return `${year}-${isAddZero(month)}-${isAddZero(dayOfMonth)} ${isAddZero(hour)}:${isAddZero(minute)}:${isAddZero(second)}`;
}

/**
 * 根据创建时间排序
 * @param {Record<string, any>[]} list 原来的列表
 * @param {boolean} order 排列的顺序 (false -> 由近到远；true -> 由远到近)
 * @return {Record<string, any>[]} 被过滤之后的列表
 */
export function orderByCreateTime(
  list: Record<string, any>[],
  order: boolean = false
): Record<string, any>[] {
  return list.sort((a, b) => {
    if (!order) {
      return a.createTime - b.createTime;
    }
    return b.createTime - a.createTime;
  });
}
