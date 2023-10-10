<script setup>

import { defineEmits } from 'vue'
import { storeToRefs } from 'pinia' 

import { useStudentStore } from '../stores/StudentStore.js'

// const emit = defineEmits([ 'arrived-or-left' ])

const studentStore = useStudentStore()

const { sortedStudents } = storeToRefs(studentStore)

const { arrivedOrLeft, deleteStudent } = studentStore

const confirmThenDeleteStudent = (studentToDelete) => {
    if (confirm(`Delete ${studentToDelete.name}?`)) {
        deleteStudent(studentToDelete)
    }
}

const notifyArrivedOrLeft = (student) => {
    arrivedOrLeft(student)  // update store
    // emit('arrived-or-left', student)  // notify parent
}

</script>

<template>

<div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <div id="student-table">
        <table class="table">
            <thead>
                <tr class="align-middle">
                    <th>Name</th>
                    <th>StarID</th>
                    <th>Present?</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="student in sortedStudents" v-bind:key="student.starID" class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">
                    <td>{{ student.name }}</td>
                    <td>{{ student.starID }}</td>
                    <td> 
                        <input type="checkbox" v-model="student.present" v-on:change="notifyArrivedOrLeft(student)">
                        <span class="mx-3" v-if="student.present">Here!</span>
                        <span class="mx-3" v-else>Not present</span>
                    </td>
                    <td>
                        <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent(student)">
                            <i class="bi bi-trash-fill"></i> Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


</template>

<style scoped>

#student-table {
    max-height: 500px;
    overflow: scroll;
}

th, td {
    width: 25%;
    text-align: center;
}


.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}

</style>