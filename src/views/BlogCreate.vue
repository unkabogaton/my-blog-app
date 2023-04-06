<template>
  <v-app-bar
    :image="blogData.photoLink"
    color="secondary"
    absolute
    height="400"
    flat
    class=""
  >
    <v-btn variant="elevated" color="main" size="small" class="ml-auto mr-1"
      >Upload</v-btn
    >
    or
    <v-btn variant="elevated" color="main" size="small" class="mr-auto ml-1"
      >Insert Link</v-btn
    >
  </v-app-bar>
  <v-container>
    <v-select></v-select>
    <v-text-field
      class="title"
      label="Title"
      density="compact"
      required
      v-model="blogData.title"
    ></v-text-field>
    <v-text-field
      class="subtitle"
      label="Subtitle (optional)"
      density="compact"
      v-model="blogData.subtitle"
    ></v-text-field>
    <QuillEditor
      contentType="html"
      theme="snow"
      v-model:content="blogData.content"
      placeholder="Content"
    />
    <v-btn @click="increment">Publish Blog</v-btn>
    <v-btn router :to="{ name: 'Home' }">Preview Blog</v-btn>
    >
  </v-container>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, onMounted } from "vue";

// reactive data
const initialPhoto = ref("");
const blogData = ref({
  author: "",
  category: "",
  content: "",
  dateCreated: "",
  dateUpdated: "",
  photoLink: "",
  status: "for approval",
  subtitle: "",
  title: ""
});

// display
onMounted(() => {
  console.log(blogData.value);
});

// functions
// function uploadBlog() {}
</script>

<style>
.title input {
  font-size: 3rem !important;
  font-weight: 400;
}
.subtitle input {
  font-size: 1.5rem !important;
  font-weight: 400;
}
</style>
