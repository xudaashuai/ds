<template>
  <div class="main">
    <el-card class="box-card" v-loading="loading">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间ID" prop="id" :rules="[{required: true, message: '请填写房间ID', trigger: 'change' }]">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="管理密码" prop="password" :rules="[{required: true, message: '请输入密码', trigger: 'change' }]">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit('form')">进入房间</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import IO from 'socket.io-client'

  export default {
    name: "v-enter-page",
    data() {
      return {
        form: {
          password: '',
          id: '',
        },
        loading: false
      }
    },
    methods: {
      onSubmit(formName) {
        console.log('submit!');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            let message = this.$message({
              showClose: true,
              duration: 0,
              message: '正在进入'
            });
            setTimeout(() => {
              this.$http.post('enter',{
                  ...this.form
              }).then(response => {
                this.loading = false;
                console.log(response);
                let d = response.data;
                message.close();
                if (d.status) {
                  this.$message({
                    message: 'ojbk',
                    type: 'success'
                  });
                  localStorage.setItem('room', JSON.stringify(d.room));
                  this.$store.commit('setRoom', {...d.room});
                  this.$router.push('/room')
                } else {
                  message.close();
                  this.$message({
                    message: d.msg,
                    type: 'error'
                  });
                }
              }).catch(err=>{
                message.close();
                this.loading=false;
                this.$message({
                  message: err,
                  type: 'error'
                });
              })
            }, 100);
          } else {
            this.$message({
              message: '请输入',
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
