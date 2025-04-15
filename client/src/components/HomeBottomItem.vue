<!-- Bottom item component -->
<template>
  <component :is="componentType" :to="route" :class="lightBgColor,darkBgColor" class="flex-flow-col flex rounded-3xl pl-[14px] pt-[7px] font-semibold max-sm:aspect-square sm:pt-[10px] sm:text-xl">
    <h1 class="mb-[3px]">{{ title }}</h1>
    <div :class="lightBordColor,darkBordColor" class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] bg-slate-50 pl-[10px] pr-[10px] pt-[3px] text-base font-medium dark:bg-neutral-800">
      {{ content }}
    </div>
  </component>
</template>

<script>
defineOptions({
  name: "HomeBottomItem"
})

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
