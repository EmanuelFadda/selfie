<template>
  <component :is="componentType" :to="route" :class="lightBgColor,darkBgColor" class="flex-flow-col mb-7 flex aspect-square rounded-3xl pl-[14px] pt-[7px] font-semibold focus:outline-offset-2">
    <h1 class="mb-[3px]">{{ title }}</h1>

    <!-- Contenitore oggetti note -->
    <div :class="lightBordColor,darkBordColor" class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] bg-slate-50 pl-3 pr-3 pt-[3px] text-base font-medium dark:bg-neutral-800">
      {{ content }}
    </div>
  </component>
</template>

<script setup>
defineProps({
  title: String,
  route: String,
  content: String,
  lightBgColor: String,
  darkBgColor: String,
  lightBordColor: String,
  darkBordColor: String,
  componentType: String,
});
</script>
