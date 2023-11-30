<template>
  <div>
    <v-btn color="secondary" :icon="true" :variant="'elevated'" :size="'small'" class="d-block d-md-none fixed top-3 left-3 z-100" @click="menu = !menu">
      <template v-slot:prepend>
        <v-icon icon="mdi mdi-menu"></v-icon>
      </template>
    </v-btn>
    <v-navigation-drawer :mobile-breakpoint="'sm'" :model-value="menu" class="bg-deep-purple">
      <v-list>
        <v-list-item>
          <div class="flex justify-between gap-4">
            <LangSwitcher />

            <v-btn color="primary" :icon="true" :rounded="'true'" :size="'small'" class="d-md-none" @click="menu = false">
              <template v-slot:prepend>
                <v-icon icon="mdi mdi-window-close"></v-icon>
              </template>
            </v-btn>
          </div>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list color="transparent">
        <v-list-item v-for="item in getMenuList" :key="item.to"
          :variant="route.path === localePath(item.to) ? 'tonal' : 'text'">
          <v-btn :to="localePath(item.to)" :variant="'plain'" :ripple="false" :min-width="'100%'"
            class="!justify-start">{{ $t(item.text) }}</v-btn>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logOut">
            <template v-slot:prepend>
              <v-icon icon="mdi mdi-logout"></v-icon>
            </template>
            <span>{{ $t('commands.logout') }}</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const { signOut } = useAuth()
const route = useRoute()
const { data } = useAuth()

const menu = ref(true)

const getMenuList = computed(() => {
  return ADMIN_MENUS.filter((m) => crossValArr(m.roles, data.value?.authorities || []))
})

function logOut() {
  signOut({ callbackUrl: localePath('/auth/login') })
}
</script>

<style lang="scss" scoped></style>