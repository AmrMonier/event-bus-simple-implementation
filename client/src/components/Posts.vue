<template>
    <div class="container d-flex flex-row flex-wrap" id="posts">
        <div class="card m-2" v-for="p in posts">

            <div class="card-body">
                <h5 class="card-title">{{ p.title }}</h5>
                <p class="card-text">
                <ul>
                    <li v-for="c in p.comments"> {{ c }}</li>
                </ul>
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            posts: [{
                id: 1,
                title: 'Post Title',
                comments: [1, 2, 3, 4, 6, 7, 8]
            }
            ]
        }
    }
})
</script>

<style scoped>

</style>