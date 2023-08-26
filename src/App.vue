<template>
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
import { useStore } from 'vuex'
import { key } from './store'

@Options({
  computed: {
    switching: {
      get () {
        return useStore(key).state
      },
      set (val: boolean) {
        useStore(key).dispatch('/app/setval', val)
      }
    }
  }
})
export default class App extends Vue {}
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
