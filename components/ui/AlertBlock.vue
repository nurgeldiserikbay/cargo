<template>
  <v-alert :model-value="!!allert" closable :type="allert?.type"
    position="fixed" class="bottom-20 left-1/2 transform -translate-x-1/2 max-w-[80%] z-110"
    @click:close="closeAlert">
      <template v-if="allert?.title" #title>
        <div class="text-lg lg:text-2xl text-center">
          {{ allert?.title }}
        </div>
      </template>
      <template v-if="allert?.text" #text>
        <div class="text-sm lg:text-xl">
          {{ allert?.text }}
        </div>
      </template>
    </v-alert>
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