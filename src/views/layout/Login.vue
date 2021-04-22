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
    // 提交按钮被点击时的操作
    submitForm(formName) {
      // 验证用户输入是否合格，如果合格就向后台发送请求
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 根据loginForm中的内容作为请求参数，根据返回结果判断正确性
          api.login(this.loginForm).then((data) => {
            console.log(data);
            // 一旦用户信息的保存
            this.$store.dispatch('setUserInfo', data);
            // 路由改变，通过hash
            this.$router.push({
              name: 'Home',
            });
          }).catch((error) => { // 如果报错，就显示报错信息
            this.$message.error(error);
          });
          return true;
        }

        // 如果没有校验通过就在控制台输出错误信息
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
