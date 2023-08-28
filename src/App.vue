<template>
  <div id="loading" >
    <!-- v-if="switching" -->
    <img alt="loading photo" src="./assets/loading-spinner-svgrepo-com.svg" />
    <div>FILE LOADING</div>
  </div>
  <nav>
    | <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/babylon">Babylon</router-link> |
    <router-link to="/maps">Maps</router-link> |
  </nav>
  <router-view/>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  watch: {
    '$store.state.app.switch': {
      handler (nw) {
        this.switching = nw
      }
    }
  }
})
export default class App extends Vue {
  switching = true
}
</script>
<style>
html,body,canvas,img {
  width: 100%;
  height: 100%;
  margin: 0;
  border: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}

#loading {
  width: 100%;
  height: 100%;
  background-color: #808080D2;
  position: absolute;
}

#loading div {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 300px;
}

#loading img {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: 3s linear 0s infinite load;
}

@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

nav {
  padding: 30px;
  height: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
