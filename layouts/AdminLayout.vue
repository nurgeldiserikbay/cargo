<template>
  <v-card class="!min-h-full">
    <v-layout class="!min-h-full">
      <v-system-bar color="deep-purple darken-3"></v-system-bar>

      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title v-if="getCurrentRoute">{{ $t(getCurrentRoute.text) }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <LangSwitcher></LangSwitcher>

        <v-btn variant="text" icon="mdi-logout" @click="logout"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" :permanent="$vuetify.display.mdAndUp" color="indigo-darken-1"
        class="!pt-8">
        <v-list>
          <v-list-item v-for="item in getMenuList" :key="item.to" :active="route.path === localePath(item.to)"
            @click="clickItem(item.to)">
            {{ $t(item.text) }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const { logout } = useAppAuth()
const route = useRoute()
const router = useRouter()
const { data } = useAuth()

const drawer = ref(false)

const getMenuList = computed(() => {
  return ADMIN_MENUS.filter((m) => crossValArr(m.roles, data.value?.authorities || []))
})
const getCurrentRoute = computed(() => getMenuList.value.find((r) => route.path === localePath(r.to)))

function clickItem(linkTo: string) {
  router.push(localePath(linkTo))
}
</script>

<style lang="scss" scoped></style>