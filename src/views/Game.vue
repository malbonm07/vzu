<template>
  <div class="game">

    <!------------------- STEP 1------------------->
    <AppPanel v-if="game.currentStep == 1" class="game-step-1">
      <AppForm @submitForm="nextStep"></AppForm>
    </AppPanel>
    <!------------------- END STEP ------------------->


    <!----------------------- STEP 2 -------------------------->
    <AppPanel v-else class="game-step-2" ref="game">

      <!------------------- HEADER ------------------->
      <AppHeader :name="userName" :time="time" :animate-time="animateTime" :animate-increment="animateIncrement"></AppHeader>
      <!------------------- END HEADER------------------->

      <!------------------- MAIN BODY ------------------->
      <main class="main">

        <!------------------- CARDS GROUP ------------------->
        <AppTable class="drag-group">
          <div v-for="card in shuffledCards" :key="card.key" class="drag-group__item">
            <drag v-if="!card.isAvailable" :drag-image-opacity="0.8" :data="currentDragCard" type="object" class="drop-group__item-unavailable" @dragstart="dragged(card)">
              <div class="image-container">
                <img class="logo-image" :src="card.image" :alt="card.alt">
              </div>
            </drag>
            <drop v-else class="drop-group__item-available drop-allowed-turn-off" @drop="onCardReturnedTop" :id="card.key">
            </drop>      
          </div>
        </AppTable>
        <!------------------- END CARDS GROUP ------------------->

        <p>...and drop them here to make the logo great <span>again!</span></p>

        <!------------------- SLOTS GROUP ------------------->
        <AppTable class="drop-group">
          <AppCardSlot v-for="(slot) in droppableSlots" :key="slot.pairMatch" type="slot" :data="slot" :currentDragCard="currentDragCard" @dragstart="dragged" @drop="onCardDrop"></AppCardSlot>
        </AppTable>
        <!------------------- END SLOTS GROUP ------------------->
      </main>
      <!------------------- END MAIN BODY------------------->

    </AppPanel>
    <!------------------------ END STEP 2 ------------------------>

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
import AppForm from '@/components/AppForm.vue';
import AppTable from '@/components/AppTable.vue';
import AppCardSlot from '@/components/AppCardSlot.vue';
import AppHeader from '@/components/AppHeader.vue';
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
    AppForm,
    AppHeader,
    AppCardSlot,
    AppTable,
    Drag,
    Drop
  },
  data: function() {
    return {
      userName: '',
      game: {
        currentStep: 1,
        hasStarted: false
      },
      time: 0,
      restartCountdown: 10,
      matchs: 0,
      currentDragCard: {},
      pickupCards: cards,
      shuffledCards: [],
      droppableSlots: [
        {
          isAvailable: true,
          pairMatch: 1,
          matched: false,
          data: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 2,
          matched: false,
          data: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 3,
          matched: false,
          data: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 4,
          matched: false,
          data: {
            image: '',
            alt: '',
            id: null
          }
        },
        {
          isAvailable: true,
          pairMatch: 5,
          matched: false,
          data: {
            image: '',
            alt: '',
            id: null
          }
        }
      ],
      notification: {
        timer: false
      }
    };
  },
  methods: {
    nextStep({name}) {
      this.userName = name
      this.game.currentStep = 2;
    },
    setup() {
      const cards = this.pickupCards.map(c => {
        return Object.assign({}, c)
      })
      this.shuffledCards = shuffle(cards);
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
      this.droppableSlots.forEach(slot => {
        const clearCurrentdata = {
          image: '',
          alt: '',
          id: null
        }
        slot.isAvailable = true;
        slot.matched = false;
        slot.data = clearCurrentdata;
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

      const card = Object.assign({}, this.currentDragCard);
      const index = this.droppableSlots.findIndex(slot => slot.pairMatch === e.top.$attrs.id)
      const slot = this.droppableSlots[index]

      if(slot.isAvailable) {
        if(isMatch(slot.pairMatch, card.id)) {
          this.removeAndUpdate(slot, card);
          slot.matched = true;
          slot.isAvailable = false;
          slot.data = card;
          this.matchs += 1

          if(this.matchs > 4) {
            this.finish();
            return;
          }
          
        }
        else {
          this.increaseTime();
          this.removeAndUpdate(slot, card);
        }
      }
    },
    onCardReturnedTop(e) {

      const cardInHand = Object.assign({}, this.currentDragCard);
      const {image, alt, id} = cardInHand;
      const indexPre = this.shuffledCards.findIndex(kard => kard.id === cardInHand.id);
      const indexNext = this.shuffledCards.findIndex(slot => slot.key === e.top.$attrs.id);
      const nextSlot = this.shuffledCards[indexNext];
      const slotIndex = this.droppableSlots.findIndex(slot => slot.data.id === cardInHand.id);

      if(!cardInHand.isAvailable) {
        this.clearSlot(indexPre, 'top')
      }
      else {
        this.clearSlot(slotIndex, 'bottom')
      }

      // Adding card data to next slot
      nextSlot.image = image
      nextSlot.alt = alt
      nextSlot.id = id
      nextSlot.isAvailable = false
    },
    removeAndUpdate(slot, card) {

      let index = this.shuffledCards.findIndex(scard => scard.id === card.id);

      if(!card.isAvailable) {
        card.isAvailable = true
        slot.data = card;
        slot.isAvailable = false;

        this.clearSlot(index, 'top')
      }
      else {

        const indexToDelete = this.droppableSlots.findIndex(slot => slot.data.id === card.id)
        this.clearSlot(indexToDelete, 'bottom')
        const indexToAdd = this.droppableSlots.findIndex(zlot => zlot.pairMatch === slot.pairMatch)
        let nextSlot = this.droppableSlots[indexToAdd]
        nextSlot.data = card;
        nextSlot.isAvailable = false;
      }
    },
    increaseTime() {
      this.time += 10;
      this.notification.timer = true;
      setTimeout(() => {
        this.notification.timer = false;
      }, 600)
    },
    clearSlot(i, area) {

      if(area === 'bottom') { // bottom area
        let slotBOTTOM = this.droppableSlots[i];
        if(slotBOTTOM.matched) this.matchs -= 1
        slotBOTTOM.data = {};
        slotBOTTOM.matched = false
        slotBOTTOM.isAvailable = true;
      }
      else { // top area
        let slotTOP = this.shuffledCards[i]
        slotTOP.alt = '';
        slotTOP.id = null;
        slotTOP.image = '';
        slotTOP.isAvailable = true;
      }
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
    animateIncrement() {
      return this.notification.timer == true ? 'increment-effect' : null
    },
    score() {
      let score = this.time.toString();
      return score
    }
  },
  watch: {
    restartCountdown() {
      if(this.restartCountdown < 1) return this.restart(); 
    }
  },
  created() {
    this.setup();
  },
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
  min-height: var(--square-size);
  &__item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: var(--square-size);
    border-radius: var(--square-br);
    background-color: #FFF;
    border-bottom: 2px solid rgba(196, 202, 211, 0.4);
    box-shadow: 0px 2px 14px rgba(196, 202, 211, 0.3);
    z-index: 5;
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
  background: darken(#f5f6f9, 3%);
}

// ######################  ANIMATION #########################
.modal-enter-active {
  animation: mAnimation .3s;
}
.modal-leave-active {
  animation: mAnimation .1s ease-out reverse;
}

@keyframes mAnimation { // Modal
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
