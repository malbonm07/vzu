<template functional>
  <div class="modal">
      <div class="modal__content">
          <p class="modal__content-title">YOU WON!</p>
          <p>You did it in <span class="score">{{props.time}}</span> seconds.</p>
          <slot></slot>
      </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.3);
  z-index: 10;
  &__content {
    /* min-height: 240px; */
    text-align: center;
    background: #ECEFF1;
    display: grid;
    align-items: center;
    row-gap: 40px;
    animation: content 0.3s ease-in forwards;
    font-size: 18px;
    padding: 40px;
    &-title {
      color:  #28A744;
      font-size: 26px;
    }
    .score {
      font-size: 20px;
      color: #28A744;
    }
    @media only screen and (min-width: 400px) {
      row-gap: 50px;
    }
  }
}

@keyframes content {
	from {
		opacity: 0;
		transform: translate3d(0, -100%, 0);
	}
	to {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}
}
</style>