export const getWordEnding = (number: number | string, one: string, two: string, five: string) => {
	if (!Number.isFinite(number)) {
		console.error(`Вы передаёте: ${number} = ${typeof number} передайте корректное число`)
		return
	}
	let n = Math.abs(+number)
	n %= 100
	if (n >= 5 && n <= 20) {
		return five
	}
	n %= 10
	if (n === 1) {
		return one
	}
	if (n >= 2 && n <= 4) {
		return two
	}
	return five
}
