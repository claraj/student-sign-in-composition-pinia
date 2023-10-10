<script setup>

import { ref } from 'vue'
import { storeToRefs } from 'pinia' 

import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

import { useStudentStore } from './stores/StudentStore.js'

const studentStore = useStudentStore()

// const { studentList, sortedStudents } = storeToRefs(studentStore)

const studentArrivedOrLeft = (student) => { 
  mostRecentStudent.value = student
}


const mostRecentStudent = ref( {} )

</script>

<template>
  
  <NewStudentForm></NewStudentForm>
  <StudentTable v-on:arrived-or-left="studentArrivedOrLeft"></StudentTable>
  <StudentMessage v-bind:most-recent-student="mostRecentStudent"></StudentMessage>
  
</template>

<style scoped>

</style>
