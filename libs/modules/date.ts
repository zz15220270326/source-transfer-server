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
