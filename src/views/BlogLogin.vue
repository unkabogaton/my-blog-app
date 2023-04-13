<template>
  <v-container>
    <v-card class="mx-auto pa-7 mt-10" max-width="500" elevation="10">
      <div class="text-h5 font-weight-bold text-secondary">Login</div>
      <v-card flat height="2" color="primary" class="mb-6"></v-card>
      <div class="mb-2 text-subtitle-2">
        No account yet?
        <router-link :to="{ name: 'Signup' }">Sign Up</router-link>
      </div>
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
import { useRouter } from "vue-router";

const auth = getAuth();
const router = useRouter();

const user = ref({ email: "", password: "" });
const loading = ref(false);

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
  router.push({ name: "Home" });
  loading.value = false;
}
</script>

<style></style>
