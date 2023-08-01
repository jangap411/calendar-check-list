// import React, { useState } from "react";
// import moment from "moment";
// // import "./CalendarChecklist.css";

// const Calendar = () => {
//   const [checkedDates, setCheckedDates] = useState([]);

//   const handleDayClick = (day) => {
//     const currentDate = moment().format("YYYY-MM-DD");

//     if (day === currentDate) {
//       const isChecked = checkedDates.includes(day);
//       if (isChecked) {
//         setCheckedDates(checkedDates.filter((date) => date !== day));
//       } else {
//         setCheckedDates([...checkedDates, day]);
//       }
//     }
//   };

//   const isDayChecked = (day) => checkedDates.includes(day);

//   const renderCalendarDays = () => {
//     const today = moment();
//     const startOfMonth = today.clone().startOf("month");
//     const endOfMonth = today.clone().endOf("month");

//     const days = [];
//     let day = startOfMonth;

//     while (day.isSameOrBefore(endOfMonth)) {
//       const formattedDay = day.format("YYYY-MM-DD");
//       const isCurrentDay = day.isSame(today, "day");
//       const isChecked = isDayChecked(formattedDay);
//       const isDisabled = day.isAfter(today, "day");

//       days.push(
//         <div
//           key={formattedDay}
//           className={`day${isCurrentDay ? " current" : ""}${
//             isChecked ? " checked" : ""
//           }${isDisabled ? " disabled" : ""}`}
//           onClick={() => !isDisabled && handleDayClick(formattedDay)}
//         >
//           {day.format("D")}
//         </div>
//       );

//       day.add(1, "day");
//     }

//     return days;
//   };

//   return <div className="calendar">{renderCalendarDays()}</div>;
// };

// export default Calendar;

// ----------------------------------------------------------------

// import React, { useState } from "react";
// import moment from "moment";
// import "./CalendarChecklist.css";

// const Calendar = () => {
//   const [checkedDates, setCheckedDates] = useState([]);

//   const handleDayClick = (day) => {
//     const currentDate = moment().format("YYYY-MM-DD");

//     if (day === currentDate) {
//       const isChecked = checkedDates.includes(day);
//       if (isChecked) {
//         setCheckedDates(checkedDates.filter((date) => date !== day));
//       } else {
//         setCheckedDates([...checkedDates, day]);
//       }
//     }
//   };

//   const isDayChecked = (day) => checkedDates.includes(day);

//   const renderCalendarDays = () => {
//     const today = moment();
//     const startOfMonth = today.clone().startOf("month");
//     const endOfMonth = today.clone().endOf("month");

//     const days = [];
//     let day = startOfMonth;

//     while (day.isSameOrBefore(endOfMonth)) {
//       const formattedDay = day.format("YYYY-MM-DD");
//       const isCurrentDay = day.isSame(today, "day");
//       const isChecked = isDayChecked(formattedDay);
//       const isDisabled = day.isAfter(today, "day");

//       days.push(
//         <div
//           key={formattedDay}
//           className={`day${isCurrentDay ? " current" : ""}${
//             isChecked ? " checked" : ""
//           }${isDisabled ? " disabled" : ""}`}
//           onClick={() => !isDisabled && handleDayClick(formattedDay)}
//         >
//           {day.format("D")}
//           {isChecked && <span className="checkmark">&#10004;</span>}
//         </div>
//       );

//       day.add(1, "day");
//     }

//     return days;
//   };

//   return <div className="calendar">{renderCalendarDays()}</div>;
// };

// export default Calendar;

// ----------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import axios from "axios";
// import "./CalendarChecklist.css";

// const Calendar = () => {
//   const [checkedDates, setCheckedDates] = useState([]);
//   const [currentMonth, setCurrentMonth] = useState(moment());

//   useEffect(() => {
//     fetchCheckedDates();
//   }, [currentMonth]);

//   const fetchCheckedDates = () => {
//     const startOfMonth = currentMonth.clone().startOf("month");
//     const endOfMonth = currentMonth.clone().endOf("month");

//     axios
//       .get("/api/checked-days", {
//         params: {
//           start: startOfMonth.format("YYYY-MM-DD"),
//           end: endOfMonth.format("YYYY-MM-DD"),
//         },
//       })
//       .then((response) => {
//         const checkedDays = response.data.map((checkedDay) => checkedDay.day);
//         setCheckedDates(checkedDays);
//       })
//       .catch((error) => {
//         console.error("Error fetching checked days:", error);
//       });
//   };

//   const handleDayClick = (day) => {
//     const currentDate = moment().format("YYYY-MM-DD");

//     if (day === currentDate) {
//       const isChecked = checkedDates.includes(day);
//       if (isChecked) {
//         setCheckedDates(checkedDates.filter((date) => date !== day));
//         deleteCheckedDay(day);
//       } else {
//         setCheckedDates([...checkedDates, day]);
//         saveCheckedDay(day);
//       }
//     }
//   };

//   const saveCheckedDay = (day) => {
//     axios
//       .post("/api/checked-days", { day })
//       .then(() => {
//         console.log("Checked day saved successfully");
//       })
//       .catch((error) => {
//         console.error("Error saving checked day:", error);
//       });
//   };

//   const deleteCheckedDay = (day) => {
//     axios
//       .delete(`/api/checked-days/${day}`)
//       .then(() => {
//         console.log("Checked day deleted successfully");
//       })
//       .catch((error) => {
//         console.error("Error deleting checked day:", error);
//       });
//   };

//   const isDayChecked = (day) => checkedDates.includes(day);

//   const handlePrevMonthClick = () => {
//     setCurrentMonth(currentMonth.clone().subtract(1, "month"));
//   };

//   const handleNextMonthClick = () => {
//     setCurrentMonth(currentMonth.clone().add(1, "month"));
//   };

//   const renderCalendarDays = () => {
//     const startOfMonth = currentMonth.clone().startOf("month");
//     const endOfMonth = currentMonth.clone().endOf("month");

//     const days = [];
//     let day = startOfMonth;

//     while (day.isSameOrBefore(endOfMonth)) {
//       const formattedDay = day.format("YYYY-MM-DD");
//       const isCurrentDay = day.isSame(moment(), "day");
//       const isChecked = isDayChecked(formattedDay);
//       const isDisabled = day.isAfter(moment(), "day");

//       days.push(
//         <div
//           key={formattedDay}
//           className={`day${isCurrentDay ? " current" : ""}${
//             isChecked ? " checked" : ""
//           }${isDisabled ? " disabled" : ""}`}
//           onClick={() => !isDisabled && handleDayClick(formattedDay)}
//         >
//           {day.format("D")}
//           {isChecked && <span className="checkmark">&#10004;</span>}
//         </div>
//       );

//       day.add(1, "day");
//     }

//     return days;
//   };

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <button onClick={handlePrevMonthClick}>Prev</button>
//         <h3>{currentMonth.format("MMMM YYYY")}</h3>
//         <button onClick={handleNextMonthClick}>Next</button>
//       </div>
//       <div className="calendar-days">{renderCalendarDays()}</div>
//     </div>
//   );
// };

// export default Calendar;

// =============================================================================================
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import { Button, Container, Col, Row } from "react-bootstrap";
// import "./CalendarChecklist.css";

// const Calendar = () => {
//   const [checkedDates, setCheckedDates] = useState(
//     JSON.parse(localStorage.getItem("checkedDates")) || []
//   );
//   const [currentMonth, setCurrentMonth] = useState(moment());

//   const handleDayClick = (day) => {
//     const currentDate = moment().format("YYYY-MM-DD");

//     if (day === currentDate) {
//       const isChecked = checkedDates.includes(day);
//       if (isChecked) {
//         setCheckedDates(checkedDates.filter((date) => date !== day));
//       } else {
//         setCheckedDates([...checkedDates, day]);
//       }
//     }
//   };

//   const isDayChecked = (day) => checkedDates.includes(day);

//   const handlePrevMonthClick = () => {
//     setCurrentMonth(currentMonth.clone().subtract(1, "month"));
//   };

//   const handleNextMonthClick = () => {
//     setCurrentMonth(currentMonth.clone().add(1, "month"));
//   };

//   const renderCalendarDays = () => {
//     const startOfMonth = currentMonth.clone().startOf("month");
//     const endOfMonth = currentMonth.clone().endOf("month");

//     const days = [];
//     let day = startOfMonth;

//     while (day.isSameOrBefore(endOfMonth)) {
//       const formattedDay = day.format("YYYY-MM-DD");
//       const isCurrentDay = day.isSame(moment(), "day");
//       const isChecked = isDayChecked(formattedDay);
//       const isDisabled = day.isAfter(moment(), "day");

//       days.push(
//         <div
//           key={formattedDay}
//           className={`day${isCurrentDay ? " current" : ""}${
//             isChecked ? " checked" : ""
//           }${isDisabled ? " disabled" : ""}`}
//           onClick={() => !isDisabled && handleDayClick(formattedDay)}
//         >
//           {day.format("D")}
//           {isChecked && <span className="checkmark">&#10004;</span>}
//         </div>
//       );

//       day.add(1, "day");
//     }

//     return days;
//   };

//   useEffect(() => {
//     localStorage.setItem("checkedDates", JSON.stringify(checkedDates));
//   }, [checkedDates]);

//   return (
//     <>
//       <div className="calendar">
//         <div className="calendar-header">
//           <Button onClick={handlePrevMonthClick} className="btn">
//             Prev
//           </Button>
//           <h3>{currentMonth.format("MMMM YYYY")}</h3>
//           <Button onClick={handleNextMonthClick} className="btn">
//             Next
//           </Button>
//         </div>
//         <div className="calendar-days">{renderCalendarDays()}</div>
//       </div>
//     </>
//   );
// };

// export default Calendar;

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./CalendarChecklist.css";

const Calendar = () => {
  const [checkedDates, setCheckedDates] = useState(
    JSON.parse(localStorage.getItem("checkedDates")) || []
  );
  const [currentMonth, setCurrentMonth] = useState(moment());

  const handleDayClick = (day) => {
    const currentDate = moment().format("YYYY-MM-DD");

    if (day === currentDate) {
      const isChecked = checkedDates.includes(day);
      if (isChecked) {
        setCheckedDates(checkedDates.filter((date) => date !== day));
      } else {
        setCheckedDates([...checkedDates, day]);
      }
    }
  };

  const isDayChecked = (day) => checkedDates.includes(day);

  const handlePrevMonthClick = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const renderCalendarDays = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");

    const days = [];
    let day = startOfMonth;

    while (day.isSameOrBefore(endOfMonth)) {
      const formattedDay = day.format("YYYY-MM-DD");
      const isCurrentDay = day.isSame(moment(), "day");
      const isChecked = isDayChecked(formattedDay);
      const isDisabled = day.isAfter(moment(), "day");

      days.push(
        <div
          key={formattedDay}
          className={`day${isCurrentDay ? " current" : ""}${
            isChecked ? " checked" : ""
          }${isDisabled ? " disabled" : ""}`}
          onClick={() => !isDisabled && handleDayClick(formattedDay)}
        >
          {day.format("D")}
          {isChecked && <span className="checkmark">&#10004;</span>}
        </div>
      );

      day.add(1, "day");
    }

    return days;
  };

  useEffect(() => {
    localStorage.setItem("checkedDates", JSON.stringify(checkedDates));
  }, [checkedDates]);

  return (
    <Container fluid className="calendar card">
      <Row className="calendar-header">
        <Col xs={4} md={2}>
          <Button onClick={handlePrevMonthClick}>Prev</Button>
        </Col>
        <Col xs={4} md={8}>
          <h3>{currentMonth.format("MMMM YYYY")}</h3>
        </Col>
        <Col xs={4} md={2}>
          <Button onClick={handleNextMonthClick}>Next</Button>
        </Col>
      </Row>
      <Row className="calendar-days p-2 card-body">{renderCalendarDays()}</Row>
    </Container>
  );
};

export default Calendar;
