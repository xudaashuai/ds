<template>
  <div class="main">
    <el-button class="button" type="primary" @click="$router.push('/new')">新建房间</el-button>
    <el-button class="button" type="success" @click="$router.push('/enter')">进入房间</el-button>
  </div>
</template>

<script>
  export default {
    name: "v-start-page"
  }
</script>

<style scoped>

  .main {
    display: flex;
    height: 100%;
    margin: 0;
    align-items: center;
  }

  .button {
    flex-grow: 1;
    height: 50%;
    margin: 5%;
    border-radius: 5%;
    box-shadow: 0 0 20px 0 #444444;
    font-size: 64px;
    font-family: Helvetica,serif;
  }
</style>
