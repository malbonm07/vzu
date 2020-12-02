<template>
  <div class="home">
    <AppPanel v-if="game.currentStep == 1" class="game-step-1">
        <div class="panel-form">
          <p class="panel-form__title">Hello friend, tell me your name...</p>
          <input v-model="userName" v-on:keyup.enter="nextStep" class="panel-form__input" type="text" placeholder="Your name here">
          <p v-show="messages.submitError" class="error-message">{{messages.submitError}}</p>
          <button @click="nextStep" class="panel-form__btn">Let's go <i class="arrow right"></i></button>
        </div>
    </AppPanel>
    <AppPanel v-else class="game-step-2">
      <header>
        <div>
          <h1>Good luck, {{userName}}!</h1>
        </div>
      </header>
      <main></main>
    </AppPanel>
    <transition-group name="list" tag="div">
      <drag v-for="n in items" :key="n" @dragstart="prueba(n)" class="drag" :data="n" :type="typeof n">{{n}}</drag>
    </transition-group>
    <div class="group">
      <drop class="ones" @drop="onOneDrop" accepts-type="number" :accepts-data="(d) => d === 1">
        <span v-if="oneDropped">drop</span>
      </drop>
      <drop class="twos" @drop="onTwoDrop" accepts-type="number" :accepts-data="(d) => d === 2">
        <span v-if="twoDropped">drop</span>
      </drop>
      <drop class="as" @drop="onADrop" accepts-type="string" :accepts-data="(d) => d === 'a'">
        <span v-if="aDropped">drop</span>
      </drop>
      <drop class="bs" @drop="onBDrop" accepts-type="string" :accepts-data="(d) => d === 'b'">
        <span v-if="bDropped">drop</span>
      </drop>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppPanel from '@/components/AppPanel.vue'
import { Drag, Drop } from "vue-easy-dnd";

export default {
  name: 'Home',
  components: {
    AppPanel,
    Drag,
    Drop
  },
  data: function() {
    return {
      game: {
        currentStep: 1,
        hasStarted: false
      },
      userName: '',
      time: 0,
      pickupCards: [
        {
          image: '',
          id: '',
          position: ''
        }
      ],
      zoovuDroppableArea: [],
      messages: {
        submitError: null
      },

      items: [1, "a", 2, "b"],
      oneDropped: false,
      twoDropped: false,
      aDropped: false,
      bDropped: false
    };
  },
  methods: {
    setup() {

    },
    shuffle(array) {
      console.log(array)
    },
    restart() {

    },
    nextStep() {
      const regex = /^\S+(?: \S+)*$/;
      if(regex.test(this.userName) && this.userName.length < 16) {
        this.game.currentStep = 2;
      }
      else {
        this.messages.submitError = 'Please enter a valid name with maximum 15 characters'
      }
    },
    onOneDrop(e) {
      console.log(e);
      this.oneDropped = true;
    },
    onTwoDrop(e) {
      console.log(e);
      this.twoDropped = true;
    },
    onADrop(e) {
      console.log(e);
      this.aDropped = true;
    },
    onBDrop(e) {
      console.log(e);
      this.bDropped = true;
    },
    prueba(n) {
      console.log(n)
    }
  }
}
</script>

<style lang="scss">

html,
body {
  height: 100%;
  font-family: "Roboto";
}

.home {
  min-height: 100vh;
}

.game-step-1, .game-step-2 {
  width: 100%;
  min-height: 100vh;
}
.game-step-1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.panel-form {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  &__title {
    color: #2A2A2A;
  }
  &__input {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #e0e2e5;
    color: #555;
    padding: 10px 0px;
    text-align: center;
  }
  &__btn {
    color: #612E96;
    font-weight: bold;
    padding: 10px 14px;
    border: 1px solid #dbdde0;
    border-radius: 30px;
    background-color: #FEFEFE;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
    .arrow {
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-left: 8px;
      border-top: 3px solid #612E96;
      border-left: 3px solid #612E96;
      transform: rotate(135deg);
      border-radius: 2px;
      &::after{
        content: "";
        display: block;
        width: 1.8px;
        height: 10px;
        background-color: #612E96;
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
.drag {
  width: 60px;
  height: 60px;
  background-color: rgb(220, 220, 255);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 10px;
  font-size: 20px;
  transition: all 0.5s;
}

.group {
  display: flex;
}

.as,
.bs,
.ones,
.twos {
  margin: 20px 10px;
  border: 1px solid black;
  height: 100px;
  position: relative;
  flex: 1;
  padding: 10px;
}

.as::before,
.bs::before,
.ones::before,
.twos::before {
  color: rgba(0, 0, 0, 0.4);
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.as::before {
  content: "As";
}

.bs::before {
  content: "Bs";
}

.ones::before {
  content: "ONEs";
}

.twos::before {
  content: "TWOs";
}

.drop-allowed {
  background-color: rgba(0, 255, 0, 0.2);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
