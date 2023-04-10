<template>
  <v-app-bar height="55" elevation="0" absolute>
    <router-link class="ml-10" :to="{ name: 'Home' }"
      ><v-img src="../assets/logo.svg" width="100" class="ma-3 mr-5"></v-img>
    </router-link>
    <template v-slot:append>
      <v-tabs color="primary" class="mr-7">
        <v-tab exact router :to="{ name: 'Home' }" v-if="loggedin == true">
          Home
        </v-tab>
        <v-tab router :to="{ name: 'MyBlogs' }" v-if="loggedin == true">
          My Blogs
        </v-tab>
        <!-- <v-tab router to="#">
          My Faves
        </v-tab> -->
        <v-btn
          variant="flat"
          color="secondary"
          class="mt-2"
          v-if="loggedin == false"
          :to="{ name: 'Login' }"
        >
          Login/Signup
        </v-btn>
      </v-tabs>
      <v-btn
        variant="outlined"
        color="secondary"
        class="mt-1 mr-4"
        size="small"
        v-if="loggedin == true"
        @click="logout"
      >
        Logout
      </v-btn>
      <v-avatar
        color="surface-variant"
        size="35"
        class="mr-5"
        v-if="loggedin == true"
      ></v-avatar>
    </template>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import { ref } from "vue";

const loggedin = ref(false);
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, user => {
  if (user) {
    loggedin.value = true;
    // ...
  } else {
    loggedin.value = false;
  }
});

function logout() {
  signOut(auth)
    .then(() => {
      alert("Signed out successfully!");
    })
    .catch(error => {
      alert(error);
    });
}
</script>

<style>
.v-tab {
  text-transform: none !important;
}
</style>
