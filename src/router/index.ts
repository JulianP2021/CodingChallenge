import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/LandingPage.vue'),
    },
    {
      path: '/challenge',
      component: () => import('../components/ChallengesPage.vue'),

      props: { id: "0", score: "0" }
    },
    {
      path: '/challenge/:id',
      component: () => import('../components/ChallengesPage.vue'),

      props: route => ({
        id: route.params.id,
        score: "0"
      })
    },
    {
      path: '/challenge/:id/:score',
      component: () => import('../components/ChallengesPage.vue'),
      props: true
    },
    {
      path: '/result/:score',
      component: () => import('../components/EnterName.vue'),
      props: true
    },
  ],
})

export default router
