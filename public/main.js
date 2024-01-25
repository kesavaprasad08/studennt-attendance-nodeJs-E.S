const searchBtn = document.getElementById("searchBtn");
const attendanceReportBtn = document.getElementById("attendanceReportBtn");
const attendanceSubmitBtn = document.getElementById("attendanceSubmitBtn");
attendanceSubmitBtn.style.display = "none";
const addStudentBtn = document.getElementById("addStudentBtn");
const attendanceList = document.getElementById("attendanceList");
const reportTable = document.getElementById("reportTable");
const attendanceFormMark = document.getElementById("attendanceFormMark");

const fetchStudents = async (e) => {
  try {
    const date = document.getElementById("selectedDate").value;
    const result = await axios.get(
      `http://localhost:3000/attendance/get-attendance/${date}`
    );
    

    if (!result.data.status) {
      const response = await axios.get(
        "http://localhost:3000/attendance/get-students"
      );

      const students = response.data.students;
      // console.log(students);
      attendanceList.innerHTML = "";
      reportTable.innerHTML = "";

      students.forEach((student) => {
        const studentName = student.name;
        const listItem = document.createElement("li");
        listItem.className = "list-group-item p-2";
        listItem.innerHTML = `<label>${studentName}</label>
                                  <input type="radio" id="flexRadioDefault2" class=" ${student.id}" name="${studentName}" value="Present" >
                                  <label  for="flexRadioDefault2">Present</label>
                                  <input type="radio" id="flexRadioDefault2" class=" ${student.id}" name="${studentName}" value="Absent">
                                  <label for="flexRadioDefault2">Absent</label>`;
        attendanceList.appendChild(listItem);
      });
      attendanceSubmitBtn.style.display = "block";
    } else {
      showAttendance(result.data.data[0].Presents);
    }
  } catch (err) {
    console.log(err);
  }
};
const fetchAttendance = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get(
      "http://localhost:3000/attendance/get-students"
    );
    console.log(response)
    const students = response.data.students;

    attendanceList.innerHTML = "";
    reportTable.innerHTML = "";
    const headerRow = reportTable.insertRow(0);
    const headerNameCell = headerRow.insertCell(0);
    const headerPresentCell = headerRow.insertCell(1);
    const headerPercentageCell = headerRow.insertCell(2);
    headerNameCell.textContent = "Student Name";
    headerNameCell.className = 'p-5';
    headerPercentageCell.textContent = "Percentage";
    headerPercentageCell.className = 'p-5';
    headerPresentCell.textContent = "Presents/Total";

    students.forEach((student) => {
      const row = reportTable.insertRow(-1);
      const nameCell = row.insertCell(0);
      const PresentCell = row.insertCell(1);
      const PercentageCell = row.insertCell(2);

      const { name, numberOfDaysPresent, totalNumberOfDays } = student;

      const PresentDays = `${numberOfDaysPresent}/${totalNumberOfDays}`;
      let Percentage = (
        (numberOfDaysPresent / totalNumberOfDays) *
        100
      ).toFixed(2);
      if(totalNumberOfDays==0){
        
        Percentage=0;
      }

      nameCell.textContent = name;
      nameCell.className = 'text-center';
      PresentCell.textContent = PresentDays;
      PresentCell.className='text-center';
      PercentageCell.textContent = Percentage;
        PercentageCell.className='text-center'
      attendanceSubmitBtn.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
};

const submitAttendance = async (e) => {
  e.preventDefault();
  try {
    const dateInput = document.getElementById("selectedDate").value;
    const radioInputs = document.querySelectorAll("input[type=radio]:checked");
    

    const attendanceData = [];
    // console.log(radioInputs)
    radioInputs.forEach(async (radioInput) => {
     
      const studentName = radioInput.name;
      const status = radioInput.value.toLowerCase();
      const studentId = radioInput.className.toString();

      attendanceData.push({
        studentName,
        status,
      });
      if (studentId) {
        if (status == "present") {
          // console.log(`${studentName} : ${status}`);
          await axios.put(
            `http://localhost:3000/attendance/update?studentId=${studentId}&status=Present`
          );
        } else {
          // console.log(`${studentName} : ${status}`);
          await axios.put(
            `http://localhost:3000/attendance/update?studentId=${studentId}&status=Absent`
          );
        }
      }
    });
    const data = {
      date: dateInput,
      Presents: JSON.stringify(attendanceData),
    };

    axios
      .post("http://localhost:3000/attendance/add-attendance", data)
      .then((res) => {
        showAttendance(res.data.data.Presents);
      });
  } catch (error) {
    console.error(error);
    document.getElementsByTagName(
      "body"
    ).innerHTML = `<h1>Something went wrong!!!</h1>`;
  }
};
// update
const showAttendance = (presentsData) => {
    try {
      const AttendanceData = JSON.parse(presentsData);
  
      attendanceList.innerHTML = "";
      reportTable.innerHTML = "";
  
      AttendanceData.forEach((studentData) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `${studentData.studentName} : ${studentData.status}`;
        attendanceList.appendChild(listItem);
  
        attendanceSubmitBtn.style.display = "none";
      });
    } catch (error) {
      console.log(error);
    }
  };

const addStudent = async () => {
  try {
    const name = document.getElementById("name").value;
    const response = await axios.post(
      `http://localhost:3000/attendance/add-student`,
      {
        name: name,
      }
    );
    document.getElementById("name").value = "";
  } catch (e) {
    console.log(e);
  }
};

searchBtn.addEventListener("click", fetchStudents);
attendanceReportBtn.addEventListener("click", fetchAttendance);
attendanceFormMark.addEventListener("submit", submitAttendance);
addStudentBtn.addEventListener("click", addStudent);
