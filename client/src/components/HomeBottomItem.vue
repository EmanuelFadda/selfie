<!-- Bottom item component -->
<template>
  <component :is="componentType" :to="route" :class="(lightBgColor, darkBgColor)" class="flex-flow-col flex rounded-3xl pl-[14px] pt-[7px] font-semibold max-sm:aspect-square md:pt-[10px] md:text-xl lg:text-2xl">
    <h1 class="mb-[3px]">{{ title }}</h1>
    <div :class="(lightBordColor, darkBordColor)" class="-ml-[14px] flex-1 rounded-b-3xl rounded-t-md border-[3px] bg-slate-50 pl-3 pr-3 pt-[3px] text-base font-medium lg:text-lg dark:bg-neutral-800">
      {{ content }}
    </div>
  </component>
</template>

<script>
export default {
  name: "HomeBottomItem",
  props: {
    title: String,
    route: String,
    content: String,
    lightBgColor: String,
    darkBgColor: String,
    lightBordColor: String,
    darkBordColor: String,
    componentType: String,
  },
}
</script>
