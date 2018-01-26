<template>
    <div class="book">
        <h3>最近文章：</h3>
        <ul class="bookLits">
            <li><a href="#">1.</a></li>
            <li><a href="#">2.</a></li>
            <li><a href="#">3.</a></li>
            <li><a href="#">4.</a></li>
            <li><a href="#">5.</a></li>
            <li><a href="#">6.</a></li>
            <li><a href="#">7.</a></li>
            <li><a href="#">8.</a></li>
            <li><a href="#">9.</a></li>
        </ul>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
    .book {
        font-size: 16px;
        padding: 80px;
    }
    
    .bookLits {
        padding: 20px 0 0 20px;
    }

    .bookLits li{
        height: 40px;
        text-decoration: underline;
    }
</style>
