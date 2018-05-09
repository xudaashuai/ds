import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer, remote} from 'electron'
// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: {},
    otherId: 2,
    danmuState: true
  },
  getters: {
    danmuWindow(state) {
      return remote.BrowserWindow.fromId(state.otherId)
    }
  },
  mutations: {
    setRoom(state, room) {
      state.room = room
    },
    set(state, d) {
      for (let k in d) {
        state[k] = d[k];
      }
    },
  },
  actions: {
    init(context){
      ipcRenderer.send('id',(e,d)=>{
        console.log(e,d)
        context.commit('set',{otherId:d.danmu})
      })
    },
    danmu(context, data) {
      context.getters.danmuWindow.send(data.type, data)
    },
    ipcMain(context, data) {
      ipcRenderer.send(c, data)
    },
    danmuSwitch(context) {
      context.commit('set', {danmuState: !context.state.danmuState});
      console.log(context.state.danmuState)

      context.dispatch('danmu', {type: context.state.danmuState ? 'resume' : 'pause'})
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
