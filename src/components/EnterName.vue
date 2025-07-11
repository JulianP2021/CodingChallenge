<template>
    <div>
        <p>Your score: {{ score }}</p>
        <form @submit.prevent="submitName">
            <input v-model="name" type="text" placeholder="Enter your name" required />
            <br>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref, defineProps } from 'vue';


interface Props {
    score: string;
}

const { score = "0" } = defineProps<Props>();
const name = ref('');

function submitName() {

    console.log(`Name: ${name.value}, Score: ${score}`);
    const leaderboard: { name: string, score: number }[] | null = JSON.parse(localStorage.getItem("leaderboard"))
    if (leaderboard == null) {
        localStorage.setItem("leaderboard", JSON.stringify([{ name: name.value, score: score }]));

        return;
    }
    let added = false
    leaderboard.map((acc) => {
        if (acc.name == name.value) {
            acc.score = Math.max(acc.score, parseInt(score));
            added = true
            return acc;
        }
        return acc;
    })
    if (!added) {
        leaderboard.push({ name: name.value, score: parseInt(score) })
    }
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    name.value = "";
    router.push("/")
}
</script>