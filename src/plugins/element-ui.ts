import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(ElementUI, { size: 'medium' });

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

const basicMessageOpt = (opt: any) => {
  return {
    message: '',
    offset: 20,
    duration: 3000,
    type: 'info',
    onClose: () => { console.log(1); },
    ...opt
  };
};

Vue.prototype.$showError = (message = '', opt = {}) => {
  Message(basicMessageOpt({ ...opt, type: 'error', message }));
};

Vue.prototype.$showSuccess = (message = '', opt = {}) => {
  Message(basicMessageOpt({ ...opt, type: 'success', message }));
};

Vue.prototype.$showWarn = (message = '', opt = {}) => {
  Message(basicMessageOpt({ ...opt, type: 'warning', message }));
};
