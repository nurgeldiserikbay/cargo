<template>
  <v-list v-if="productHistory" :variant="'elevated'" :loading="pending">
    <v-list-item v-for="item in productHistory" :key="item.id" :variant="'elevated'" class="mb-4 cursor-pointer">
      <v-row>
        <v-col :align-self="'center'" class="border !border-r-(2px solid color1)">
          {{ item.warehouseName }}
        </v-col>
        <v-col :align-self="'center'">
          {{ item.warehouseAddress }}
        </v-col>
        <v-col :align-self="'center'">
          {{ new Date(item.createdDate).toLocaleDateString() }}
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
  <div v-else class="w-full min-h-[50px] flex justify-start items-left text-h6">
    {{ $t('messages.noData') }}
  </div>
</template>

<script lang="ts" setup>
const $props = defineProps<{
  id: number;
}>()

const { $api } = useNuxtApp()

const { pending, data: productHistory } = await $api.product.getProductHistory($props.id)
</script>

<style lang="scss" scoped></style>