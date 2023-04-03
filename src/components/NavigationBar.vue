<template>
  <v-app-bar height="55" class="mb-5">
    <v-tabs class="mx-10">
      <v-tab exact><v-img src="../assets/logo.svg" width="100"></v-img> </v-tab>
      <v-tab exact>
        Home
      </v-tab>
    </v-tabs>
  </v-app-bar>
  <div class="mt-15"><router-view /></div>
</template>

<script>
export default {};
</script>

<style>
.v-tab {
  text-transform: none !important;
}
.v-toolbar {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
