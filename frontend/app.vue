<template>
  <div :data-theme="theme">
    <NuxtPage />
    <toast />
  </div>
</template>

<script setup>
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
</script>