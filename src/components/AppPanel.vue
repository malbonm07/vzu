<template>
  <div class="app-panel">
    <slot></slot>
    <div class="app-panel-bg">
        <div class="bg-figure circle"></div>
        <div class="bg-figure circle"></div>
        <div class="bg-figure triangle"></div>
    </div>
  </div>
</template>

<style lang="scss">
.app-panel {
    width: 100%;
    min-height: inherit;
    position: relative;
    background-color: #f4f5f8;
    z-index: 1;
}

.app-panel-bg {
    min-width: 300px;
    max-width: 400px; 
    min-height: inherit;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    z-index: -1;
    display: flex;
    flex-direction: column;
    background-color: #FAFAFC;
    /* border: 1px solid #aeaeae; */
}

.bg-figure {
  width: 100%;
  min-height: 30%;
  background-color: #FAFAFC;
}
</style>