<template>
  <v-alert :model-value="!!allert" closable :title="allert?.title" :text="allert?.text" :type="allert?.type"
    position="fixed" class="bottom-20 left-1/2 transform -translate-x-1/2 max-w-[80%] z-110"
    @click:close="closeAlert"></v-alert>
</template>

<script lang="ts" setup>
const { allert, clearAlert } = useAllert()

let timerID: ReturnType<typeof setTimeout>

watch(allert, () => {
  timerID = setTimeout(() => {
    closeAlert()
  }, 10000)
})

function closeAlert() {
  clearAlert()
  if (timerID) clearTimeout(timerID)
}
</script>

<style lang="scss" scoped></style>