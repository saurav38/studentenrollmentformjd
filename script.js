let isNewEntry = true;

function initializeForm() {
  document.getElementById("roll_no").focus();
  disableFields();
}

function checkPrimaryKey() {
  const rollNoInput = document.getElementById("roll_no");
  const saveButton = document.getElementById("saveButton");
  const updateButton = document.getElementById("updateButton");
  const resetButton = document.getElementById("resetButton");

  if (rollNoInput.value.trim() !== "") {
    isNewEntry = true;
    enableButtons([saveButton, resetButton]);
    disableButtons([updateButton]);
    enableFields();
    document.getElementById("full_name").focus();
  } else {
    disableButtons([saveButton, updateButton, resetButton]);
    disableFields();
  }
}

function enableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("disabled");
  });
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.add("disabled");
  });
}

function enableFields() {
  const fields = document.getElementById("enrollmentForm").elements;
  for (let i = 0; i < fields.length; i++) {
    fields[i].disabled = false;
  }
}

function disableFields() {
  const fields = document.getElementById("enrollmentForm").elements;
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id !== "roll_no") {
      fields[i].disabled = true;
    }
  }
}

function saveData() {
  const form = document.getElementById("enrollmentForm");

  if (form.checkValidity()) {
    const rollNo = document.getElementById("roll_no").value;
    const fullName = document.getElementById("full_name").value;
    const studentClass = document.getElementById("class").value;
    const birthDate = document.getElementById("birth_date").value;
    const address = document.getElementById("address").value;
    const enrollmentDate = document.getElementById("enrollment_date").value;

    const jsonData = {
      Roll_No: rollNo,
      Full_Name: fullName,
      Class: studentClass,
      Birth_Date: birthDate,
      Address: address,
      Enrollment_Date: enrollmentDate
    };

    if (isNewEntry) {
      // Make a POST request to insert the data into JSONPowerDB
      fetch("http://localhost:port_number/insert/STUDENT_TABLE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Data saved successfully.");
          resetForm();
        })
        .catch(error => {
          console.error("Error saving data:", error);
        });
    } else {
      // Make a PUT request to update the data in JSONPowerDB
      fetch(`http://localhost:port_number/update/STUDENT_TABLE/${rollNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Data updated successfully.");
          resetForm();
        })
        .catch(error => {
          console.error("Error updating data:", error);
        });
    }
  } else {
    form.reportValidity();
  }
}

function resetForm() {
  const form = document.getElementById("enrollmentForm");
  form.reset();
  isNewEntry = true;
  initializeForm();
}
