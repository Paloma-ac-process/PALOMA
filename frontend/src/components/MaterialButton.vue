<template>
  <a
    :href="href"
    :target="target"
    :class="['btn', btnClass]"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: String,
  target: String,
  variant: { type: String, default: 'outline' },
  color: { type: String, default: 'primary' },
  size: { type: String, default: 'md' }
})

const btnClass = computed(() => [
  `btn-${props.variant}-${props.color}`,
  props.size === 'sm' ? 'btn-sm' : '',
])
</script> 