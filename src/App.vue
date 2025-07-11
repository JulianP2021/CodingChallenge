<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView :key="$route.path" />
</template>

<style>
button {
    padding: 14px 36px;
    font-size: 1.1rem;
    color: #fff;
    background: #3a86ff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
}

button:hover {
    background: #265d97;
}
</style>
