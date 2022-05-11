<template>
  <div class="search search-field">
    <input
      type="text"
      :value="val"
      :placeholder="placeholder"
      @keyup="$emit('change', $event.target.value)"
    />
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";

@Component
export default class SearchField extends Vue {
  @Prop({ type: String, default: "" }) public placeholder!: string;
  @Prop({ type: String, default: "" }) public val!: string;
}
</script>

<style lang="less" scoped>
.search-field {
  input {
    display: inline-block;
    width: 160px;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #242424;
    background: #fff;
    border: 1px solid #878787;
    padding: 5px 7px 4px;
    margin-right: 8px;
    -webkit-appearance: none;
    outline: 0;
  }

  .fa-magnifying-glass {
    margin-left: -2em;
  }
}
</style>
