<template>
  <div class="user-manage-container">
    <FormControl v-model="searchData" :formProps="searchConfig.props" :clearable="searchConfig.clearable" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FormControl } from '@/components/SearchFormControl';
@Component({
  name: 'UserManage',
  components: {
    FormControl
  }
})
export default class extends Vue {
  searchData = {}

  searchConfig = {
    // 静态配置
    props: [
      {
        prop: 'userCode',
        label: '用户代号(工号)',
        defaultValue: '1',
        sortDisabled: true,
      },
      {
        prop: 'userName',
        label: '用户名称'
      }
    ],
    clearable: {
      code: true
    }
  }
}
</script>
<style lang="scss">
.user-manage-container {
  height: 1100px;
}

</style>