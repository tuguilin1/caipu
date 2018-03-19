<template>
  <div id="app">
  	<keep-alive>
      <router-view></router-view>
     </keep-alive>
  </div>
</template>

<script>
import Banner from "@/components/banner"
export default {
  components:{
    Banner
  }
}
</script>

<style>
</style>
