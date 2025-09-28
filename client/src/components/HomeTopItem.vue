<!-- Top item component -->
<template>
  <component :is="componentType" :to="route" :class="bgColor" class="mb-4 h-full rounded-3xl pl-[14px] pt-[10px] text-xl font-semibold">
    <h1 class="mb-1">{{ title }}</h1>
    <div :class="bordColor" class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] pl-3 pr-3 pt-[6px] text-base font-medium bg-neutral-800">
      {{ content }}
    </div>
  </component>
</template>

<script setup>
defineOptions({
  name: "HomeTopItem"
})

const props = defineProps({
  title: String,
  route: String,
  content: String,
  bgColor: String,
  bordColor: String,
  componentType: String,
})

console.log(props);
</script>
