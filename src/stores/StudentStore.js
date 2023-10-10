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
        mostRecentStudent.value = student
    }

    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            // return positive number if s1 should be sorted after s2
            if (s1.name.toUpperCase() > s2.name.toUpperCase()) {
                return 1
            }

            // return negative number if s1 should be sorted before s2
            if (s1.name.toUpperCase() < s2.name.toUpperCase()) {
                return -1
            }

            // return 0 if order is equivalent, names are the same
            // optional - if names are the same, sort by starId
            return 0
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