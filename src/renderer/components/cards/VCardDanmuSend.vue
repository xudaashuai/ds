<template>
  <el-card class="box-card">
    <div slot="header">
      <span class="header">发送弹幕</span>
    </div>
    <div>
      <el-form>
      <el-form-item>
      <el-input v-model="text" placeholder="输入弹幕内容"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="send">发送</el-button>
      </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "v-card-danmu-send",
    data() {
      return {
        text:''
      }
    },
    mounted() {
    },
    methods:{
      send(){
        this.$store.dispatch('danmu',{type:'msg',msg:this.text})
        this.text = ''
      }
    }
  }
</script>

<style scoped>
  .header {
    font-size: 24px;
    font-weight: bold;
  }
</style>
