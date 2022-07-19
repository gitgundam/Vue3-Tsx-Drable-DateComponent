import { defineComponent, ref } from "vue"
import { useCalendar } from "./useCalendar"
import "./index.scss"
import dayjs from "dayjs"
import interact from "interactjs"

interface DatePickerProps {
  mode?: any
}
const position = { x: 0, y: 0 }

interact(".draggable").draggable({
  listeners: {
    start(event) {
      console.log(event.type, event.target)
    },
    move(event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
    },
  },
})

export default defineComponent({
  name: "",
  setup(props: DatePickerProps, ctx) {
    const { emit, attrs } = ctx
    const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const componentRef = ref()
    const { time, visibleDays, prevMonth, nextMonth, isToday, isCurrentMonth } =
      useCalendar()

    return () => (
      <div ref={componentRef} class="dashboard-calendar draggable">
        <div class="dashboard-calendar-header">
          <span class="dashboard-calendar-header-date">
            {time.value.year}年{time.value.month + 1}月
            <div class="dashboard-calendar-header-buttons">
              <span
                class="dashboard-calendar-header-buttons-top calendar-arrow"
                onClick={prevMonth}
              ></span>
              <span
                class="dashboard-calendar-header-buttons-bottom calendar-arrow"
                onClick={nextMonth}
              ></span>
            </div>
          </span>
        </div>
        <div class="dashboard-calendar-main">
          <div class="weeks">
            {weekArr.map((i, index) => (
              <span key={index}>{i}</span>
            ))}
          </div>
          <div class="days">
            {visibleDays.value.map((days, index) => (
              <span
                class={`day ${isToday(days) ? "today" : ""} ${
                  isCurrentMonth(days) ? "" : "notcurrentMonth"
                }`}
              >
                {dayjs(days).format("DD")}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
})
