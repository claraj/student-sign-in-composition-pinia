<script setup>

import { ref, reactive } from 'vue'

const emit = defineEmits(['delete-student', 'arrived-or-left'])

const props = defineProps({
    studentProp : Object
})

// Create a new reactive data from the prop
// ok to modify this because it is not synced with the prop
// We have to destructure the properties of the studentProp object and build a new object
const student = ref({...props.studentProp})

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

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}

</style>