<template>
  <v-app>
    <v-main>
      <v-card
        class="mx-auto my-5 rounded"
        max-width="90%"
        outlined
      >
        <router-view/>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>