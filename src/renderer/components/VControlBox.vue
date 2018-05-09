<template>
  <div class="control-box">
    <el-button type="success" size="mini" icon="el-icon-arrow-left" @click="goBack" circle></el-button>
    <el-button :type="danmuState?'primary':'info'" v-if="$route.name === 'r' "
              size="mini" circle style="padding: 6px;color: white" @click="danmuClick">
      <img v-if="!danmuState" src="../assets/icon/danmu-close.svg" width="24" height="24">
      <img v-else src="../assets/icon/danmu-open.svg" width="24" height="24">
    </el-button>
    <el-button type="primary" size="mini" icon="el-icon-minus" @click="mini" circle></el-button>
    <el-button type="info"
               id="drag" size="mini" icon="el-icon-rank" circle>
    </el-button>
    <el-button type="danger" size="mini" icon="el-icon-close" @click="close" circle></el-button>
  </div>
</template>

<script>
  const ipc = require('electron').ipcRenderer;
  import {mapState} from 'vuex'

  export default {
    name: "v-control-box",
    data() {
      return {
        danmuOpen: true
      }
    },
    computed: {
      ...mapState(['danmuState'])
    },
    methods: {
      close() {
        ipc.send('c', {
          type: 'close'
        })
      },
      mini() {
        ipc.send('c', {
          type: 'mini'
        })
      },
      goBack() {
        this.$router.back()
      },
      danmuClick() {
        this.$store.dispatch('danmuSwitch')
      }
    },
  }
</script>

<style scoped>
  .control-box {
    position: fixed;
    display: flex;
    top: 5px;
    right: 5px;

    justify-content: space-between;
    z-index: 9999;
  }

  div {
    margin: 0;
  }

  #drag {
    -webkit-app-region: drag;
  }

  button {

    box-shadow: 0 0 6px 0px #888888;
  }
</style>
