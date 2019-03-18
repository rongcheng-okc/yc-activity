<template>
    <div class="container">
        <section>
            <div id="production_title" alt="产品名称"></div>
            <div id="production_price" :style="priceImageUrl" alt="价格"></div>
            <div id="activity_title" alt="活动名称"></div>
            <div id="production_tip" alt="提示"></div>
        </section>
        <section class="content">
            <form class="col-form" action="">
                <div class="form-row-input">
                    <label for="user_name"><img src="../img/user.png" alt=""></label>
                    <input type="text" :value="formData.name" @change="changeUserName" name="userName" id="user_name" placeholder="您的姓名">
                </div>
                <div class="form-row-error" v-show="formData.nameError">
                    <p>{{formData.nameError}}</p>
                </div>
                <div class="form-row-input">
                    <label for="user_phone"><img src="../img/phone.png" alt=""></label>
                    <input type="number" :value="formData.phone" @change="changePhone" name="phone" id="user_phone" placeholder="您的手机号">
                </div>
                <div class="form-row-error" v-show="formData.phoneError">
                    <p>{{formData.phoneError}}</p>
                </div>
                <div class="form-row-button">
                    <button @click.prevent="submitForm">立即兑换</button>
                </div>
                <div class="form-row-p">
                    <p>提示：名额有限，手快才能抢到哦！速速兑换！</p>
                </div>
            </form>
        </section>
        <Modal @closeModal="toCloseModal" v-show="modalVisible"></Modal>
        <Modal @closeModal="toCloseHasRegistedModal" v-show="hasRegistedModalVisible">
            <template v-slot:title>您已报名该活动，无需重复报名</template>
        </Modal>
    </div>
</template>

<script>
    import { getQueryObj } from '../utils/query';
    import Modal from '../components/Modal';
    import img1299 from '../img/price-1299.jpg';
    import img2299 from '../img/price-2299.jpg';
    import img3299 from '../img/price-3299.jpg';

    // let priceImgs = {
    //     '1299': require('../img/price-1299.jpg'), 
    //     '2299': require('../img/price-2299.jpg'), 
    //     '3299': require('../img/price-3299.jpg')
    // };

    let priceImgs = {
        '1299': img1299, 
        '2299': img2299, 
        '3299': img3299
    };
    export default {
        data() {
            return {
                priceImageUrl: {
                    'background-image': `url(${priceImgs['1299']})`
                },
                modalVisible: false,
                hasRegistedModalVisible: false,
                formData: {
                    name: '',
                    nameError: '',
                    phone: '',
                    phoneError: ''
                },
                queryData: {
                    date: '',
                    activityId: '',
                    userId: ''
                },
                registedList: ['15757172557:1299']
            }
        },
        computed: {
            activityId() {
                return this.queryData.activityId;
            }
        },
        components: {
            Modal
        },
        created() {
            this.getQueryData();
            this.setPriceImageUrl();
            this.isRegisted();
        },
        methods: {
            toCloseModal() {
                this.modalVisible = false;
            },
            toCloseHasRegistedModal() {
                this.hasRegistedModalVisible = false;
            },
            changeUserName(e) {
                let value = e.target.value;
                let reg0 = /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/;
                // let reg1 = /[^\u4e00-\u9fa5a-zA-Z]/g;
                this.formData.nameError = reg0.test(value) ? '' : '用户名只能是汉字或大小写字母';
                this.formData.name = value;
            },
            changePhone(e) {
                let value = e.target.value;
                let reg0 = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
                this.formData.phoneError = reg0.test(value) ? '' : '请输入正确的手机号';
                this.formData.phone = value;
            },
            submitForm() {
                let name = this.formData.name;
                let phone = this.formData.phone;
                if (this.formData.nameError || this.formData.phoneError) return;
                if (!name || !phone) {
                    this.formData.nameError = !name ? '必填项' : '';
                    this.formData.phoneError = !phone ? '必填项' : '';
                    return;
                }    
                
                let info = `${phone}:${this.activityId}`
                if (this.registedList.indexOf(info) < 0) {
                    this.registedList.push(info);
                    this.modalVisible = true;
                } else {
                    this.hasRegistedModalVisible = true;
                }
            },
            getQueryData() {
                let activitys = ['1299', '2299', '3299'];
                let obj = getQueryObj(window.location.href);
                Object.keys(obj).forEach((item) => {
                    this.queryData[item] = obj[item];
                    if (item === 'activityId' && activitys.indexOf(obj[item]) < 0) {
                        this.queryData[item] = '1299';
                    }
                });
            },
            setPriceImageUrl() {
                this.priceImageUrl['background-image'] = `url(${priceImgs[this.queryData.activityId]})`
            },
            isRegisted() {
                let userId = this.queryData.userId;
                let activityId = this.queryData.activityId;
                let info = `${userId}:${activityId}`

                if (this.registedList.includes(info)){
                    this.hasRegistedModalVisible = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    section:nth-child(2) {
        flex: 1;
    }

    #production_title {
        padding-bottom: 18.7%;
        background-size: 100% 100%;
        background-image: url(../img/production-title.jpg);
    }

    #production_price {
        padding-bottom: 13.4%;
        background-size: 100% 100%;
    }

    #activity_title {
        padding-bottom: 12%;
        background-size: 100% 100%;
        background-image: url(../img/activity-title.jpg);
    }

    #production_tip {
        padding-bottom: 13.4%;
        background-size: 100% 100%;
        background-image: url(../img/activity-tip.jpg);
    }

    .content {
        background-size: 100% 100%;
        background-image: url(../img/content-bc.jpg);
        display: flex;
        align-items: center;
    }

    .col-form {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 12%;

        .form-row-input {
            flex: 0 0 100%;
            background-color: aliceblue;
            margin: 10px 0;
            padding: 0 10px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            height: 48px;

            label {
                margin-right: 5px;

                img {
                    width: 90%;
                    height: 90%;
                }
            }

            input {
                border: 0;
                font-size: 17px;
                line-height: 30px;
            }
        }

        .form-row-button {
            flex: 0 0 100%;
            margin: 20px 0 10px 0;
            display: flex;
            justify-content: center;

            button {
                border-radius: 24px;
                padding: 10px 30px;
                font-size: 18px;
                color: aliceblue;
                background-color: rgb(28, 48, 171);
                border: 1px solid rgb(33, 203, 255);
            }
        }

        .form-row-p {
            text-align: center;
            color: rgb(33, 203, 255);
            font-size: 14px;
        }

        .form-row-error {
            color: red;
            height: 20px;

            p {
                margin: 0;
            }
        }
    }
</style>