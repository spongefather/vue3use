<template>
  <section id="loading" v-if="switching">
    <div class="load_img">
      <img alt="loading photo" src="./assets/loading-spinner-svgrepo-com.svg" />
    </div>
    <div class="load_text">FILE LOADING</div>
  </section>
  <nav>
    <span>| </span>
    <router-link to="/">Home</router-link>
    <span> | </span>
    <router-link to="/sphere">Sphere</router-link>
    <span> | </span>
    <router-link to="/babylon">Babylon</router-link>
    <span> | </span>
    <router-link to="/filament">Filament</router-link>
    <span> | </span>
    <router-link to="/maps">Maps</router-link>
    <span> | </span>
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

#app > div {
  height: calc(100% - 80px);
}

#loading {
  width: 100%;
  height: 100%;
  background-color: #808080D2;
  position: absolute;
}

.load_text {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 300px;
}

.load_img > img {
  animation: 1s linear 0s infinite load;
  transform-origin: 50% 50%;
}

.load_img {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

nav > a, nav > span  {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
