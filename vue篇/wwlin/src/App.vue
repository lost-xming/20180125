<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix { 
    *zoom: 1; 
} 

.clearfix:before, 
.clearfix:after { 
    display: table; 
    line-height: 0; 
    content: ""; 
} 

.clearfix:after { 
    clear: both; 
} 
</style>
