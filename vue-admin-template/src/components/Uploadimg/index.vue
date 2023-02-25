<template>
  <div class="upload-img">
    <!--
      上传组件
      el-upload
       http-request:自定义上传
     -->
    <el-upload
      :http-request="httpRequest"
      action="#"
      :show-file-list="false"
      :before-upload="beforeUpload"
      class="upload"
    >
      <img v-if="value" v-errorimg :src="value" alt="" class="img">
      <div v-else class="icon"><i class="el-icon-plus" /></div>
    </el-upload>
    <!-- 删除按钮 -->
    <i v-if="value" class="del el-icon-delete" @click="delClick" />
    <!-- 预览按钮 -->
    <i v-if="value" class="big el-icon-zoom-in" @click="showBig = true" />
    <!-- 预览弹窗 -->
    <el-dialog
      v-errorimg
      title="图片预览"
      width="600px"
      :visible.sync="showBig"
      center
    >
      <img
        :src="value"
        alt=""
        style="width: 500px"
      ></el-dialog>
    <!-- 环形进度条 -->
    <el-progress
      v-if="showProgress"
      type="circle"
      :percentage="percentage"
      class="progress"
      :width="200"
    />
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
    return {
      showBig: false,
      percentage: 0,
      showProgress: false
    }
  },
  methods: {
    beforeUpload(file) {
      this.showProgress = true
      const limitType = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!limitType) {
        this.$message.error('请上传jpg与png图片')
      }
      const limitSize = file.size / 1024 / 1024 < 1

      if (!limitSize) {
        this.$message.error('请上传1MB以内的图片')
      }
      return limitSize && limitType
    },

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
            this.percentage = +(progressData.percent * 100).toFixed(2)
            if (progressData.percent === 1) {
              this.showProgress = false
            }
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
    // 删除点击时间
    delClick() {
      this.$confirm('您确定要删除吗')
        .then(() => {
          this.$emit('input', '')
        })
        .catch(() => {})
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
.upload-img {
  position: relative;
  width: 200px;
  &:hover {
    .del,
    .big {
      display: block;
    }
  }
  .del,
  .big {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    &:hover {
      color: red;
    }
  }
  .big {
    right: 30px;
  }
}
.progress {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
}
</style>
