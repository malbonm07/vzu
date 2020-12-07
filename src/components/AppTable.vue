<template>
  <div class="grid-area">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.grid-area {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(3, var(--square-size));
  justify-content: center;
  grid-gap: 5px;
  transition: 1s;
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, var(--square-size));
    justify-content: center;
    grid-gap: 30px;
    grid-auto-flow: dense;
  }
}
</style>