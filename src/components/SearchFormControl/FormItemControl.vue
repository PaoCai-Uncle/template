<template>
  <el-form-item :class="formatClassName(className)" :label="formItem.label" :prop="formItem.prop">
    <el-input
      v-model="data[formItem.prop]"
      :placeholder="formItem.placeholder"
      :disabled="formatBoolean(disabled[formItem.prop])"
      :readonly="formatBoolean(readonly[formItem.prop])"
      :clearable="formatBoolean(clearable[formItem.prop])"
      @change="value => inputChange({ value, prop: formItem.prop })"
    />
  </el-form-item>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'FormItemControl'
})
export default class extends Vue {

  @Prop({
    required: true
  })
  data!: object;

  @Prop({
    required: true
  })
  formItem!: object;

  @Prop({
    default: () => ({})
  })
  disabled!: object;

  @Prop({
    default: () => ({})
  })
  readonly!: object;

  @Prop({
    default: () => ({})
  })
  clearable!: object;

  @Prop({
    default: () => ''
  })
  className!: string

  // 兜底
  formatBoolean(v: boolean | undefined) {
    return typeof v === 'boolean' ? v : Boolean(v);
  }

  formatClassName(cn: string) {
    return cn && cn.includes('el-col-') ? cn : ['el-col-6', cn];
  }

  inputChange(params: any) {
    this.comChangeEmit(params);
  }

  comChangeEmit(params: any) {
    this.$emit('change', params);
  }
}
</script>
<style lang="scss">
.user-manage-container {
  height: 1100px;
}

</style>