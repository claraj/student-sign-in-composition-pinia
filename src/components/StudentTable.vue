<script setup>

import StudentRow from './StudentRow.vue'

import { storeToRefs } from 'pinia' 
import { useStudentStore } from '../stores/StudentStore.js'

const studentStore = useStudentStore()

// reactive
const { sortedStudents, studentCount } = storeToRefs(studentStore)

const { arrivedOrLeft, deleteStudent } = studentStore

</script>

<template>

<div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List, {{ studentCount}} student(s)</h4>
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

                <!-- or can send the entire student object -->
                <!-- v-bind:student="student"  -->
                <StudentRow 
                    v-for="student in sortedStudents" 
                    v-bind:key="student.starID"
                    v-bind:starID="student.starID"
                    v-on:delete-student="deleteStudent"
                    v-on:arrived-or-left="arrivedOrLeft">       
                </StudentRow>

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

</style>