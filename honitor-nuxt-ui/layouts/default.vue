<template>
  <v-app>
    <v-app-bar
      fixed
      app
      elevate-on-scroll
      color="white"
      elevation="1"
    >
      <v-container>
        <v-row align="center" justify="center">
          <v-toolbar-title v-text="title" />
          <v-spacer />
          <v-btn
            icon
            @click.stop="rightDrawer = !rightDrawer"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container style="min-height:100vh;">
        <Nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      app
      absolute
    >
      <v-container>
        <v-row class="my-2" justify="center" align="center" no-gutters>
          <ul>
            <li><v-icon>mdi-facebook</v-icon></li>
            <li><v-icon>mdi-facebook</v-icon></li>
            <li><v-icon>mdi-facebook</v-icon></li>
          </ul>
        </v-row>
        <v-row class="my-2 text-caption" style="opacity:0.5" justify="center" align="center">
          Copyright © 박경호 {{ new Date().getFullYear() }}. All rights reserved.
        </v-row>
        <v-row class="my-4" justify="center" align="center" no-gutters>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      rightDrawer: false,
      title: 'GHistory'
    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
  }
}
</script>
