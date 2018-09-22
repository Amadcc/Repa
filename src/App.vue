<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      miniVariant: true,
      title: 'Restaurant'
    }
  },
  name: 'App'
}
</script>

<style scoped>
  .list-items {
  color: black;
  font-size: 18px;
  font-family: "HelveticaNeueCyr";
  margin-top: 3%;
  }
  
</style>

