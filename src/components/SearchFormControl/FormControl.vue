<template>
  <el-form
    ref="form"
    :class="formClass"
    :model="formData"
    :rules="rules"
    label-width="110px"
    inline
  >
    <!-- <transition mode="out-in" name="slideup-fade"> -->
      <FormItemControl
        v-for="item in formPropFields"
        v-show="item.checked"
        :class-name="item.className"
        :key="item.props"
        :formItem="item"
        :data="formData"
        :clearable="formClearable"
        :disabled="formDisabled"
        :readonly="formReadonly"
        @change="updateValue"
      />
    <!-- </transition> -->
    <el-form-item :class="ctrolClass">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="resetFormData">重置</el-button>
      <el-button icon="el-icon-setting" @click="toggleSortFieldDrawerVisible">自定义</el-button>
      <!-- <el-button v-if="useFold" :icon="foldConfig.icon">{{ foldConfig.text }}</el-button> -->
    </el-form-item>

    <SortFieldDrawer
      v-model="formPropFields"
      :visible.sync="sortFieldDrawerVisible"
      :fields="formPropFields"
      @change="sortFieldChange"
    />
  </el-form>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Model } from 'vue-property-decorator';
import { PropItem, BasicObjectBool } from '@/types';
import SortFieldDrawer from '@/components/SortFieldDrawer/SortFieldDrawer.vue';
import FormItemControl from './FormItemControl.vue';
import { cloneDeep } from 'lodash';

// 格式化props, 转为规范的Form; 注意：props请保持静态配置，生成后不变化
function formatPropsToForm(props: Array<PropItem>) {
  const data: any = {};
  let totalCol = 0;
  if (Array.isArray(props)) {
    props.forEach(({ prop, col = 6, defaultValue = '' }) => {
      data[prop] = defaultValue;
      totalCol += col;
    });
  }

  return { data, totalCol };
}

function formatBasicAttr(v:BasicObjectBool, defaultValue = false):BasicObjectBool {
  const formItemAttr:BasicObjectBool = {};
  if (v && Object.prototype.toString.call(v).includes('Object')) {
    Object.keys(v).forEach(k => {
      formItemAttr[k] = v[k] || defaultValue;
    });
  }

  return formItemAttr;
}


@Component({
  name: 'FormControl',
  components: {
    FormItemControl,
    SortFieldDrawer
  }
})
export default class extends Vue {
  @Prop({
    required: true,
    default: () => []
  })
  formProps!: Array<PropItem>

  @Prop({
    default: () => ({})
  })
  disabled!: BasicObjectBool

  @Prop({
    default: () => ({})
  })
  clearable!: BasicObjectBool

  @Prop({
    default: () => ({})
  })
  readonly!: BasicObjectBool

  @Prop({
    default: () => ({})
  })
  rules!: Array<object>

  @Model('change')
  value!: any

  // 本组件数据
  formData: any = {}

  // 总占位
  totalCol = 0

  // 控制按钮占位
  ctrolCol = 6

  // useSticky = false

  // useFold = false
  // foldState = false

  // 配置显隐
  sortFieldDrawerVisible = false

  // 表单项的配置
  formPropFields: Array<any> = []

  @Watch('formProps', {
    immediate: true
  })
  propsChange(v: Array<PropItem>) {
    if (Array.isArray(v)) {
      // 组装data
      const { data, totalCol } = formatPropsToForm(v);
      this.formData = data;
      // 统计总占位
      this.totalCol = totalCol;
      // 设置排序格式
      this.setSortProp();
      // 计算控制按钮项占位
      this.mathRowByCol();
    }
  }

  get formDisabled() {
    return formatBasicAttr(this.disabled);
  }

  get formClearable() {
    return formatBasicAttr(this.clearable);
  }

  get formReadonly() {
    return formatBasicAttr(this.readonly);
  }

  // get foldConfig() {
  //   return this.foldState ? { icon: 'el-icon-upload2', text: '收起' } : { icon: 'el-icon-download', text: '展开' };
  // }

  get ctrolClass() {
    return `ctrol-container el-col-${this.ctrolCol}`;
  }

  get formClass() {
    return 'clearfix search-form-control';
  }

  // 计算控制按钮项占位
  mathRowByCol() {
    let totalCol = this.totalCol;
    totalCol = totalCol % 24;

    this.ctrolCol = 24 - totalCol;
    console.log(this.ctrolCol, 'this.ctrolCol');
  }

  // 设置排序格式
  setSortProp() {
    const formPropFields: Array<any> = [];
    this.formProps.forEach((prop, index) => {
      formPropFields.push({ index, ...prop, col: prop.col || 6, checked: true, checkedDisabled: Boolean(prop.defaultValue) });
    });
    this.formPropFields = formPropFields;
  }

  toggleSortFieldDrawerVisible() {
    this.sortFieldDrawerVisible = !this.sortFieldDrawerVisible;
  }

  // 当配置修改时
  sortFieldChange() {
    console.log('sortFieldChange', this.formPropFields);
    this.totalCol = this.formPropFields.reduce((t, { col, checked }) => t + (checked ? col : 0), 0);
    this.mathRowByCol();
    this.formPropFields.forEach(({ prop, checked, defaultValue }) => {
      if (!checked) {
        this.formData[prop] = defaultValue;
      }
    });
  }

  resetFormData() {
    const formEle: any = this.$refs?.form;
    formEle && formEle.resetFields();
    this.$nextTick(() => {
      this.$emit('change', cloneDeep(this.formData));
    });
  }

  search() {
    this.$emit('search');
  }

  updateValue(propChange: any) {
    this.$emit('change', cloneDeep(this.formData));
    this.$emit('propChange', cloneDeep(propChange));
  }
}


</script>
<style lang="scss">
.search-form-control {
  position: relative;
  .ctrol-container {
    text-align: right;
    transform: translateY(0px);
    transition: translate .3s;
  }
}

.slideup-fade-enter-active {
  transition: all .3s ease;
}

.slideup-fade-leava-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slideup-fade-enter,
.slideup-fade-leave {
  transform: translateX(10px);
  opacity: 0;
}


</style>