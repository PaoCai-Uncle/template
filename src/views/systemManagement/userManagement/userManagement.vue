<template>
  <div class="user-management-page" :style="{ height: maxHeight}">
    <!-- 用户及用户分类管理 -->
    <el-tabs  v-model="activeName" @tab-click="tabClick">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name" />
    </el-tabs>
    <el-scrollbar>
      <transition name="slide-fade" mode="out-in">
        <component :is="activeName" />
      </transition>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import GroupManage from './components/GroupManage.vue';
import UserManage from './components/UserManage.vue';

import { AppModule } from '@/store/modules/app';

interface TabItem {
  label: string;
  name: string;
}

@Component({
  name: 'userManagement',
  components: {
    GroupManage,
    UserManage
  }
})
export default class extends Vue {

  tabs: Array<TabItem> = [
    {
      label: '用户管理',
      name: 'UserManage'
    },
    {
      label: '分组管理',
      name: 'GroupManage'
    }
  ]

  activeName = 'UserManage'

  get maxHeight() {
    return (AppModule.viewClientRect.height - 20) + 'px';
  }


  tabClick() {
    console.log(1);
  }

  created() {
    console.log('created');
  }
}
</script>
<style lang="scss">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.user-management-page {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #FFF;
  overflow: hidden;

  .el-tabs__header {
    margin-bottom: 6px;
  }

  >.el-scrollbar {
    flex: 1;
    overflow: hidden;
    >.el-scrollbar__wrap {
      height: 100%;
      overflow-x: hidden;
    }

    .el-scrollbar__bar.is-horizontal {
      display: none;
    }
  }
}
</style>