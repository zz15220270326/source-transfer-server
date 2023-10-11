/**
 * 获取年份信息
 */
export function getYMD(timestamp = Date.now()) {
  const year = new Date(timestamp).getFullYear();
  const month = new Date(timestamp).getMonth() + 1;
  const dayOfMonth = new Date(timestamp).getDate();

  return {
    year,
    month,
    dayOfMonth,
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
