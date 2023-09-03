const clockPattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

// 验证时钟格式的函数
export function isValidClockFormat(str) {
  return clockPattern.test(str);
}