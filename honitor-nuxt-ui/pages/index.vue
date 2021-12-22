<template>
  <v-row justify="center" class="main-container">
    <div 
      max-height="600"
      class="main-title-image"
    >
    </div>
    <div class="main-content">
      dd
      <v-progress-linear
        background-color="blue-grey"
        indeterminate
        height="3"
        rounded
        style="width:200px;"
      ></v-progress-linear>
      <!-- <my-symbol/> -->
    </div>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      loading:true,
    }
  },
  
}
</script>