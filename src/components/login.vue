<template>
  <v-layout row justify-center>
      <v-card>
        <v-card-title style="justify-content: center;">
          <h1 class="header">LOGIN</h1>
        </v-card-title>
        <v-divider style="margin-top: -3%;"></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions style="justify-content: center;">
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Login</v-btn>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>
.header {
  font-size: 24px!important;
  line-height: 32px!important;
  font-family: "HelveticaNeueCyr";
}

.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0px; 
    margin-left: 0px; 
    margin-top: 10%;
}
</style>
