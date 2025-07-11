<script setup lang="ts">
import { onMounted, ref } from 'vue';

const leaderboard = ref([]);

function start() {
  // Redirect to challenge page or trigger challenge logic
  window.location.href = "challenge";
}

onMounted(() => {
  leaderboard.value = JSON.parse(localStorage.getItem("leaderboard"))
});
</script>

<template>
  <div class="container">
    <h1>Welcome to the Coding Challenge!</h1>
    <p>Test your skills and start the challenge now.</p>
    <button @click="start">Start Challenge</button>
    <table class="leaderboard">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, idx) in leaderboard" :key="entry.name">
          <td>{{ idx + 1 }}</td>
          <td>{{ entry.name }}</td>
          <td>{{ entry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.leaderboard {
  width: 100%;
  margin: 32px auto 0 auto;
  border-collapse: collapse;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(58, 134, 255, 0.08);
}

.leaderboard th,
.leaderboard td {
  padding: 14px 18px;
  text-align: center;
}

.leaderboard th {
  background: #3a86ff;
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
}

.leaderboard tbody tr {
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.15s;
}

.leaderboard tbody tr:nth-child(even) {
  background: #eef2fb;
}

.leaderboard tbody tr:hover {
  background: #dbeafe;
}

.leaderboard td {
  color: #22223b;
  font-size: 1rem;
}

.container {
  text-align: center;
  background: #fff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-bottom: 16px;
  color: #22223b;
  font-size: 2.5rem;
}

p {
  margin-bottom: 32px;
  color: #4a4e69;
  font-size: 1.2rem;
}
</style>
