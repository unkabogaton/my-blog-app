<template>
  <v-container>
    <v-card class="mx-auto pa-7 mt-10" max-width="500" elevation="10">
      <div class="text-h5 font-weight-bold text-secondary">Login</div>
      <v-card flat height="2" color="primary" class="mb-6"></v-card>
      <v-text-field
        label="Email"
        density="compact"
        required
        v-model="user.email"
      ></v-text-field>
      <v-text-field
        label="Password"
        density="compact"
        required
        type="password"
        v-model="user.password"
      ></v-text-field>
      <v-card-actions>
        <v-btn
          variant="flat"
          color="primary"
          class="ml-auto"
          @click.prevent="login"
          :loading="loading"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const user = ref({ email: "", password: "" });
const loading = ref(false);
const auth = getAuth();

function login() {
  loading.value = true;
  console.log(user.value.email, user.value.password);
  signInWithEmailAndPassword(auth, user.value.email, user.value.password).catch(
    error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  );
  loading.value = false;
}
</script>

<style></style>
