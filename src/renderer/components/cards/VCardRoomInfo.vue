<template>
  <el-card class="box-card">
    <div slot="header">
      <span class="header">房间信息</span>
    </div>
    <div>
      <el-form ref="room" :model="room" label-width="80px" v-if="room.name">
        <el-form-item label="房间名称" prop="name" >
          {{room.name}}
        </el-form-item>
        <el-form-item label="房间ID" prop="name">
          {{room.id}}
        </el-form-item>
        <el-form-item label="主办方" prop="user">
          {{room.user}}
        </el-form-item>
        <el-form-item label="活动地点" prop="address">
          {{room.address}}
        </el-form-item>
        <el-form-item label="活动时间" prop="time">
          {{room.time.map(item=>new Date(item).toLocaleString()).join(' - ')}}
        </el-form-item>
        <el-form-item label="活动内容">
          {{room.desc}}
        </el-form-item>
        <el-form-item label="房间二维码">
          <img :src="`http://qr.liantu.com/api.php?text=http://118.24.24.60:12345/%23/login/${room.id}`">
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "v-card-room-info",
    data() {
      return {
      }
    },
    computed:{
      room(){
        return this.$store.state.room
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .header {
    font-size: 24px;
    font-weight: bold;
  }
</style>
