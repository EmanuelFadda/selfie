<template>
  <component :is="componentType" :to="route" :class="lightBgColor,darkBgColor" class="mb-4 ml-5 mr-5 h-full rounded-3xl pl-[14px] pt-[10px] text-xl lg:text-2xl font-semibold">
    <h1 class="mb-1">{{ title }}</h1>

    <!-- Contenitore oggetti calendario -->
    <div :class="lightBordColor,darkBordColor" class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] bg-slate-50 pl-3 pr-3 pt-[6px] text-base lg:text-lg font-medium dark:bg-neutral-800">
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
})
</script>

<script>
export default {
  name: "HomeGridTop",
}
</script>
