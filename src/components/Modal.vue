<template>
    <div class="modal-container modal">
        <img @click="closeModal" src="../img/close.png" alt="">
        <div class="modal-content">
            <p class="title">
                <slot name="title">恭喜您，兑换成功！</slot>
            </p>
            <p class="content">
                <slot name="content">奥创熊专业顾问老师将在2个工作日内与您联系，请保持手机畅通哦！</slot>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            closeModal() {
                this.$emit('closeModal');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-container {
        background-color: rgb(28, 48, 171);
        border-radius: 5px;
        border: solid 1px rgb(33, 203, 255);
        color: rgb(33, 203, 255);
        text-align: center;
        padding: 15px 0 20px 0;
        position: relative;

        .title {
            font-size: 17px;
            margin-bottom: 10px;
        }

        .content {
            font-size: 14px;
            padding: 0;
            margin-top: 0;
        }

        img {
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    .modal {
        position: fixed;
        z-index: 10;
        left: 10%;
        top: 45%;
        width: 80%;
        overflow: auto;
    }

    .modal {
        -webkit-animation-name: zoom;
        -webkit-animation-duration: 0.6s;
        animation-name: zoom;
        animation-duration: 0.6s;
    }

    .modal-content {
        position: relative;
        margin: auto;
        display: block;
        width: 90%;
    }

    @-webkit-keyframes zoom {
        from {
            -webkit-transform: scale(0)
        }

        to {
            -webkit-transform: scale(1)
        }
    }

    @keyframes zoom {
        from {
            transform: scale(0.1)
        }

        to {
            transform: scale(1)
        }
    }
</style>