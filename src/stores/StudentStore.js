import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStudentStore = defineStore('students', () => {

    const studentList = ref([
        { name: "A. Student", starID: "aa1234aa", present: false },
        { name: "B. Student", starID: "bb1234bb", present: false }
    ])

    const mostRecentStudent = ref( {} )

    function addNewStudent(student) {
        studentList.value.push(student)
    }

    function deleteStudent(studentToDelete) {
        studentList.value = studentList.value.filter( (student) => {
            return studentToDelete != student
        })
    }

    function arrivedOrLeft(student) {
        const studentToModifyIndex = studentList.value.findIndex(s => s.starID == student.starID)
        if (studentToModifyIndex != -1) {
            mostRecentStudent.value = student
            studentList.value.splice(studentToModifyIndex, 1, student)
        }
    }

    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })

    return { 
        studentList, 
        mostRecentStudent, 
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 
        sortedStudents
    }

})