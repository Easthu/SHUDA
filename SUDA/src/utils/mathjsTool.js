/*
 * @Author: Est
 * @Date: 2023-04-10 18:51:33
 * @LastEditors: Est
 * @LastEditTime: 2023-04-18 15:38:06
 * @FilePath: \public-zone美食专区\src\utils\mathjsTool.js
 * @Description: 
 */
// 函数封装：mathjs的精度计算
import * as math from 'mathjs'
// 加法
export function mathAdd(num1, num2) {
	const addNumber = math.format(
		math.add(
			math.bignumber(num1), math.bignumber(num2) //两者相加
		)
	)
	return addNumber
}
// 减法
export function mathSubtract(num1, num2) {
	const subtractNumber = math.format(
		math.subtract(
			math.bignumber(num1), math.bignumber(num2) //前者减去后者
		)
	)
	return subtractNumber
}
// 乘法
export function mathMultiply(num1, num2) {
	const multiplyMumber = math.format(
		math.multiply(
			math.bignumber(num1), math.bignumber(num2) //两者相乘
		)
	)
	return multiplyMumber
}
// 除法
export function mathDivide(num1 = 0, num2 = 0) {
	const divideNumber = math.format(
		math.divide(
			math.bignumber(num1), math.bignumber(num2) //前者除以后者
		)
	)
	return divideNumber
}
