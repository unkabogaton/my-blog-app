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
    <div class="text-center mt-10" v-if="loading.data == true">
      <v-progress-circular
        indeterminate
        color="primary"
        :size="90"
        :width="10"
      ></v-progress-circular>
    </div>
    <div v-else-if="blogs.length == 0" class="mt-10 text-center text-h5">
      No blogs yet
    </div>
    <div v-else>
      <v-card
        v-for="blog in blogs"
        :key="blog.id"
        class="my-2 px-4"
        elevation="2"
      >
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
          <v-col cols="2" class="text-caption">
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
          <v-col cols="2">
            <v-row class="ma-2">
              <v-btn variant="flat" color="info" block size="small"
                >Edit</v-btn
              ></v-row
            >
            <v-row class="ma-2"
              ><v-btn
                variant="flat"
                color="error"
                block
                size="small"
                @click="
                  blogParams.title = blog.blogData.title;
                  blogParams.id = blog.id;
                  dialog.delete = true;
                "
                >Delete</v-btn
              ></v-row
            ></v-col
          >
        </v-row>
      </v-card>
    </div>
    <!-- Dialog Boxes -->

    <v-dialog v-model="dialog.delete">
      <v-card class="mx-auto pa-7 mt-10" max-width="500" elevation="10">
        <div class="text-h5 font-weight-bold text-secondary">Delete Blog</div>
        <v-card flat height="2" color="primary" class=""></v-card>
        <div class="text-body-1 my-6">
          Are you sure you like to delete the blog titled
          <strong>{{ blogParams.title }}</strong
          >. This will not be undone.
        </div>
        <v-card-actions>
          <v-btn
            color="main"
            class="mr-auto"
            @click.prevent="dialog.delete = false"
            :loading="loading"
            >Cancel</v-btn
          >
          <v-btn
            variant="flat"
            color="error"
            class="ml-auto"
            @click.prevent="deleteBlog"
            :loading="loading.button"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const blogs = ref([]);

const blogParams = ref({
  id: "",
  title: ""
});

const dialog = ref({
  delete: false
});

const loading = ref({
  button: false,
  data: false
});

onMounted(async () => {
  fetchBlog();
});

async function deleteBlog() {
  loading.value.button = true;
  await deleteDoc(doc(db, "blogs", blogParams.value.id));
  loading.value.button = false;
  fetchBlog();
  alert("Deleted");
}

async function fetchBlog() {
  loading.value.data = true;
  blogs.value = [];
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
  loading.value.data = false;
}
</script>

<style></style>
