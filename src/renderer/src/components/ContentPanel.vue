<template>
  <div class="content-panel" :style="{ 'border-top': showTopBorder ? '1px solid #ddd' : 'none' }">
    <div class="centent-inner">
        <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    showTopBorder: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="scss" scoped>
.content-panel {
    overflow: auto;
    height: calc(100vh - 62px);
    .content-inner {
        margin: 0px auto;
        width: 400px;
    }
}
</style>
