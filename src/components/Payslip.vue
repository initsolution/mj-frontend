<template>
  <v-app>
    <v-row justify="center">
      <v-date-picker v-model="date"></v-date-picker>
    </v-row>
    <v-row justify="center">
      <div class="black--text">
        Start
        <strong></strong>
      </div>
      <div class="black--text">
        <strong>-</strong>
      </div>
      <div class="black--text">
        END
        <strong></strong>
      </div>
    </v-row>
  </v-app>
</template>
    
<script>
export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
};
</script>
    
    <style>
</style>