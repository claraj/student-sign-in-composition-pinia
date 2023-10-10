<script setup>

import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['delete-student', 'arrived-or-left'])

defineProps({
    student: Object
})

const confirmThenDeleteStudent = (studentToDelete) => {
    if (confirm(`Delete ${studentToDelete.name}?`)) {
        emit('delete-student', studentToDelete)
    }
}

const notifyArrivedOrLeft = (studentModified) => {
    emit('arrived-or-left', studentModified) 
}

</script>


<template>
    <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">

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

</template>

<style scoped>
</style>