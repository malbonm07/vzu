<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

:root {    
    --max-desktop-width: 730px;
    --primary-color: #3B0078;
    --secondary-color:  #2f2f2f;
    --primary-font-color: #2A2A2A;
    --secondary-font-color: #c4cad3;
    --smoke-color: #cccccc;
    --bg-primary: #f4f5f8;
    --bg-secondary: #FAFAFC;
    --dashed-border-color: #7deccb;
    --square-br:  16px;
    --square-size: 100px;
    @media (min-width: 768px) {
      --square-size: 120px
    }
    @media (min-width: 1000px) {
      --square-size: 180px;
      --max-desktop-width: 1020px;
    }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Poppins', sans-serif, Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
::-webkit-input-placeholder {
  color: #BDC4D0;
  font-style: italic;
}
:-moz-placeholder {
  color: #BDC4D0;
  font-style: italic;  
}
::-moz-placeholder {
  color: #BDC4D0;
  font-style: italic;  
}
:-ms-input-placeholder {
  color: #BDC4D0;
  font-style: italic; 
}
</style>
