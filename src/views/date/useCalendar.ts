import { computed, reactive, ref } from 'vue'
import { getYearMonthDay, generateDate } from './utils'
import dayjs, { Dayjs } from 'dayjs'

interface Time {
	year: number
	month: number
	day: number
}

export function useCalendar(value?: Date | Dayjs) {

	const time = ref<Time>(getYearMonthDay())
	// 前一年
	const prevYear = () => {
		const d = generateDate(time.value.year, time.value.month, 1)
		d.setFullYear(d.getFullYear() - 1)
		setTime(d)
	}
	//上一个月
	const prevMonth = () => {
		const d = generateDate(time.value.year, time.value.month, 1)
		d.setMonth(d.getMonth() - 1)
		setTime(d)
	}
	//下一年
	const nextYear = () => {
		const d = generateDate(time.value.year, time.value.month, 1)
		d.setFullYear(d.getFullYear() + 1)
		setTime(d)
	}
	//下个月
	const nextMonth = () => {
		const d = generateDate(time.value.year, time.value.month, 1)
		d.setMonth(d.getMonth() + 1)
		setTime(d)
	}

	//今天
	const setTodayToTime = () => {
		setTime(dayjs())
	}

	function setTime(date: Date | Dayjs) {
		time.value = getYearMonthDay(date)
	}

	function isCurrentMonth(date: Dayjs) {
		const { year, month } = getYearMonthDay(new Date(time.value.year, time.value.month, 1))
		const { year: y, month: m } = getYearMonthDay(date)
		return year === y && month === m
	}

	function isToday(date: Dayjs) {
		const { year, month, day } = getYearMonthDay(date)
		const { year: y, month: m, day: d } = getYearMonthDay(new Date())
		return year === y && month === m && day === d
	}

	const visibleDays = computed(() => {
		// 先获取当前的年月
		const { year, month } = getYearMonthDay(generateDate(time.value.year, time.value.month, 1))
		// 然后例如 2018-4-20 => 2018-4-1 定向到第一天
		const currentFirstDay = generateDate(year, month, 1)
		//获取第一天是周几
		const FirstDayWeek = dayjs(currentFirstDay).day()
		const startDay = dayjs(currentFirstDay).subtract(FirstDayWeek, 'day')
		const arr = []
		for (let i = 0; i < 35; i++) {
			let day = dayjs(startDay).add(i, 'day')
			arr.push(day)
		}
		//从arr中隔7天截取为一行
		// const n = 7
		// const lineNum = arr.length % n === 0 ? arr.length / n : Math.floor(arr.length / n + 1)
		// const res = []
		// for (let i = 0; i < lineNum; i++) {
		// 	// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
		// 	let temp = arr.slice(i * n, i * n + n)
		// 	res.push(temp)
		// }
		// return res
		return arr
	})
	return { time, visibleDays, setTodayToTime, prevYear, prevMonth, nextYear, nextMonth, isCurrentMonth, isToday }
}
