<template>
  <div class="button-group">
    <span
      class="button"
      v-for="item in data"
      :key="item.id"
      :class="{ 'act-button': item.id === value, 'small-button': small }"
      @click="handleButton(item.id)"
    >
      <i :class="item.icon" v-if="item.icon"></i>

      <span style="font-size: 13px">{{ item.label }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    isCancel: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      request: true,
    },
    item: {
      type: Object,
      request: true,
    },
    data: {
      type: Array,
      request: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleButton(value) {
      // console.log(value);
      const oValue = this.isCancel && value === this.value ? '' : value;
      this.$emit('input', [oValue, this.item]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_vars.scss';
.button-group {
  display: inline-block;
  color: $el_text_normal;
  .button {
    display: inline-block;
    line-height: 1;
    cursor: pointer;
    // transtion: all 0.1s;
    font-weight: 500;
    font-size: 14px;
    padding: 6px 10px;
    margin-right: 5px;
    &:hover {
      color: $el_primary;
    }
    &:last-child {
      margin-right: 00px;
    }
  }
  .small-button {
    padding: 3px 5px;
  }
  .act-button {
    color: #fff;
    background-color: rgba(72, 99, 143, 0.9);
    &:hover {
      color: #fff;
    }
  }
}
</style>
