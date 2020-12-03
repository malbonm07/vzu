<template>
  <div class="app-panel">
    <slot></slot>
    <div class="app-panel-bg">
      <div class="bg-figure triangle"></div>
      <div class="bg-figure circle"></div>
      <!-- <div class="bg-figure circle"></div> -->
    </div>
  </div>
</template>

<style lang="scss">
.app-panel {
    width: 100%;
    min-height: inherit;
    position: relative;
    background: rgb(244,245,248);
    background: linear-gradient(4deg, rgba(244,245,248,1) 40%, rgba(250,251,252,1) 80%);
    z-index: 1;
    overflow: hidden;
}

.app-panel-bg {
    width: 200px;
    height: 100%;
    min-height: inherit;
    /* margin-left: auto;
    margin-right: auto; */
    position: fixed;
    z-index: -1;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0) rotate(20deg);
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
      transform: scale(1.4) rotate(40deg) translateY(60px);
    }
    @media (min-width: 1100px) {
      transform: scale(2) rotate(40deg) translateY(130px) translateX(20px);
    }
    /* background-color: #FAFAFC; */
    /* border: 1px solid #aeaeae; */
}

.bg-figure {
  width: 100%;
  min-height: 200px;
}
.circle {
  border-radius: 50%;
  background-color: #FAFAFC;
  box-shadow: 0px 220px #FAFAFC,
              0px 440px #FAFAFC,
              0px 660px #FAFAFC;
}
.triangle {
  width: 0;
  height: 0;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 180px solid #FAFAFC; 
  border-left: 80px solid transparent; 
  border-right: 80px solid transparent;
  transform: rotate(-265deg) translateY(-20px) translateX(34px);
}
</style>