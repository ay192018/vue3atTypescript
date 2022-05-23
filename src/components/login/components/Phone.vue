<template>
  <div class="Phone">
    <h1 class="title">手机号登录</h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="Phone" prop="Phone">
        <el-input
          v-model="ruleForm.Phone"
          @paste="paste"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="Password" prop="Password">
        <el-input
          v-model="ruleForm.Password"
          type="password"
          autocomplete="off"
          @paste="paste"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-link @click="changeLogin">扫码登录</el-link>
  </div>
</template>

<script setup lang="ts">
import { theme, User, login } from '@/global/index';
const { color } = storeToRefs(theme());
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { Login } from '@/service/api/login';
const ruleFormRef = ref<FormInstance>();
const { profile } = storeToRefs(User());
const { loginShow } = storeToRefs(login());
import { ElNotification } from 'element-plus';
const emit = defineEmits<{
  (e: 'switchState'): void;
}>();
const changeLogin = () => {
  emit('switchState');
};

const PasswordRule = (
  rule: any,
  value: any,
  callback: any,
) => {
  if (value === '') {
    callback(new Error('请输入密码！！！'));
    //正则为6-18的任意字符
  } else {
    if (!/^[\S]{6,18}$/.test(value)) {
      callback(new Error('密码必须为6-18位的任意字符'));
    } else {
      callback();
    }
  }
};
const PhoneRule = (
  rule: any,
  value: any,
  callback: any,
) => {
  if (value === '') {
    callback(new Error('请输入手机号！！！'));
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('手机号格式错误！！！'));
  } else {
    callback();
  }
};
const paste = (e: Event) => {
  //禁止粘贴
  e.preventDefault();
};
const ruleForm = reactive({
  Phone: '',
  Password: '',
});

const rules = reactive({
  Password: [
    { validator: PasswordRule, trigger: 'change' },
  ],
  Phone: [{ validator: PhoneRule, trigger: 'change' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      const { data } = await Login({
        phone: ruleForm.Phone,
        password: ruleForm.Password,
      });

      profile.value = data.profile;
      localStorage.setItem(
        'profile',
        JSON.stringify(data.profile),
      );
      localStorage.setItem(
        'cookie',
        JSON.stringify(data.cookie),
      );
      ElNotification({
        title: '登录成功',
        message: `欢迎回来，${profile?.value?.nickname}`,
        position: 'top-left',
      });
      loginShow.value = false;
    } else {
      ElMessage({
        showClose: true,
        message: '提交失败！！！',
        type: 'error',
      });
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
.Phone {
  ::v-deep(.el-input__wrapper.is-focus) {
    /*  border: 1px solid v-bind(color) !important; */
    box-shadow: 0 0 0 1px v-bind(color) inset;
  }
  ::v-deep(.el-input__wrapper) {
    background: var(---AsideBackground-color);
  }

  ::v-deep(.el-form-item__content:last-child) {
    justify-content: space-around;
  }
  ::v-deep(.el-button--primary) {
    background: v-bind(color);
    border-color: v-bind(color);
  }
  ::v-deep(.el-button:focus):last-child {
    border-color: v-bind(color);
    color: v-bind(color);
  }
  ::v-deep(.el-button:hover):last-child {
    border-color: v-bind(color);
    color: v-bind(color);
  }
  ::v-deep(.el-link:hover) {
    color: v-bind(color);
    border-color: v-bind(color);
  }
  ::v-deep(.el-link__inner:hover) {
    color: v-bind(color);
    border-color: v-bind(color);
  }
  ::v-deep(.el-link) {
    margin-top: 50%;
  }
}
</style>
