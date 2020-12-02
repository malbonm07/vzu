<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("//db.onlinewebfonts.com/c/9b1751bc70848a2a5938ba449afd2909?family=Campton");
:root {    
    --max-desktop-width: 1400px;
    --primary-color: #612E96;
    --secondary-color:  #2f2f2f;
    --primary-font-color: #2A2A2A;
    --secondary-font-color: #CFD4DD;
    --smoke-color: #cccccc;
    --bg-primary: #f4f5f8;
    --bg-secondary: #FAFAFC;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Campton', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
