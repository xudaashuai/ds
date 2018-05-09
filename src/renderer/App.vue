<template>
  <div class="container">
    <v-control-box></v-control-box>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import VControlBox from "./components/VControlBox";
  import {ipcRenderer} from 'electron'

  export default {
    components: {
      VControlBox,
    },
    name: "app",
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    created() {
      this.$store.dispatch('init')
    }
  }
</script>

<style scoped>
  .container {
    height: 100%;
    margin: 0;
    overflow: auto;
  }

  .child-view {
    position: absolute;
    width: 100%;
    transition: all .8s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
