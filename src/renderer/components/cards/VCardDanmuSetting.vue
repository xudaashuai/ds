<template>
  <el-card class="box-card">
    <div slot="header">
      <span class="header">弹幕设置</span>
    </div>
    <div>
      <el-form ref="form" label-width="120px">
        <el-form-item label="弹幕悬停"><el-switch
            v-model="form.show"
            active-text="开启"
            inactive-text="关闭" @change="change">
        </el-switch>
        </el-form-item>
        <el-form-item label="弹幕字体颜色">
          <el-color-picker v-model="form.color" @change="change"></el-color-picker>
        </el-form-item>
        <el-form-item label="弹幕背景颜色">
          <el-color-picker v-model="form.bgcolor" @change="change"></el-color-picker>
        </el-form-item>
        <el-form-item label="弹幕透明度">
          <el-slider show-tooltip v-model="form.alpha" :max="1" :min="0" :step="0.01" @change="change"></el-slider>
        </el-form-item>
        <el-form-item label="弹幕字体大小">
          <el-slider v-model="form.size" :max="400" :min="12" :step="1" @change="change"></el-slider>
        </el-form-item>
        <el-form-item label="弹幕悬停"><el-switch
            v-model="form.hover"
            active-text="鼠标悬停弹幕静止"
            inactive-text="无效果" @change="change">
        </el-switch>
        </el-form-item>
        <el-form-item label="进入房间提示"><el-switch
            v-model="form.enterTip"
            active-text="有哦"
            inactive-text="没有哦" @change="change">
        </el-switch>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  const danmuSetting =  require('electron').remote.getGlobal('shared').danmuSetting
  export default {
    name: "v-card-danmu-setting",
    data() {
      return {
        form: {
          alpha:0.5,
          color:'#ffffff',
          bgcolor:'#222222',
          size:24,
      hover:false,
          enterTip:true
        }
      }
    },
    mounted() {
      console.log()
      this.form = {...danmuSetting}
    },
    methods:{
      change(){
        for(let k in danmuSetting){
          danmuSetting[k]=this.form[k]
        }
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
