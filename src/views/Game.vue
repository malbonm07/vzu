<template>
  <div class="game">

    <!------------------- STEP 1------------------->
    <AppPanel v-if="game.currentStep == 1" class="game-step-1">
        <div class="panel-form">
          <p class="panel-form__title">Hello friend, tell me your name...</p>
          <input v-model="userName" v-on:keyup.enter="nextStep" class="panel-form__input" type="text" placeholder="Your name here">
          <p v-show="messages.submitError" class="error-message">{{messages.submitError}}</p>
          <button @click="nextStep" class="panel-form__btn">Let's go <i class="arrow right"></i></button>
        </div>
    </AppPanel>
    <!------------------- END STEP ------------------->


    <!------------------- STEP 2------------------->
    <AppPanel v-else class="game-step-2">

      <!------------------- HEADER ------------------->
      <header class="header">
        <div class="header__name">
          <p class="header__name-title">Good luck, {{userName}}!</p>
          <p class="header__name-subtitle">Pick up the right cards</p>
        </div>
        <div class="header__time">
          <p class="header__time-title"><span class="header__time-title-clock-icon"></span>Your score: <span class="countdown" :class="animateTime">{{time}}</span>seconds</p>
          <p>The faster the better!</p>
        </div>
      </header>
      <!------------------- END HEADER------------------->

      <!------------------- MAIN BODY ------------------->
      <main class="main">

        <!------------------- CARDS GROUP ------------------->
        <div class="grid-area drag-group">
          <drag v-for="card in shuffledCards" :key="card.id" @dragstart="dragged(card)" class="drag-group__item" :drag-image-opacity="0.8" :data="currentDragCard" type="object">
            <div class="image-container">
              <img class="logo-image" :src="card.image" :alt="card.alt">
            </div>
          </drag>
          <drop v-for="slot in shuffledSlots" :key="slot.id" class="drop-allowed-turn-off" @drop="onCardReturnedTop">
          </drop>
        </div>
        <!------------------- CARDS GROUP ------------------->

        <p>...and drop them here to make the logo great <span>again!</span></p>

        <!------------------- SLOTS GROUP ------------------->
        <div class="grid-area drop-group">
          <div class="drop-group__item" v-for="(slot) in droppableSlots" :key="slot.id">
            <drop v-if="slot.isAvailable" class="drop-group__item-available" @drop="onCardDrop" :ref="slot.id" :id="slot.pairMatch">
            </drop>
            <drag v-else :disabled="slot.matched" class="drop-group__item-unavailable" :data="currentDragCard" :id="slot.pairMatch" @dragstart="dragged(slot.currentData)">
              <div class="image-container">
                <img class="logo-image" :src="slot.currentData.image" :alt="slot.currentData.alt">
              </div>
            </drag>
          </div>
        </div>
        <!------------------- SLOTS GROUP ------------------->
      </main>
      <!------------------- END MAIN BODY------------------->

    </AppPanel>
    <!------------------- END STEP ------------------->

    <!------------------- MODAL SCORE ------------------->
    <transition name="modal">
      <AppModal v-if="isOver" :time="score">
        <p>The game will restart in {{restartCountdown}} seconds.</p>
      </AppModal>
     </transition>
     <!------------------- END MODAL ------------------->

  </div>
</template>

<script>
'use strict'
// COMPONENTS
import AppPanel from '@/components/AppPanel.vue';
import AppModal from '@/components/AppModal.vue';
import { Drag, Drop } from "vue-easy-dnd";

// HELPER FUNCTIONS
import {shuffle, isMatch} from '@/utils/helpers.js';

// DATA
import {cards} from '@/utils/data.js';

export default {
  name: 'Game',
  components: {
    AppPanel,
    AppModal,
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
      restartCountdown: 10,
      currentDragCard: {},
      matchs: 0,
      pickupCards: cards,
      shuffledCards: [],
      shuffledSlots: [],
      droppableSlots: [
        {
          isAvailable: true,
          pairMatch: 1,
          matched: false,
          currentData: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 2,
          matched: false,
          currentData: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 3,
          matched: false,
          currentData: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 4,
          matched: false,
          currentData: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 5,
          matched: false,
          currentData: {
            image: '',
            alt: '',
            id: null
          }
        }
      ],
      messages: {
        submitError: null
      },
      notification: {
        timer: false
      }
    };
  },
  methods: {
    nextStep() {
      const regex = /^\S+(?: \S+)*$/;
      if(regex.test(this.userName) && this.userName.length < 16) {
        this.game.currentStep = 2;
      }
      else {
        this.messages.submitError = 'Please enter a valid name with maximum 15 characters';
      }
    },
    setup() {
      this.shuffledCards = shuffle(this.pickupCards)
    },
    start() {
      this.game.hasStarted = true;
      this.timeRunnig = setInterval(() => {
        this.time += 1;
      },1000);
    },
    restart() {
      this.game.hasStarted = false;
      this.time = 0;
      this.matchs = 0;
      this.restartCountdown = 10;
      this.currentDragCard = {};
      this.shuffledSlots = [];
      this.droppableSlots.forEach(slot => {
        const clearCurrentdata = {
          image: '',
          alt: '',
          id: null
        }
        slot.isAvailable = true;
        slot.matched = false;
        slot.currentData = clearCurrentdata;
      });
      clearInterval(this.restartTime);
      this.setup();
    },
    finish() {
      clearInterval(this.timeRunnig);
      this.restartTime = setInterval(() => {
        this.restartCountdown -= 1;
      },1000);
    },
    dragged(target) {
      this.currentDragCard = target;
      if(!this.game.hasStarted) {
        this.start();
      }
    },
    onCardDrop(e) {
      
      const card = this.currentDragCard;
      const slotIndex = this.droppableSlots.findIndex(slot => slot.pairMatch === e.top.$attrs.id)
      const slot = this.droppableSlots[slotIndex]
      if(slot.isAvailable) {
        if(isMatch(slot.pairMatch, card.id)) {
          this.removeAndUpdate(slot, card);
          slot.matched = true;
          slot.isAvailable = false;
          slot.currentData = card;
          this.matchs += 1
        }
        else {
          this.increaseTime();
          this.removeAndUpdate(slot, card);
        }
      }
    },
    onCardReturnedTop() {

      const card = this.currentDragCard;
      if(this.shuffledCards.length === 4) this.shuffledSlots.splice(0,1);
      if(this.shuffledCards.findIndex(kard => kard.id === card.id) >= 0) return;
      const slotIndex = this.droppableSlots.findIndex(slot => slot.currentData.id === card.id)
      const slot = this.droppableSlots[slotIndex]
      if(!slot) return;
      this.clearSlot(slotIndex)
      this.shuffledCards.push(card);
    },
    removeAndUpdate(slot, card) {

      let slotIndex = this.shuffledCards.findIndex(kard => kard.id === card.id);

      if(slotIndex >= 0) {
        this.shuffledCards.splice(slotIndex, 1)
        slot.currentData = card;
        slot.isAvailable = false;
        if(this.shuffledSlots.length > 0) return;
        this.shuffledSlots.push({})
      }
      else {
        const indexToDelete = this.droppableSlots.findIndex(slot => slot.currentData.id === card.id)
        this.clearSlot(indexToDelete)
        const indexToAdd = this.droppableSlots.findIndex(zlot => zlot.pairMatch === slot.pairMatch)
        let nextSlot = this.droppableSlots[indexToAdd]
        nextSlot.currentData = card;
        nextSlot.isAvailable = false;
      }
    },
    increaseTime() {
      this.time += 10;
      this.notification.timer = true;
      setTimeout(() => {
        this.notification.timer = false;
      }, 1000)
    },
    clearSlot(i) {
      let previousSlot = this.droppableSlots[i];
      previousSlot.currentData = {};
      previousSlot.isAvailable = true;
    },
  },
  computed: {
    isOver() {
      if(this.matchs > 4) return true;
      return false;
    },
    animateTime() {
      return this.notification.timer == true ? 'time-updated' : null
    },
    score() {
      let score = this.time.toString();
      return score
    }
  },
  watch: {
    matchs() {
      if(this.matchs == 5) {
        this.finish();
        setTimeout(() => {
          this.restart();
        }, 10000)
      }
    }
  },
  created() {
    this.setup();
  }
}
</script>

<style lang="scss">

.game {
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
    padding: 12px 16px;
    border: 1px solid #e2e4e9;
    border-radius: 30px;
    background-color: #FEFEFE;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
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

.header {
  padding: 40px 10px 20px 10px;
  max-width: var(--max-desktop-width);
  margin: auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    justify-items: center;
  }
  @media (min-width: 1020px) {
    padding-left: 0;
    padding-right: 0;
  }
  &__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--secondary-font-color);
    &-title {
      font-weight: bold;
      font-size: 24px;
      color: var(--primary-font-color);
      margin-bottom: 30px;
    }
    &-subtitle {
      letter-spacing: 1px;
    }
  }
  &__time {
    color: var(--secondary-font-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 768px) {
      text-align: right;
    }
    &-title {
      display: flex;
      color: var(--primary-color);
      font-size: 16;
      font-size: light;
      letter-spacing: 2px;
      margin-bottom: 30px;
      margin-top: 20px;
      @media (min-width: 768px) {
        justify-content: center;
        font-size: 24px;
        margin-top: 0px;
      }
      .countdown {
        display: inline-block;
        width: auto;
        height: auto;
        margin-left: 5px;
        margin-right: 5px;
      }
      &-clock-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 30px;
        width: 30px;
        margin-right: 8px;
        border: 3px  solid var(--dashed-border-color);
        border-radius: 50%;
        transform: scale(0.7)translateY(-2px);
        &::after {
          content: "";
          height: 9px;
          width: 3px;
          background-color: var(--dashed-border-color);
          transform: translateY(-3px);
        }
        &::before {
          content: "";
          width: 9px;
          height: 3px;
          background-color: var(--dashed-border-color);
          transform: translateX(-4px) translateY(2px) rotate(30deg);
          position: absolute;
          right: 0;
        }
      }
      .time-updated {
        color: red;
        animation: scaler 0.3s ease-in-out;
      }
    }
  }
}

@keyframes scaler {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

.main {
  padding: 40px 10px;
  max-width: var(--max-desktop-width);
  margin: auto;
  p {
    margin-bottom: 30px;
    color: var(--secondary-font-color);
    span {
      color: #d5dbe5;
    }
  }
  @media (min-width: 1020px) {
    padding-left: 0;
    padding-right: 0;
  }
}

.grid-area {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(3, var(--quare-size));
  justify-content: center;
  grid-gap: 5px;
  transition: 1s;
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, var(--quare-size));
    justify-content: center;
    grid-gap: 30px;
    grid-auto-flow: dense;
  }
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo-image {
    width: 50%;
    position: relative;
    z-index: -1;
  }
}

.drag-group {
  margin-bottom: 100px;
  min-height: var(--quare-size);
  &__item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: var(--quare-size);
    border-radius: var(--square-br);
    background-color: #FFF;
    border-bottom: 2px solid rgba(196, 202, 211, 0.4);
    box-shadow: 0px 2px 14px rgba(196, 202, 211, 0.3);
    z-index: 5;
  }
}

.drop-group {
  &__item {
    width: 100%;
    height: var(--quare-size);
    border-radius: var(--square-br);
    &-unavailable {
      width: var(--quare-size);
      height: var(--quare-size);
      background-color: #FFF;
      border-radius: var(--square-br);
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 5;
    }
    &-available {
      width: var(--quare-size); height: var(--quare-size);
      border-radius: var(--square-br);
      background-position:  0 0, 0 0, 100% 0, 0 100%;
      background-size: 3px 100%, 100% 3px, 3px 100% , 100% 3px;
      background-repeat: no-repeat;
      background-image:
      repeating-linear-gradient(0deg, var(--dashed-border-color), var(--dashed-border-color) 10px, transparent 10px, transparent 20px), // left
      repeating-linear-gradient(90deg, var(--dashed-border-color), var(--dashed-border-color) 10px, transparent 10px, transparent 20px), // top
      repeating-linear-gradient(180deg, var(--dashed-border-color), var(--dashed-border-color) 10px, transparent 10px, transparent 20px), // right
      repeating-linear-gradient(270deg, var(--dashed-border-color), var(--dashed-border-color) 10px, transparent 10px, transparent 20px) // bottom
      ;
      border-image: repeating-linear-gradient(0deg, var(--dashed-border-color), var(--dashed-border-color) 10px, transparent 10px, transparent 20px);
      };
      background-color: #F5F6F9;
  }
}

.drop-allowed {
  background-color: rgba(0, 255, 0, 0.08);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  border-radius: var(--square-br);
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
}
.drop-allowed-turn-off {
  display: inline-block;
  background: transparent;
}

// ######################  ANIMATION #########################
.modal-enter-active {
  animation: mAnimation .3s;
}
.modal-leave-active {
  animation: mAnimation .1s ease-out reverse;
}
@keyframes mAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>