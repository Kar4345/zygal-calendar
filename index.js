const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function generateCalendar(totalDays, firstDay) {
  const days = [false, false, false, false, false, false, false];
  const calendarObject = [[...days]];
  let startIndex = firstDay;
  let week = 0;
  for (let day = 0; day < totalDays; day++) {
    //adding elements inside the calenderObject to initialize the key to the days
    calendarObject[week][startIndex] = day + 1;
    //checking the day index is <= arr.length so value will be 0
    //& pointer will point towards the start
    if (startIndex === 6) {
      calendarObject.push([...days]);
      week += 1;
      startIndex = 0;
    } else {
      startIndex += 1;
    }
  }
  console.log(calendarObject)
  return calendarObject;
}

const getTotalDaysForMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = function (month, year) {
  return new Date(year, month - 1, 1).getDay(); // 0 - 6
};

const createCalendar = function (calendar) {
  const weeks = weekdays.map((val, index) => {
    return `<div class="day-cell"> ${val} </div> `;
  });
  const allWeeks = calendar.map((week) => {
    const allDays = week.map((day) => {
      // if day is found we display the day else display nothing
      return `<div id="day-${day ? day : ""}" class="day-cell"> ${
        day ? `<span> ${day}</span>` : ""
      } </div>`;
    });
    //joining the days name to make a row
    return `
                    <div class="week-row">
                        ${allDays.join("")}
                    </div>
                `;
  });
  allWeeks.unshift(`<div class="week-row">${weeks.join("")}</div>`);
  let htmlCalendar = allWeeks.join("");
  document.getElementById("calendar").innerHTML = htmlCalendar;
};
//Highlighting Entered Date
const toggleHighlightDate = (date) => {
  const dayCell = document.getElementById(`day-${date}`);
  if (dayCell) {
    if (dayCell.className.indexOf("active") > -1) {
      dayCell.className += "day-cell";
    } else dayCell.className += " active";
  }
};

const changeCalendarMonthYear = function (month, year) {
  const totalDaysInMonth = getTotalDaysForMonth(month, year);
  const firstDayInMonth = getFirstDayOfMonth(month, year);
  console.log(totalDaysInMonth,firstDayInMonth)
  const calender = generateCalendar(totalDaysInMonth, firstDayInMonth);
  createCalendar(calender);
};
//It generates the calender corresponding to the current date
const initiateCalendar = () => {
  //it dynamically adding month select tag
  const monthsOptions = months
    .map((month, index) => `<option value="${index + 1}"> ${month} </option>`)
    .join("");
  //it dynamically adding Year select tag
  let yearsOptions = "";
  for (let year = 1900; year < 2050; year++) {
    yearsOptions += `<option value="${year}">${year}</option>`;
  }
  document.getElementById("years").innerHTML = yearsOptions;
  document.getElementById("months").innerHTML = monthsOptions;

  const today = new Date();
  const currentYear = today.getFullYear();
  //.getMonth method will give month index start from zero
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  document.getElementById("years").value = currentYear;
  document.getElementById("months").value = currentMonth;
  
  changeCalendarMonthYear(currentMonth, currentYear);
  toggleHighlightDate(currentDate);
  //we created the custom elements to be used in further code
  window.selectedMonth = currentMonth;
  window.selectedYear = currentYear;
};

initiateCalendar();
//Highlighting the entered date
document.getElementById("changeDate").addEventListener("click", () => {
  const dateVal = document.getElementById("newDate").value;
  if (dateVal && !isNaN(dateVal)) {
    toggleHighlightDate(dateVal);
  }
});
//Changing calendar according to month
document.getElementById("months").addEventListener("change", (event) => {
  window.selectedMonth = event.target.value;
  changeCalendarMonthYear(window.selectedMonth, window.selectedYear);
});
// Changing calendar according to year
document.getElementById("years").addEventListener("change", (event) => {
  window.selectedYear = event.target.value;
  changeCalendarMonthYear(window.selectedMonth, window.selectedYear);
});
