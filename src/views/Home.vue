<template>
  <div class="home">

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
          <p class="header__time-title">Your score: {{time}} seconds</p>
          <p>The faster the better!</p>
        </div>
      </header>
      <!------------------- END HEADER------------------->

      <!------------------- MAIN BODY ------------------->
      <main class="main">

        <!------------------- CARDS GROUP ------------------->
        <div class="grid-area drag-area">
          <drag v-for="card in shuffledCards" :key="card.id" @dragstart="dragged(card)" class="drag-area__item" :drag-image-opacity="0.8" :data="currentCard" type="object">
              <img :src="card.image" :alt="card.alt">
          </drag>
          <drop v-for="slot in emptyShuffledSlots" :key="slot.id" class="drop-allowed-turn-off" @drop="onCardReturned">
          </drop>
        </div>
        <!------------------- CARDS GROUP ------------------->

        <p>...and drop them here to make the logo great <span>again!</span></p>

        <!------------------- SLOTS GROUP ------------------->
        <div class="grid-area drop-area">
          <div class="drop-area__item" v-for="(slot) in droppableSlots" :key="slot.id">
            <drop v-if="slot.isAvailable" class="drop-area__item-available" @drop="onCardDrop" :ref="slot.id" :id="slot.pairMatch">
            </drop>
            <drag v-else :disabled="slot.matched" class="drop-area__item-unavailable" :data="currentCard" :id="slot.pairMatch" @dragstart="dragged(slot.currentData)">
              <img :src="slot.currentData.image" :alt="slot.currentData.alt">
            </drag>
          </div>
        </div>
        <!------------------- SLOTS GROUP ------------------->
      </main>
      <!------------------- END MAIN BODY------------------->

    </AppPanel>
    <!------------------- END STEP ------------------->

  </div>
</template>

<script>

import zoovuZ from '@/assets/images/zoovu-z.svg';
import zoovuO from '@/assets/images/zoovu-o.svg';
import zoovuV from '@/assets/images/zoovu-v.svg';
import zoovuU from '@/assets/images/zoovu-u.svg';

import AppPanel from '@/components/AppPanel.vue';
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
      currentCard: {},
      matchs: 0,
      pickupCards: [
        {
          image: zoovuZ,
          alt: 'z',
          id: 1,
        },
        {
          image: zoovuO,
          alt: 'o',
          id: 2,
        },
        {
          image: zoovuO,
          alt: 'o',
          id: 3,
        },
        {
          image: zoovuV,
          alt: 'v',
          id: 4,
        },
        {
          image: zoovuU,
          alt: 'u',
          id: 5,
        },
      ],
      shuffledCards: [],
      emptyShuffledSlots: [],
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
    };
  },
  methods: {
    setup() {
      this.shuffledCards = this.shuffle(this.pickupCards)
    },
    start() {
      this.game.hasStarted = true;
      this.initTimer();
    },
    finish() {
      alert('el juego ha terminado');
      clearInterval(this.timeRunnig);
    },
    shuffle(array) {
      if([...array].length < 1) return;
      let shuffledArray = [...array].sort(() => Math.random() - 0.5)
      return shuffledArray;
    },
    restart() {
      this.game.hasStarted = false;
      this.time = 0;
      this.matchs = 0;
      this.currentCard = {};
      this.droppableSlots.forEach(slot => {
        const clearCurrentdata = {
          image: '',
          alt: '',
          id: null
        }
        slot.isAvailable = true;
        slot.matched = false;
        slot.currentData = clearCurrentdata;
      })
      this.setup();
    },
    initTimer() {
      this.timeRunnig = setInterval(() => {
        this.time += 1;
      },1000);
    },
    nextStep() {
      const regex = /^\S+(?: \S+)*$/;
      if(regex.test(this.userName) && this.userName.length < 16) {
        this.game.currentStep = 2;
      }
      else {
        this.messages.submitError = 'Please enter a valid name with maximum 15 characters';
      }
    },
    onCardDrop(e) {
      
      const card = this.currentCard;
      const slotIndex = this.droppableSlots.findIndex(slot => slot.pairMatch === e.top.$attrs.id)
      const slot = this.droppableSlots[slotIndex]
      if(slot.isAvailable) {
        if(this.isMatch(slot.pairMatch, card.id)) {
          this.removeAndUpdate(slot, card);
          slot.matched = true;
          slot.isAvailable = false;
          slot.currentData = card;
          this.matchs += 1
        }
        else {
          this.time += 10;
          this.removeAndUpdate(slot, card);
        }
      }
    },
    onCardReturned() {

      const card = this.currentCard;
      if(this.shuffledCards.findIndex(kard => kard.id === card.id) >= 0) return;
      const slotIndex = this.droppableSlots.findIndex(slot => slot.currentData.id === card.id)
      const slot = this.droppableSlots[slotIndex]
      if(!slot) return;
      this.clearSlot(slotIndex)
      this.shuffledCards.push(card);
    },
    dragged(target) {
      this.currentCard = target;
      if(!this.game.hasStarted) {
        this.start();
      }
    },
    removeAndUpdate(slot, card) {

      let slotIndex = this.shuffledCards.findIndex(kard => kard.id === card.id);

      if(slotIndex >= 0) {
        this.shuffledCards.splice(slotIndex, 1)
        slot.currentData = card;
        slot.isAvailable = false;
        if(this.emptyShuffledSlots.length > 0) return;
        this.emptyShuffledSlots.push({})
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
    clearSlot(i) {
      let previousSlot = this.droppableSlots[i];
      previousSlot.currentData = {};
      previousSlot.isAvailable = true;
    },
    isMatch(a,b) {
      const uidExchange = ['z','o','o','v','u']
      if(uidExchange[a-1] === uidExchange[b-1]) return true;
      return false
    }
  },
  computed: {
    hasEmptySLots() {
      return this.emptyShuffledSlots.length > 0;
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

.header {
  padding: 40px 10px 20px 10px;
  max-width: 1120px;
  margin: auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    justify-items: center;
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
      color: var(--primary-color);
      font-size: 24px;
      font-size: light;
      letter-spacing: 2px;
      margin-bottom: 30px;
    }
  }
}

.main {
  padding: 40px 10px;
  max-width: var(--max-witdh);
  margin: auto;
  p {
    margin-bottom: 30px;
    padding-left: 30px;
    color: var(--secondary-font-color)
  }
}

.grid-area {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  justify-content: center;
  /* grid-auto-rows: minmax(120px, auto); */
  /* padding: 10px; */
  grid-gap: 30px;
  grid-auto-flow: dense;
}

.drag-area {
  margin-bottom: 100px;
  min-height: 200px;
  &__item {
    width: 100%;
    height: 200px;
    border-radius: 24px;
    background-color: #FFF;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.drop-area {
  &__item {
    width: 100%;
    height: 200px;
    &-unavailable {
      width: 200px;
      height: 200px;
      background-color: #FFF;
      border-radius: 24px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-available {
      width: 200px; height: 200px;
      border-radius: 20px;
      background-position:  0 0, 0 0, 100% 0, 0 100%;
      background-size: 3px 100%, 100% 3px, 3px 100% , 100% 3px;
      background-repeat: no-repeat;
      background-image:
      repeating-linear-gradient(0deg, var(--dashed-border), var(--dashed-border) 10px, transparent 10px, transparent 20px), // left
      repeating-linear-gradient(90deg, var(--dashed-border), var(--dashed-border) 10px, transparent 10px, transparent 20px), // top
      repeating-linear-gradient(180deg, var(--dashed-border), var(--dashed-border) 10px, transparent 10px, transparent 20px), // right
      repeating-linear-gradient(270deg, var(--dashed-border), var(--dashed-border) 10px, transparent 10px, transparent 20px) // bottom
      ;
      border-image: repeating-linear-gradient(0deg, var(--dashed-border), var(--dashed-border) 10px, transparent 10px, transparent 20px);
      }
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

.drop-allowed {
  background-color: rgba(0, 255, 0, 0.2);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}
.drop-allowed-turn-off {
  background: transparent;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
