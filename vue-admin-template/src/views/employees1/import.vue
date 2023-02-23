<template>
  <div>
    <Upload-Excel :on-success="onSuccess" />
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
export default {
  components: {
    UploadExcel
  },
  methods: {
    onSuccess(res) {
      console.log(res)
    }
  }
}
</script>

<style></style>
