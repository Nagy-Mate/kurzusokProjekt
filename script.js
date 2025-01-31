async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        alert('Hiba történt:', error);
    }
}

async function displayCourses() {
    const courses = await fetchData('https://vvri.pythonanywhere.com/api/courses');
    const coursesList = document.getElementById('courses-list');
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = ''; // Clear students list
    coursesList.innerHTML = '';
    courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = "Id: "+course.id+" Kurzus:  "+course.name;
        coursesList.appendChild(li);
    });
}

async function displayStudents() {
    const students = await fetchData('https://vvri.pythonanywhere.com/api/students');
    const studentsList = document.getElementById('students-list');
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = ''; // Clear courses list
    studentsList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = "Id: "+student.id+" Név:  "+student.name;
        studentsList.appendChild(li);
    });
}

async function createCourse() {
    const courseName = prompt("Add meg a kurzus nevét:");
    if (courseName) {
        try {
            const response = await fetch('https://vvri.pythonanywhere.com/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: courseName })
            });
            if (response.ok) {
                displayCourses();
            } else {
                alert('Hiba történt a kurzus létrehozásakor.');
            }
        } catch (error) {
            alert('Hiba történt:', error);
        }
    }
}

async function createStudent() {
    const studentName = prompt("Add meg a diák nevét:");
    const coursId = prompt("Add meg a kurzus ID-t:");
    if (studentName) {
        try {
            const response = await fetch('https://vvri.pythonanywhere.com/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: studentName, course_id: coursId })
            });
            if (response.ok) {
                displayStudents();
            } else {
                alert('Hiba történt a diák létrehozásakor.');
            }
        } catch (error) {
            alert('Hiba történt:', error);
        }
    }
}

async function editCourse() {
    const courseId = prompt("Add meg a szerkesztendő kurzus ID-ját:");
    const courseName = prompt("Add meg az új kurzus nevét:");
    if (courseId && courseName) {
        try {
            const response = await fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: courseName })
            });
            if (response.ok) {
                displayCourses();
            } else {
                alert('Hiba történt a kurzus szerkesztésekor.');
            }
        } catch (error) {
            alert('Hiba történt:', error);
        }
    }
}

async function editStudent() {
    const studentId = prompt("Add meg a szerkesztendő diák ID-ját:");
    const studentName = prompt("Add meg az új diák nevét:");
    const coursId = prompt("Add meg az új kurzus ID-t:");
    if (studentId && studentName) {
        try {
            const response = await fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: studentName, course_id: coursId})
            });
            if (response.ok) {
                displayStudents();
            } else {
                alert('Hiba történt a diák szerkesztésekor.');
            }
        } catch (error) {
            alert('Hiba történt:', error);
        }
    }
}

async function deleteCourse() {
    const courseId = prompt("Add meg a törlendő kurzus ID-ját:");
    if (courseId) {
        try {
            const response = await fetch(`https://vvri.pythonanywhere.com/api/courses/${courseId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                displayCourses();
            } else {
                alert('Hiba történt a kurzus törlésekor.');
            }
        } catch (error) {
            alert('Hiba történt:', error);
        }
    }
}

async function deleteStudent() {
    const studentId = prompt("Add meg a törlendő diák ID-ját:");
    if (studentId) {
        try {
            const response = await fetch(`https://vvri.pythonanywhere.com/api/students/${studentId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                displayStudents();
            } else {
                alert('Hiba történt a diák törlésekor.');
            }
        } catch (error) {
            alert('Hiba történt:', error);
        }
    }
}