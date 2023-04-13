<template>
  <v-container>
    <v-card class="mx-auto pa-7 mt-10" max-width="500" elevation="10">
      <div class="text-h5 font-weight-bold text-secondary">Sign Up</div>
      <v-card flat height="2" color="primary" class="mb-6"></v-card>
      <div class="mb-2 text-subtitle-2">
        Already have an account?
        <router-link :to="{ name: 'Login' }">Login</router-link>
      </div>
      <v-text-field
        label="First Name"
        density="compact"
        required
        v-model.trim="user.firstname"
      ></v-text-field>
      <v-text-field
        label="Last Name"
        density="compact"
        required
        v-model.trim="user.surname"
      ></v-text-field>
      <v-text-field
        label="Email"
        density="compact"
        required
        v-model.trim="user.email"
      ></v-text-field>
      <v-text-field
        label="Password"
        density="compact"
        required
        type="password"
        v-model="password"
      ></v-text-field>
      <v-card-actions>
        <v-btn
          variant="flat"
          color="primary"
          class="ml-auto"
          @click.prevent="signup"
          :loading="loading"
          >Sign Up</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

const password = ref("");

const user = ref({
  firstname: "",
  surname: "",
  email: "",
  role: "writer",
  initials: "",
  dateCreated: Date.now()
});

const loading = ref(false);

function signup() {
  loading.value = true;
  const email = user.value.email;
  const auth = getAuth();
  user.value.initials =
    user.value.firstname.charAt(0) + user.value.surname.charAt(0);
  createUserWithEmailAndPassword(auth, email, password.value)
    .then(async userCredential => {
      // Signed in
      const token = userCredential.user;
      console.log(token.uid);
      await setDoc(doc(db, "users", token.uid), user.value);
      loading.value = false;
      router.push({ name: "Home" });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      loading.value = false;
    });
}
</script>

<style></style>
