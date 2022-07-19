import dayjs, { Dayjs } from 'dayjs'

const getYearMonthDay = (date?: Dayjs | Date) => {
	date = date || dayjs()
	const year = dayjs(date).year()
	const month = dayjs(date).month()
	const day = dayjs(date).date()
	return { year, month, day }
}
//生成日期
const generateDate = (year: number, month: number, day: number): Date => {
	return new Date(year, month, day)
}

export { getYearMonthDay, generateDate }
