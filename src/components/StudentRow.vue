<script setup>

import { ref } from 'vue'

const emit = defineEmits(['delete-student', 'arrived-or-left'])

import { storeToRefs } from 'pinia' 
import { useStudentStore } from '../stores/StudentStore.js'

// stuck with props - need some way 
// to tell this component which 
// student it is displaying. 

const props = defineProps({
    starID: String
})


const studentStore = useStudentStore()
const { getStudentByStarId } = storeToRefs(studentStore)

// this seems hacky, check 
const student = ref(getStudentByStarId.value(props.starID))


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

<!-- less hacky in the template  -->
    <!-- {{  getStudentByStarId(studentStarID) }} -->

    <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">

    <td>{{ student.name }} </td>
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