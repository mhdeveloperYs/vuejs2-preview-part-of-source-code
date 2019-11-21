<template>
	<div id="app">
       <div id="loading-bg">
      <div class="loading-logo">
        <img src="/images/logo.png" alt="Logo">
      </div>
      <div class="loading">
        <div class="effect-1 effects"></div>
        <div class="effect-2 effects"></div>
        <div class="effect-3 effects"></div>
      </div>
    </div>
		<router-view></router-view>
	</div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'

export default {
    watch: {
        '$store.state.theme'(val) {
            this.toggleClassInBody(val);
        }
    },
    methods: {
        toggleClassInBody(className) {
            if (className == 'dark') {
                if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
                document.body.classList.add('theme-dark');
            } else if (className == 'semi-dark') {
                if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
                document.body.classList.add('theme-semi-dark');
            } else {
                if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark');
                if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark');
            }
        }
    },
    mounted() {
        this.toggleClassInBody(themeConfig.theme)
    },
    created: function () {
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                    console.log("logout")
                    //this.$store.dispatch(logout)
                }
                throw err;
            });
        });
    }
}
</script>
<style>
#loading-bg{
  width: 100%;
  height: 100%;
  background: #FFF;
  display: block;
  position: absolute;
}
.loading-logo{
  position: absolute;
  left: calc(50% - 45px);
  top: 40%;
}
.loading {
  position: absolute;
  left: calc(50% - 35px);
  top: 50%;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid transparent;
}
.loading .effect-1,  .loading .effect-2{
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249,1);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effect-1{
  animation: rotate 1s ease infinite;
}
.loading .effect-2{
  animation: rotateOpacity 1s ease infinite .1s;
}
.loading .effect-3{
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249,1);
  -webkit-animation: rotateOpacity 1s ease infinite .2s;
  animation: rotateOpacity 1s ease infinite .2s;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effects{
  transition: all .3s ease;
}

@keyframes rotate{
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes rotateOpacity{
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: .1;
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    opacity: 1;
  }
}
</style>
