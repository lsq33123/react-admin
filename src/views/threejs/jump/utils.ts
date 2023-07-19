


//函数rand会返回介于m和n之间的一个随机整数（包括最小值和最大值
export const rand = (m: number, n: number) => {
  return Math.ceil(Math.random() * (n - m + 1) + m - 1)
}