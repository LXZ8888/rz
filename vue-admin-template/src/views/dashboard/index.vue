<template>
  <div>
    <input type="file" @change="changeEvent">
    <img :src="imgUrl" alt="" class="box">
    {{ imgUrl }}
    <UploadImg />
  </div>
</template>

<script>
import UploadImg from '@/components/Uploadimg'
import COS from 'cos-js-sdk-v5'

export default {
  components: {
    UploadImg
  },

  data() {
    return {
      cos: '',
      imgUrl: ''
    }
  },
  created() {
    this.cos = new COS({
      SecretId: 'AKIDAMUSCmr7B05lIdmKvLZFmBOMrNtIyOqA',
      SecretKey: 'GOSJ8eIuPh6UtJdoqgJJ6iDalnHh3Tp3'
    })
  },
  methods: {
    changeEvent(e) {
      console.log(e.target.files[0])
      this.cos.uploadFile(
        {
          Bucket: 'zhenzhen-1310901602' /* 填写自己的 bucket，必须字段 */,
          Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
          Key: e.target.files[0]
            .name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
          Body: e.target.files[0], // 上传文件对象
          SliceSize:
            1024 *
            1024 *
            5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err) {
            console.log('上传失败', err)
          } else {
            console.log('上传成功', data)
            this.imgUrl = 'http://' + data.Location
          }
        }
      )
    }
  }
}
</script>

<style>
.box {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>
