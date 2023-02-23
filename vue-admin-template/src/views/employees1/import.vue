<template>
  <div>
    <Upload-Excel :on-success="onSuccess" />
  </div>
  <!-- username	string	非必须		姓名
mobile	string	非必须		手机号
formOfEmployment	number	非必须		聘用形式
workNumber	string	非必须		工号
departmentName	string	非必须		组织名称
timeOfEntry	string	非必须		入职时间
correctionTime	string	非必须		转正时间 -->
</template>

<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { sysUserBatch } from '@/api/employees'
import { excelTojsTime } from '@/utils/index'
export default {
  components: {
    UploadExcel
  },
  methods: {
    async onSuccess(res) {
      const arr = res.results.map((item) => {
        return {
          timeOfEntry: excelTojsTime(item['入职日期']),
          username: item['姓名'],
          workNumber: item['工号'],
          mobile: item['手机号'],
          correctionTime: excelTojsTime(item['转正日期'])
        }
      })
      // 批量导入
      await sysUserBatch(arr)
      this.$message.success('导入成功')
      this.$router.push('/employees')
      console.log(res.results, arr)
    }
  }
}
</script>

<style></style>
