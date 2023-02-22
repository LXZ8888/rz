<template>
  <div>
    <el-alert
      title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
      type="info"
      style="margin-bottom: 20px"
      class="el-icon-info"
    />

    <div class="info">
      <el-form ref="info" label-width="120px">
        <el-form-item label="公司名称">
          <el-input v-model="info.name" disabled />
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="info.companyAddress" disabled />
        </el-form-item>
        <el-form-item label="公司邮箱">
          <el-input v-model="info.mailbox" disabled />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="info.remarks" type="textarea" :rows="4" disabled />
        </el-form-item>
      </el-form>
    </div>
  </div>
  <!--
    {
    "id": "1",
    "name": "江苏传智播客教育科技股份有限公司",
    "managerId": "abc",
    "version": "12",
    "renewalDate": null,
    "expirationDate": null,
    "companyArea": null,
    "companyAddress": "北京市昌平区建材城西路金燕龙办公楼一层",
    "businessLicenseId": null,
    "legalRepresentative": "",
    "companyPhone": "400-618-9090",
    "mailbox": "bd@itcastcn",
    "companySize": null,
    "industry": null,
    "remarks": "传智播客官网-好口碑IT培训机构,一样的教育,不一样的品质",
    "auditState": "0",
    "state": 1,
    "balance": 0,
    "createTime": "2018-11-07T13:30:05.000+0000"
}
   -->
</template>

<script>
import { company } from '@/api/setting'
export default {
  data() {
    return {
      info: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await company(this.$store.state.user.userInfo.companyId)
      this.info = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: 500px;
}
</style>
