<template>
    <div class="drop-group__item">
        <drop v-if="slot.isAvailable" class="drop-group__item-available" @drop="drop" :id="slot.pairMatch">
        </drop>
        <drag v-else class="drop-group__item-unavailable" :data="currentDragCard" @dragstart="dragged">
            <div class="image-container">
                <img class="logo-image" :src="slot.data.image" :alt="slot.data.alt">
            </div>
        </drag>
    </div>
</template>

<script>

import { Drag, Drop } from "vue-easy-dnd";

export default {
    name: 'Card',
    components: {
        Drag,
        Drop
    },
    props: {
        type: {
            type: String,
            default: 'card'
        },
        data: {
            type: Object,
            required: true
        },
        currentDragCard: {
            type: Object
        }
    },
    methods: {
        dragged() {
            this.$emit('dragstart', this.data.data)
        },
        drop(e) {
            this.$emit('drop', e)
        }
    },
    computed: {
        slot() {
            return this.data
        }
    },
}
</script>

<style lang="scss">
.drop-group {
  &__item {
    width: 100%;
    height: var(--square-size);
    border-radius: var(--square-br);
    &-unavailable {
      width: var(--square-size);
      height: var(--square-size);
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
      width: var(--square-size); height: var(--square-size);
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
</style>