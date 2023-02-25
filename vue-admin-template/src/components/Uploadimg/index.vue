<template>
  <div>
    <!--
      上传组件
      el-upload
       http-request:自定义上传
     -->
    <el-upload
      :http-request="httpRequest"
      action="#"
      :before-upload="beforeUpload"
      :show-file-list="false"
      class="upload"
    >
      <img v-if="value" :src="value" alt="" class="img">
      <div v-else class="icon"><i class="el-icon-plus" /></div>
    </el-upload>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDAMUSCmr7B05lIdmKvLZFmBOMrNtIyOqA',
  SecretKey: 'GOSJ8eIuPh6UtJdoqgJJ6iDalnHh3Tp3'
})
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    httpRequest(res) {
      cos.uploadFile(
        {
          Bucket: 'zhenzhen-1310901602' /* 填写自己的 bucket，必须字段 */,
          Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
          Key: res.file
            .name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
          Body: res.file, // 上传文件对象
          SliceSize:
            1024 *
            1024 *
            5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err) {
            console.log('上传失败', err)
          } else {
            console.log('上传成功', data)
            // this.imgUrl = 'http://' + data.Location
            this.$emit('input', 'http://' + data.Location)
          }
        }
      )
    },
    beforeUpload() {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;

  line-height: 0;

  .el-icon-plus {
    font-size: 24px;
  }
  .icon {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
