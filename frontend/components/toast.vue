<template>
    <div v-if="showToast" class="toast toast-bottom" style="z-index: 99999">
      <div :class="'alert alert-' + type">
        <span>{{ message }}</span>
      </div>
    </div>
</template>

<script setup>
import useToast from '~/composables/toast'

const { showToast, show, message, type } = toRefs(useToast())

</script>