<template>
    <div class="login">

        <van-form>
            <van-cell-group inset>
                <van-field v-model.number="phone" name="手机号" label="手机号" :rules="rules.phone" />
                <van-field v-model="password" type="password" name="密码" label="密码" :rules="rules.password" />
            </van-cell-group>
            <div style="margin: 16px; width: 1.8rem;">
                <van-button round block type="primary" @click="Login">
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- #region -->
        <!-- <form class="container" :rules="rules">
            <label for="phone" prop="phone">
                <span>手机号：</span>
                <input type="number" name="" id="phone" v-model.number="phone">
            </label>

            <label for="verification">
                <span>验证码：</span>
                <input type="text" id="verification" v-model="captcha">
                <div class="position" @click="getVerification">{{ text }}</div>
            </label>
            <label for="verification">
                <span>密码：</span>
                <input type="password" id="verification" v-model.lazy="passWord">
            </label>

            <button @click="Login">登录</button>
        </form> -->
        <!-- #endregion -->
    </div>
</template>
<script>
// import { getCaptcha, getCaptchaVerify } from '@/request/api/home.js'
export default {
    name: 'Login',
    data() {
        return {
            //<!--@ 验证码
            // #region
            // text: '获取',
            // time: 60,
            // IntervalTimer: 0,
            // // 验证码
            // captcha: '',
            // // 核对
            // verification: '',
            // #endregion
            phone: '',
            password: '',
            rules: {
                phone: [
                    { type: "Number", required: true, message: '请输入手机号', trigger: 'onChange' },
                    { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, required: true, message: '手机格式不正确', trigger: 'onChange' },
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'onBlur' }
                ]
            }
        }
    },
    methods: {
        // <!--@验证码
        // #region
        // async GetCaptcha() {
        //     let result = await getCaptcha(this.phone)
        //     this.GetCaptchaVerify()
        //     console.log(result);
        // },
        // async GetCaptchaVerify() {
        //     console.log(this.phone, this.captcha);
        //     let result = await getCaptchaVerify({ phone: this.phone, captcha: this.captcha })
        // },
        // getVerification() {
        //     this.IntervalTimer = setInterval(() => {
        //         --this.time
        //         this.text = this.time
        //         if (this.time == 0) {
        //             this.time = 60
        //             this.text = '获取'
        //             clearInterval(this.IntervalTimer)
        //         }
        //     }, 1000);

        // },

        // #endregion
        async Login() {
            console.log(this.phone, this.password);
            let res = await this.$store.dispatch('GetPhoneLogin', { phone: this.phone, password: this.password })
            console.log(res);


        },
    }

}
</script>
<style lang="less" >
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;

    background-color: #eb5151;

    .van-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .van-cell-group {
        width: 6.4rem;
    }

    .van-cell {
        padding-right: 6px;
    }

    .van-field__error-message {
        word-break: keep-all;
    }

    .van-cell__value,
    .van-field__value {
        display: flex;
        justify-content: space-between;
    }


    .van-field__label {
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    // .container {
    //     display: flex;
    //     justify-content: center;
    //     flex-direction: column;
    //     align-items: center;
    //     flex-wrap: wrap;
    //     background-color: rgba(255, 255, 255, 0.3); //元素透明
    //     --webkit-backdrop-filter: blur(10px);
    //     backdrop-filter: blur(10px);
    //     border-radius: 5px;
    //     padding: 10px;



    //     label {
    //         margin: 0.4rem 0;
    //         height: 0.6rem;
    //         width: 5.2rem;
    //         display: flex;
    //         justify-content: space-between;
    //         position: relative;

    //         span {
    //             color: #fff;
    //             width: 25%;
    //             text-align: right;
    //         }


    //         input {
    //             border: none;
    //             height: 100%;
    //             width: 75%;
    //             color: #000;
    //             padding-left: 5px;
    //         }

    //         input:focus {
    //             outline: none;
    //             box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
    //             color: #999;

    //         }

    //         input::placeholder {
    //             color: #66afe9;
    //         }


    //         // .position {
    //         //     position: absolute;
    //         //     top: 2px;
    //         //     right: 6px;
    //         //     font-size: small;
    //         //     border-radius: 3px;
    //         //     background-color: rgb(185, 62, 62);
    //         //     padding: 0.1rem .2rem;
    //         //     color: #fff;
    //         // }

    //     }

    //     label:nth-child(2) span {
    //         letter-spacing: 5px;
    //     }

    //     button {
    //         width: 1rem;
    //         height: .6rem;
    //         padding: .1rem;
    //         box-sizing: content-box;
    //         color: #fff;
    //         background: rgb(194, 12, 12);
    //         border: none;
    //         border-radius: 10px;
    //     }
    // }
}
</style>

