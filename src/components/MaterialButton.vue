<script setup>
import { computed } from 'vue'

const props = defineProps({
  to:       [String, Object],
  href:     String,
  target:   { type: String, default: '_self' },
  variant:  {
    type: String,
    default: 'contained',
    validator: v => ['contained','gradient','outline'].includes(v)
  },
  color:    {
    type: String,
    default: 'primary',
    validator: c => [
      'primary','secondary','info','success',
      'warning','danger','error','light','white','dark','none'
    ].includes(c)
  },
  size:     {
    type: String,
    default: 'md',
    validator: s => ['sm','md','lg'].includes(s)
  },
  fullWidth:{ type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const classes = computed(() => {
  const cls = []
  // variant + color
  if (props.variant === 'gradient')      cls.push(`bg-gradient-${props.color}`)
  else if (props.variant === 'outline') cls.push(`btn-outline-${props.color}`)
  else                                   cls.push(`btn-${props.color}`)
  // size
  cls.push(`btn-${props.size}`)
  // full width / disabled
  if (props.fullWidth) cls.push('w-100')
  if (props.disabled)  cls.push('disabled')
  return cls.join(' ')
})
</script>

<template>
  <!-- 1) Si on a un prop `to`, on rend un router-link -->
  <router-link
    v-if="to"
    :to="to"
    class="btn"
    :class="classes"
    :aria-disabled="disabled"
  >
    <slot/>
  </router-link>

  <!-- 2) Sinon, si on a un prop `href`, on rend une balise <a> externe -->
  <a
    v-else-if="href"
    :href="href"
    :target="target"
    class="btn"
    :class="classes"
    :aria-disabled="disabled"
  >
    <slot/>
  </a>

  <!-- 3) Enfin, un bouton classique -->
  <button
    v-else
    type="button"
    class="btn"
    :class="classes"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>
