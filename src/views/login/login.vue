<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登入"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 輸入框 -->
    <!-- <van-cell-group> 添加上下格線，不太需要，用van-form替換掉 -->
    <!-- 只有表單驗證通過才會調用submit方法 ，本身自帶的功能-->
    <!-- 關閉默認提示 -->
    <!-- 屬性值若為true，可直接寫屬性名即可 -->
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      ref="login-form"
      :show-error="false"
      :show-error-message="false"
      validate-first
    >
      <van-field
        :rules="formRules.mobile"
        v-model="user.mobile"
        icon-prefix="news"
        left-icon="cellphone"
        name="mobile"
        center
        placeholder="請輸入手機號"
      />
      <van-field
        :rules="formRules.code"
        v-model="user.code"
        clearable
        icon-prefix="news"
        left-icon="code"
        name="code"
        center
        placeholder="請輸入驗證碼"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- .prevent  不要點擊按鈕後觸發原全部驗證方法 -->
          <van-button
            v-else
            size="small"
            class="send-btn"
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading" 
            round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 將登入按鈕挪到van-form裡面 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登入 / 註冊</van-button>
      </div>
      <!-- </van-cell-group> -->
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
// import { Toast } from 'vant';
import { CountDown } from "vant";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      },
      formRules: {
        mobile: [
          { required: true, message: "請填寫帳號" },
          { pattern: /^\d{11}$/, message: "格式錯誤" }
        ],
        code: [
          { required: true, message: "請填寫驗證碼" },
          { pattern: /^\d{6}$/, message: "格式錯誤" }
        ]
      },
      isCountDownShow: false, //是否顯示倒計時按紐,
      isSendSmsLoading: false, //發送驗證碼的loading狀態
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLogin() {
      // Toast.loading({ //使用toast第一種方式(要引入)
      this.$toast.loading({
        //使用toast第二種方式(不用引入)
        message: "登入中...", //提示文檔
        forbidClick: true, //禁用背景點擊
        duration: 0 //持续展示 toast(直到有欣提示，例： this.$toast.success("登入成功");)
      });
      try {
        const {data} = await login(this.user);
        this.$toast.success("登入成功");
        this.$store.commit('setUser', data.data) 
      } catch (err) {
        console.log(err);
        this.$toast.fail("登入失敗，手機或驗證碼錯誤");
      }
    },
    // 自定義錯誤樣式
    // fail事件，錯誤自帶錯誤參數
    onFailed(error) {
      console.log("驗證失敗", error);
      console.log(error.errors[0].message);
      // 只需要取index為0的錯誤訊息即可，因為就是第一個錯誤
      if (error.errors[0]) {
        // position防止手機鍵盤太高，遮住消息
        this.$toast({ message: error.errors[0].message, position: top });
      }
    },
    async onSendSms() {
      // 效驗手機號碼
      try {
        await this.$refs["login-form"].validate("mobile");
        // 驗證通過，請求發送驗證碼
        this.isSendSmsLoading = true //防止網路慢，造成多次發送行為
        await sendSms(this.user.mobile);
        // 顯示倒記時
        this.isCountDownShow = true;
        
        //  倒計時結束，隱藏倒計時,顯示發送驗證碼,(監視倒計時的finish事件)
      } catch (err) {
        //所有try裡面的錯誤都會於catch中接收

      // 為了防止頁面被

        // err.message並非都是我們要的，因此要進行判斷
        // 驗證失敗
        var message = "";
        if (err && err.response && err.response.status == 429) {
          // 驗證太頻繁
          message = "驗證太頻繁，請稍後再試";
        } else if ((err.name = "mobile")) {
          // 手機驗證失敗
          message = err.message;
        } else {
          // 未知錯誤
          message = "操作失敗，請收後重試";
        }
        // console.log('驗證失敗',err);
        // console.dir(err);
        this.$toast({ message, position: top });
      }
      // 無論發送成功或失敗，sendSmsloading樣式都須關閉
      this.isSendSmsLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
