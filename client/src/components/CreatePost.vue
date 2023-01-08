<template>
  <div id="create_post" class="card p-3">
    <form v-on:submit="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">Create Post</label>
        <input
          id="title"
          type="text"
          class="form-control"
          v-model="title"
          placeholder="Post Title..."
        />
      </div>
      <button type="submit" class="btn btn-outline-primary">Create</button>
    </form>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      title: "",
    };
  },
  methods: {
    async submitForm(e: any) {
      console.log(this.title);
      e.preventDefault();
      try {
        const { data } = await axios.post("http://posts.com/posts/create", {
          title: this.title,
        });
        console.log(data);
      } catch (error) {
        window.alert("Something went wrong, couldn't create the post");
      }

      this.title = "";
    },
  },
});
</script>
<style scoped>
.form-label {
  color: #000;
}
</style>
