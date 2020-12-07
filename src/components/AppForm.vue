<template>
    <div class="panel-form">
        <p class="panel-form__title">Hello friend, tell me your name...</p>
        <input v-model="userName" v-on:keyup.enter="nextStep" class="panel-form__input" type="text" placeholder="Your name here">
        <p v-show="messages.submitError" class="error-message">{{messages.submitError}}</p>
        <button @click="nextStep" class="panel-form__btn">Let's go <i class="arrow right"></i></button>
    </div>
</template>

<script>

export default {
    name: 'Form',
    data() {
        return {
            userName: '',
            messages: {
                submitError: null
            }
        }
    },
    methods: {
        nextStep() {
            const regex = /^\S+(?: \S+)*$/;
            if(regex.test(this.userName) && this.userName.length < 16) {
                this.$emit('submitForm', {name: this.userName})
            }
            else {
                this.messages.submitError = 'Please enter a valid name with maximum 15 characters';
            }
        }
    }
}
</script>

<style lang="scss">
.panel-form {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    transform: translateY(-40px);
    &__title {
        color: #2A2A2A;
        font-size: 18px;
    }
    &__input {
        font-family: 'Campton', Avenir, Helvetica, Arial, sans-serif;
        width: 100%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #e0e2e5;
        color: #333;
        padding: 10px 0px;
        text-align: center;
        outline: none;
        font-size: 18px;
    }
    &__btn {
      color: var(--primary-color);
      font-weight: bold;
      font-size: 16px;
      padding: 12px 18px;
      border: 1px solid #e2e4e9;
      border-radius: 30px;
      background-color: #FEFEFE;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      .arrow {
        display: inline-block;
        width: 7px;
        height: 7px;
        margin-left: 8px;
        border-top: 3px solid var(--primary-color);
        border-left: 3px solid var(--primary-color);
        transform: rotate(135deg);
        border-radius: 2px;
        &::after{
            content: "";
            display: block;
            width: 1.8px;
            height: 10px;
            background-color: var(--primary-color);
            transform: rotate(-45deg) translate(2.8px, -1px);
            border-radius: 1px;
            left: 0;
            top: 0;
        }
      }
    }
    .error-message {
      font-size: 12px;
      font-weight: normal;
      color: red;
    }
} 
</style>