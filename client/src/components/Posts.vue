<template>
  <div class="container d-flex flex-column flex-wrap" id="posts">
    <div class="card m-2" v-for="p in posts" :key="p.id">
      <div class="card-body">
        <h5 class="card-title">{{ p.title }}</h5>
        <div class="card-text">
          <ul>
            <li v-for="c in p.comments" :key="c.id">
              {{
                c.status === "approved"
                  ? c.content
                  : c.status === "pending"
                    ? "comment waiting for moderation"
                    : "comment rejected"
              }}
            </li>
          </ul>
          <form v-on:submit.prevent="createComment(p)" :key="p.id">
            <div class="">
              <input type="text" class="form-control d-inline-block m-2 w-50" v-model="p.comment_content"
                placeholder="Comment..." />
              <button type="submit" class="btn btn-outline-success">
                Create Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface IPost {
  id: string;
  title: string;
  comment_content: string;
  comments: {
    id: string;
    content: string;
    status: string;
  }[];
}
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "posts-list",
  data() {
    return {
      posts: [] as IPost[],
      content: "",
    };
  },
  methods: {
    async getPosts() {
      const { data } = await axios.get("http://posts.com/posts");
      this.posts = data;
    },
    async createComment(post: any) {
      console.log(post);

      const { data } = await axios.post(
        `http://posts.com/posts/${post.id}/comments`,
        {
          post_id: post.id,
          content: post.comment_content,
        }
      );
      console.log(data);
      console.log(
        data[0].status === "approved"
          ? data[0].content
          : data[0].status === "pending"
            ? "comment waiting for moderation"
            : "comment rejected"
      );
      post.comments = data;
      post.comment_content = "";
    },
  },
  async mounted() {
    await this.getPosts();
  },
});
</script>

<style scoped>
.card {
  color: black;
}
</style>
