<template>
  <v-app-bar height="55" elevation="0" absolute>
    <router-link class="ml-10" to="/"
      ><v-img src="../assets/logo.svg" width="100" class="ma-3 mr-5"></v-img>
    </router-link>
    <template v-slot:append>
      <v-tabs color="primary">
        <v-tab exact router to="/">
          Home
        </v-tab>
        <v-tab router to="#">
          My Blogs
        </v-tab>
        <v-tab router to="#">
          My Faves
        </v-tab>
        <v-btn variant="flat" color="secondary" class="mt-2">
          Login/Signup
        </v-btn>
      </v-tabs>
      <v-avatar color="surface-variant" size="35" class="mr-5"></v-avatar>
    </template>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
export default {};
</script>

<style>
.v-tab {
  text-transform: none !important;
}
</style>
