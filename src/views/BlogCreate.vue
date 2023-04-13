<template>
  <div class="text-center mt-15" v-if="loading.uploadBlog == true">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="150"
      :width="10"
    ></v-progress-circular>
  </div>
  <v-form ref="form" v-else>
    <v-app-bar
      :image="photoInitial"
      color="secondary"
      absolute
      height="400"
      flat
    >
      <div class="mx-auto" v-if="photoInitial == ''">
        <v-btn
          variant="elevated"
          color="main"
          size="small"
          class="mr-1"
          @click.prevent="uploadPhoto"
          >Upload</v-btn
        >
        or
        <v-btn
          variant="elevated"
          color="main"
          size="small"
          class="ml-1"
          @click.prevent="dialog.link = true"
          >Insert Link</v-btn
        >
      </div>
      <div class="mx-auto" v-else>
        <v-btn
          variant="elevated"
          size="small"
          color="error"
          @click="removePhoto"
          >Remove</v-btn
        >
      </div>
      <template v-slot:extension v-if="photoInitial == ''"
        ><div class="text-h2 text-white mb-15 mx-auto">
          Cover Photo: 1280px X 400px
        </div>
      </template>
    </v-app-bar>
    <input
      type="file"
      ref="photoInitialRef"
      id="photoInitial"
      accept=".png,.jpg,.jpeg"
      style="visibility: hidden"
      @change="fileChange"
    />
    <v-dialog v-model="dialog.link" persistent>
      <v-card class="pa-7 mx-auto" min-width="400"
        ><div class="text-h6 text-center mb-5">Insert Image Link</div>
        <v-textarea
          class=""
          density="compact"
          v-model.trim="photoInitialLink"
          :rules="rules"
        ></v-textarea>
        <v-card-actions
          ><v-btn
            color="primary"
            class="ml-auto"
            @click.prevent="
              photoInitial = photoInitialLink;
              dialog.link = false;
            "
            :disabled="photoInitialLink == ''"
            >Confirm</v-btn
          ><v-btn color="secondary" @click.stop="dialog.link = false"
            >Cancel</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
    <v-container>
      <v-select
        :items="categories"
        density="compact"
        label="Category"
        v-model="blogData.categories"
        multiple
        required
        :rules="rules"
      ></v-select>
      <v-text-field
        class="title"
        label="Title"
        density="compact"
        required
        :rules="rules"
        v-model.trim="blogData.title"
      ></v-text-field>
      <v-text-field
        class="subtitle"
        label="Subtitle (optional)"
        density="compact"
        v-model.trim="blogData.subtitle"
      ></v-text-field>
      <v-select
        :items="['Me only', 'Me and Others']"
        density="compact"
        label="Authorship"
        v-model="authorship"
      ></v-select>
      <div class="mb-4">
        <v-chip
          v-for="(author, i) in blogData.author"
          :key="i"
          :closable="i != 0"
          @click:close="
            blogData.author.slice(i, 1);
            blogData.authorId.slice(i, 1);
          "
          class="mr-2"
        >
          <span class="ml-2">{{ author.firstname }} {{ author.surname }}</span>
          <template v-slot:prepend>
            <v-avatar color="primary" start>{{
              author.initials
            }}</v-avatar></template
          >
        </v-chip>
      </div>
      <div v-if="authorship == 'Me and Others'">
        <v-row
          ><v-col cols="4">
            <div class="mt-2">
              Please provide the exact email of additional authors:
            </div></v-col
          ><v-col cols="4">
            <v-text-field
              placeholder="Email of Additional Author"
              density="compact"
              required
              v-model.trim="email"
            ></v-text-field
          ></v-col>
          <v-col cols="1">
            <v-btn
              variant="flat"
              color="success"
              block
              @click.prevent="addAuthor"
            >
              ADD
            </v-btn></v-col
          ></v-row
        >
      </div>
      <div>Write the blog content below:</div>
      <QuillEditor
        contentType="html"
        theme="snow"
        v-model:content="blogData.content"
        placeholder="Content"
        required
        :rules="rules"
      />
      <div class="my-10">
        <v-btn @click="addBlog" color="primary">Publish Blog</v-btn>
      </div>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:actions>
        <v-btn color="primary" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, onMounted, watchEffect } from "vue";
import { db } from "@/firebase";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();

// reactive data
const blogData = ref({
  author: [],
  authorId: [],
  categories: [],
  content: "",
  dateCreated: Date.now(),
  photoLink: "",
  status: "for approval",
  subtitle: "",
  title: "",
  titleLowcase: "",
  searchKeywords: []
});
const loading = ref({
  uploadBlog: false
});
const dialog = ref({
  link: false
});
const categories = ref([
  "Technology",
  "Management",
  "Archives",
  "Collection",
  "Reading",
  "Professionals"
]);
const user = ref({});
const photoInitial = ref("");
const photoFile = ref(null);
const photoInitialRef = ref("");
const photoInitialLink = ref("");
const authorship = ref("Me only");
const email = ref("");
const userId = ref("");
const rules = ref([v => !!v || "Item is required"]);
const form = ref("");
const snackbar = ref(false);
const text = ref("");

// display
onMounted(async () => {
  userId.value = sessionStorage.getItem("uid");
  const docRef = doc(db, "users", userId.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    user.value = docSnap.data();
  } else {
    alert("No such document!");
  }
});

watchEffect(() => {
  if (authorship.value == "Me only") {
    blogData.value.author = [
      {
        firstname: user.value.firstname,
        surname: user.value.surname,
        initials: user.value.initials
      }
    ];
    blogData.value.authorId = [userId.value];
  }
});

// functions
async function addAuthor() {
  if (email.value == "") {
    text.value = "Please provide email";
    snackbar.value = true;
    return;
  }
  const q = query(collection(db, "users"), where("email", "==", email.value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    if (!blogData.value.authorId.includes(doc.id)) {
      blogData.value.author.push({
        firstname: doc.data().firstname,
        surname: doc.data().surname,
        initials: doc.data().initials
      });
      blogData.value.authorId.push(doc.id);
      alert("Author Added");
    } else {
      alert("Author Already Added");
    }
  });
  email.value = "";
}

function uploadPhoto() {
  photoInitialRef.value.click();
}

function fileChange() {
  photoFile.value = photoInitialRef.value.files[0];
  photoInitial.value = URL.createObjectURL(photoFile.value);
}

function removePhoto() {
  photoFile.value = null;
  photoInitial.value = "";
  photoInitialLink.value = "";
}

async function addBlog() {
  const { valid } = await form.value.validate();
  if (!valid) {
    text.value = "Please fill the required fields";
    snackbar.value = true;
    return;
  }
  if (!photoInitial.value) {
    text.value = "Please upload a photo";
    snackbar.value = true;
    return;
  }
  if (!blogData.value.content) {
    text.value = "Please provide content";
    snackbar.value = true;
    return;
  }
  loading.value.uploadBlog = true;
  blogData.value.titleLowcase = blogData.value.title.toLowerCase();
  blogData.value.searchKeywords = blogData.value.titleLowcase
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ");
  blogData.value.photoLink = photoInitial.value;
  const blog = doc(collection(db, "blogs"));
  await setDoc(blog, blogData.value);
  loading.value.uploadBlog = false;
  text.value = "Successfully added";
  snackbar.value = true;
  router.push({ name: "MyBlogs" });
}
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
