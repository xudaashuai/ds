<template>
  <div class="main">
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo menu" @select="jump">
      <template v-for="item,index in cards">
        <el-menu-item :index="index.toString()">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="content" id="content">
      <template v-for="item,index in cards">
        <v-card :n="item.component" class="jump-target" :level="1">
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  const ipc = require('electron').ipcRenderer
  const remote = require('electron').remote
  export default {
    name: "v-room-admin-page",
    data() {
      return {
        cards: [{
          name: '房间信息',
          component: 'v-card-room-info'
        },{
          name: '弹幕设置',
          component: 'v-card-danmu-setting'
        },{
          name: '发送弹幕',
          component: 'v-card-danmu-send'
        }],
        contentElement: null,
        danmuWindow: null
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => this.contentElement = document.querySelector('#content'))
      this.room = JSON.parse(localStorage.getItem('room'))
      console.log(this.room)
      this.$store.dispatch('danmu',{type: 'start', id: this.room.id})
    },
    computed: {
      cardElements() {
        return document.querySelectorAll('.jump-target')
      },
    },
    methods: {
      jump(index) {
// 获取需要滚动的距离
        let total = this.cardElements[index].offsetTop
        this.contentElement.scrollTop = total
      }
    }
  }
</script>

<style scoped>
  .main {
    display: flex;
    height: 100%;
  }

  .menu {
    width: 200px;
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
  }

  .content {
    flex-grow: 1;
    overflow: auto;
    padding: 10px;
  }

  .content > * {
    margin: 10px 0;
  }
</style>
