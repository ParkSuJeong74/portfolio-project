import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import "./Calendar.css"

function Calendar() {
  const fakeData = [
    {
      title: "안녕",
      start: "2022-04-01",
      end: "2022-04-04",
      borderColor: "red",
      backgroundColor: "red",
    },
    { title: "event 2", start: "2022-04-02" },
    {
      title: "event 4",
      start: "2022-04-10T14:50:27",
      end: "2022-04-17T12:30:00",
      allDay: true,
    },
    {
      title: "event3",
      start: "2022-04-10T14:50:27",
      allDay: false,
      textColor: "red",
      backgroundColor: "red",
    },
  ]
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "title",
          right: "today prev,next",
        }}
        editable={true}
        selectable={true}
        events={fakeData}
      />
      <FullCalendar
        plugins={[listPlugin, interactionPlugin]}
        initialView="listWeek"
        headerToolbar={{
          left: "title",
          right: "prev,next",
        }}
        editable={true}
        events={fakeData}
      />
    </>
  )
}

export default Calendar
