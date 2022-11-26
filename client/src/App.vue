<script setup lang="ts">
import CreatePostVue from './components/CreatePost.vue';
import PostsVue from './components/Posts.vue';
</script>

<template>
  <header>


    <div class="wrapper">
      <CreatePostVue />
      <hr>
      <PostsVue />
    </div>
  </header>

  <main>

  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
</style>
