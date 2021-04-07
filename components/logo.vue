<template>
  <img
    class="Logo"
    alt="Logo"
    src="wheel.png"
  >
</template>

<style>
.Logo {
  height: 40px;
  width: 40px;
  transform: rotateY(560deg) rotateZ(360deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
