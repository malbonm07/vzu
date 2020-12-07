<template functional>
    <header class="header">
        <div class="header__name">
            <p class="header__name-title">Good luck, {{props.name}}!</p>
            <p class="header__name-subtitle">Pick up the right cards</p>
        </div>
        <div class="header__time">
            <p class="header__time-title"><span class="header__time-title-clock-icon"></span>Your score: <span class="countdown" :class="props.animateTime"><span :class="props.animateIncrement" v-show="props.animateIncrement" >+10</span>{{props.time}}</span>seconds</p>
            <p>The faster the better!</p>
        </div>
    </header>
</template>

<script>
</script>

<style lang="scss">
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
        position: relative;
        margin-left: 5px;
        margin-right: 5px;
        .increment-effect {
          font-family: Avenir, Arial, Helvetica, sans-serif;
          font-weight: bold;
          position: absolute;
          animation:fadeInUp 0.6s ease backwards;
          color: red;
          @keyframes fadeInUp{
            0%{transform:translate(-8px, 50px); opacity: 1;}
            100%{transform:translate(-8px, 10px); opacity: 0;}
          }
        }
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
        transform: scale(0.7)translateY(0px);
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
        animation-delay: 0.2s;
      }
    }
  }
}

@keyframes scaler { // Increase countdown
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.4);
  }
}
</style>