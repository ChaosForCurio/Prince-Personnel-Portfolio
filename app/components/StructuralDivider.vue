<script setup>
defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  thickness: {
    type: String,
    default: 'h-2 md:h-[8px]'
  }
})
</script>

<template>
  <div 
    class="w-full divider"
    :class="[thickness, `bg-${color}`]"
  ></div>
</template>

<style scoped>
.divider {
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
