<template>
  <v-app-bar
    height="55"
    style="background: rgba(0, 0, 0, 0)"
    elevation="0"
    absolute
  >
    <v-tabs color="primary" class="ml-10">
      <router-link to="/"
        ><v-img src="../assets/logo.svg" width="100" class="ma-3 mr-5"></v-img>
      </router-link>
      <v-tab exact router to="#">
        Home
      </v-tab>
      <v-tab router to="#">
        My Blogs
      </v-tab>
      <v-tab>
        Login/Register
      </v-tab>
    </v-tabs>
    <template v-slot:append>
      <v-avatar color="surface-variant" size="35" class="mr-5"></v-avatar>
    </template>
  </v-app-bar>
  <v-container class="mt-15"><router-view /></v-container>
</template>

<script>
export default {};
</script>

<style>
.v-tab {
  text-transform: none !important;
}
</style>
