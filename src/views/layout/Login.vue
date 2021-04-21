<template>
  <div class="login">
    <a-form-model class="login-form" ref="loginForm"
    :model="loginForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="username">
        <a-input v-model="loginForm.username" type="username" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="loginForm.password" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the email'));
      }
      const tag = emailReg.test(value);
      if (tag) {
        return true;
      }
      return callback(new Error('Please input correct email'));
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the password'));
      }
      return true;
    };
    return {
      loginForm: {
        password: '',
        username: '',
      },
      rules: {
        // 当属性值被修改的时候执行validator对应的方法
        password: [{ validator: validatePassword, trigger: 'change' }],
        username: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm).then((data) => {
            console.log(data);
            this.$router.push({
              name: 'Home',
            });
          }).catch((error) => {
            this.$message.error(error);
          });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
@import url('~@/assets/css/login.less');
</style>
