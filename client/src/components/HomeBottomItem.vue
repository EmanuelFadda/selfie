<!-- Bottom item component -->
<template>
  <component :is="componentType" :to="route" :class="bgColor" class="flex-flow-col flex rounded-3xl pl-[14px] pt-[7px] font-semibold max-sm:aspect-square sm:pt-[10px] sm:text-xl">
    <h1 class="mb-[3px]">{{ title }}</h1>
    <div :class="bordColor" class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px]  pl-[10px] pr-[10px] pt-[3px] text-base font-medium bg-neutral-800">
      <p class="font-bold text-lg truncate">{{ contentTitle }}</p>
      <p class="max-sm:line-clamp-3">{{ content }}</p>
    </div>
  </component>
</template>

<script setup>
defineOptions({
  name: "HomeBottomItem"
})

defineProps({
  title: String,
  route: String,
  contentTitle: String,
  content: String,
  bgColor: String,
  bordColor: String,
  componentType: String,
})
</script>
