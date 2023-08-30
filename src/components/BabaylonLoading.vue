<template>
  <div id="loadImg" :class="[visual?'shownZone':'hideZone']">
    <div class="loadText">{{ loadingUIText }}</div>
    <div class="loadLogo">
      <img alt="" src="../assets/babylon.svg" />
    </div>
    <div class="loadSpin">
      <img alt="" src="../assets/spin.svg" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ILoadingScreen } from '@babylonjs/core'

/**
 * 参考默认实现类 DefaultLoadingScreen 样式搭配
 */
@Options({})
export default class BabylonLoading extends Vue implements ILoadingScreen {
  loadingUIBackgroundColor = '#320221'
  loadingUIText = ''
  visual = false

  displayLoadingUI () {
    if (this.visual) {
      return
    }
    this.visual = true
  }

  hideLoadingUI () {
    if (this.visual) {
      this.visual = false
    }
  }
}
</script>
<style>
#loadImg {
  position: absolute;
  height: 100%;
  width: 100%;
}
.hideZone {
  display: none;
}
.shownZone {
  background-color: #f0ffffD4;
}
.loadLogo {
  width: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.loadSpin {
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.loadSpin img {
  animation: 0.75s linear 0s infinite normal none running spin1;
  transform-origin: 50% 50%;
}
@-webkit-keyframes spin1 {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
