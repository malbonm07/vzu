<template>
  <div class="app-panel">
    <slot></slot>
    <div class="app-panel-bg">
      <div class="bg-figure triangle"></div>
      <div class="bg-figure circle"></div>
      <div class="bg-figure circle"></div>
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
    position: absolute;
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
      transform: scale(1.6) rotate(40deg) translateY(60px);
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
}
.circle:nth-last-child(2) {
  transform: translateY(-20px);
}
.triangle {
  width: 0;
  height: 0;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 180px solid #FCFCFD; 
  border-left: 80px solid transparent; 
  border-right: 80px solid transparent;
  transform: rotate(-265deg) translateY(-40px) translateX(-10px);
}
</style>