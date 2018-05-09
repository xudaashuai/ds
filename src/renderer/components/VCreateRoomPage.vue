<template>
  <div class="main">
    <el-card class="box-card" v-loading="loading">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间名称" prop="name" :rules="[{required: true, message: '请填写房间名称', trigger: 'change' }]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="主办方" prop="user" :rules="[{required: true, message: '请填写主办方', trigger: 'change' }]">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="活动地点" prop="address" :rules="[{required: true, message: '请填写活动地点', trigger: 'change' }]">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="管理密码" :rules="[{required: true, message: '请填写活动地点', trigger: 'change' }]">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="time"
                      :rules="[{ type: 'array', required: true, message: '请选择活动时间', trigger: 'change' }]">
          <el-date-picker
              v-model="form.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit('form')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import IO from 'socket.io-client'

  export default {
    name: "v-create-room-page",
    data() {
      return {
        form: {
          name: '',
          time: null,
          address: '',
          desc: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      onSubmit(formName) {
        console.log('submit!');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            setTimeout(() => {
              let message = this.$message({
                showClose: true,
                duration: 0,
                message: '正在创建'
              });
              this.$http.post('room', {
                ...this.form
              }).then((response) => {
                let d = response.data
                if (d.status) {
                  this.loading = false
                  this.$store.commit('set', {room: {...this.form, id: d.id}})
                  localStorage.setItem('room', JSON.stringify({...this.form, id: d.id}))
                  message.close()
                  this.$router.push('room')
                  this.$message.success('ojbk')
                } else {
                  this.$message.error(d.msg)
                }
              }).catch(function (error) {
                console.log(error);
              });
            });
          } else {
            this.$message({
              message: '请填写信息',
              type: 'error'
            });
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
  .box-card {
    margin: 50px;
    flex-grow: 1;
    padding: 10px;
  }

  .main {
    overflow: auto;
    display: flex;
    height: 100%;
    align-items: center;
  }

  .line {
    text-align: center;
  }
</style>
