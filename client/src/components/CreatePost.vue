<template>
    <div id="create_post" class="card p-3">
        <form v-on:submit="submitForm">
            <div class="mb-3">
                <label for="title" class="form-label">Create Post</label>
                <input id="title" type="text" class="form-control" v-model="title" placeholder="Post Title...">
            </div>
            <button type="submit" class="btn btn-outline-primary">Create </button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            title: ''
        }
    },
    methods: {
        submitForm(e: any) {
            e.preventDefault()
            console.log('submitted', this.title)
            this.title = ''
        }
    }
})
</script>
<style scoped>
.form-label {
    color: #000;
}
</style>