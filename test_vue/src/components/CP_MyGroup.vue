<template>
  <transition-group v-if="list" :name="transitionName" tag="div" appear>
    <slot name="list"></slot>
  </transition-group>
  <transition v-else :name="transitionName" appear>
    <slot name="signal"></slot>
  </transition>
</template>

<script>
// @Component({ name: 'FadeTransition' })
// export default class Transition extends Vue {
  // @Prop({ default: false }) readonly signal!: boolean;
  // @Prop({ default: false }) readonly list!: boolean;
  // @Prop({ default: false }) readonly open!: boolean;

export default {
  
  name: 'CP_MyGroup',
  props: {
    signal: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FadeTransition
  },

  // get transitionName() {
  //   if (this.open) {
  //     return this.list ? 'list' : 'fade';
  //   }
  //   return this.list ? 'list-no-animation' : 'fade-no-animation';
  // }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active,
.fade-no-animation-enter-active,
.fade-no-animation-enter-active,
.list-no-animation-leave-active,
.list-no-animation-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.fade-no-animation-enter,
.fade-no-animation-enter,
.list-no-animation-leave-to,
.list-no-animation-leave-to {
  opacity: 1;
  transform: none;
}

.fade-move {
  transition: transform 0.5s;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 1;
  transform: translateX(0);
}
.list-move {
  transition: all 0.5s;
}
</style>
