<template>
  <el-drawer
    :title="title"
    :visible="visible"
    :direction="direction"
    :before-close="beforeClose"
    :size="size"
    custom-class="filter-field-drawer"
  >
    <div class="filter-field-drawer-body">
      <el-scrollbar>
        <vuedraggable
          v-model="newFields"
          class="field-container"
          animation="600"
          chosen-class="chosen"
          ghost-class="ghost"
          :scroll="true"
          :force-fallback="true"
          filter=".default"
          :move="move"
        >
          <transition-group>
            <div v-for="it in newFields" :key="it.prop" :class="{ item: true, default: it.default }">
              <el-checkbox v-model="it.checked" :disabled="it.checkedDisabled">
                {{ it.label }}
              </el-checkbox>
              <i class="operation-line" />
            </div>
          </transition-group>
        </vuedraggable>
      </el-scrollbar>
    </div>
    <div class="drawer-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :disabled="saveDisabled" @click="confirm">保存</el-button>
    </div>
  </el-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator';
import vuedraggable from 'vuedraggable';
import { cloneDeep } from 'lodash';
@Component({
  name: 'SortFieldDrawer',
  components: {
    vuedraggable
  }
})
export default class extends Vue {

  @Prop({
    required: false,
    default: '设置属性'
  })
  title!: string

  @Prop({
    required: true,
    default: false
  })
  visible!: boolean

  @Prop({
    required: false,
    default: '20%'
  })
  size!: string

  @Prop({
    required: false,
    default: 'rtl'
  })
  direction!: string

  @Prop({
    required: true,
    default: () => []
  })
  fields!: Array<any>

  @Model('change')
  value!: Array<any>


  newFields: Array<any> = []
  oldFields: Array<any> = []


  @Watch('visible', {
    immediate: true
  })
  initLocalFields(v: boolean) {
    if (v) {
      this.newFields = cloneDeep(this.fields);
      this.oldFields = cloneDeep(this.fields);
    }
  }

  get saveDisabled() {
    if (!this.oldFields.length) return true;

    return this.oldFields.length === this.newFields.length
      ? this.oldFields.every(
        (it, index) =>
            // 兼容key 和 prop
            ((it.key && this.newFields[index]?.key === it.key) || (it.prop && this.newFields[index]?.prop === it.prop))
            && this.newFields[index]?.checked === it.checked
        )
      : false;
  }

  async beforeClose() {
    this.cancelDrawer();
  }

  async cancel() {
    this.cancelDrawer();
  }

  async cancelDrawer() {
    try {
      !this.saveDisabled && (await this.$confirm('尚未保存, 确认关闭?', '提示', { type: 'warning' }));

      this.$emit('update:visible', false);
    } catch (e) {}
  }

  async confirm() {
    console.log('保存');
    try {
      !this.saveDisabled && (await this.$confirm('确认保存?', '提示', { type: 'warning' }));
      this.updateValue();
    } catch (e) {}
  }

  updateValue() {
    this.$emit('change', cloneDeep(this.newFields));
    this.$emit('update:visible', false);
  }

  move(e: any) {
    const {
      relatedContext: { element },
      draggedContext: { element: dragElement }
    } = e;

    console.log(dragElement, 'dragElement', element);

    // 相邻元素如果是默认也不能插入
    if (element && element.default) return false;

    // 当前是默认 不动位置和修改
    if (dragElement && dragElement.default) return false;

    return true;
  }

  // 组件提供方法格式方法
  /**
   * 仅仅增加 排序和选中状态
   * list: Array<object>
  */
  formatField(list: Array<object>) {
    if (Array.isArray(list)) {
      return list.map((it: any, index: number) => {
        return {
          ...it,
          index,
          checked: true
        };
      });
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>