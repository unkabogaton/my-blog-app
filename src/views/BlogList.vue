<template>
  <v-container>
    <div class="text-h4 font-weight-bold text-secondary">Manage Blogs</div>
    <v-card flat height="2" color="primary" class="mb-6"></v-card>
    <v-row>
      <v-col cols="10">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          density="compact"
          required
        ></v-text-field> </v-col
      ><v-col cols="2"
        ><v-btn variant="flat" color="primary" :to="{ name: 'Create' }">
          Publish Blog
        </v-btn></v-col
      >
    </v-row>

    <v-card v-for="blog in blogs" :key="blog.id" class="my-2" elevation="2">
      <v-row align="center" justify="center">
        <v-col cols="2"
          ><v-img height="50" :src="blog.blogData.photoLink"></v-img
        ></v-col>
        <v-col cols="4" class="my-3">
          <v-chip
            variant="flat"
            color="secondary"
            size="x-small"
            v-for="(category, i) in blog.blogData.categories"
            :key="i"
            label
            class="mr-1"
          >
            {{ category }}
          </v-chip>
          <div class="text-subtitle font-weight-bold">
            {{ blog.blogData.title }}
          </div>
        </v-col>
        <v-col cols="2">
          <div class="font-weight-medium text-caption">
            <span class="font-weight-light">Created: </span>
            {{
              new Date(blog.blogData.dateCreated).toString().split(" GMT")[0]
            }}
          </div>
          <div
            class="font-weight-medium text-caption"
            v-if="blog.blogData.dateUpdated"
          >
            <span class="font-weight-light">Created: </span
            >{{
              new Date(blog.blogData.dateUpdated).toString().split(" GMT")[0]
            }}
          </div>
        </v-col>
        <v-col cols="3" class="text-caption">
          BY:
          <v-chip
            v-for="(author, i) in blog.blogData.author"
            :key="i"
            class="ma-1"
            size="small"
          >
            <span> {{ author.firstname }} {{ author.surname }}</span>
            <template v-slot:prepend>
              <v-avatar color="primary" start>{{
                author.initials
              }}</v-avatar></template
            >
          </v-chip></v-col
        >
        <v-col cols="1">
          <v-row class="ma-2">
            <v-btn variant="flat" color="info" block size="small"
              >Edit</v-btn
            ></v-row
          >
          <v-row class="ma-2"
            ><v-btn variant="flat" color="error" block size="small"
              >Delete</v-btn
            ></v-row
          ></v-col
        >
      </v-row>
    </v-card>
  </v-container></template
>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const blogs = ref([]);

onMounted(async () => {
  const uid = sessionStorage.getItem("uid");
  const q = query(
    collection(db, "blogs"),
    where("authorId", "array-contains", uid)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const data = {
      id: doc.id,
      blogData: doc.data()
    };
    blogs.value.push(data);
  });
});
</script>

<style></style>
