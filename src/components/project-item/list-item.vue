<template>
  <div class="list-item">
    <div class="title">
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="isChecked"
          @click.stop="updateChecked($event.target.checked)"
        />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="name">{{ name }}</div>
    <div class="customer">{{ customer }}</div>
    <div class="date">{{ createDate }}</div>
    <div class="code">{{ id }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "list-item",
})
export default class ListItem extends Vue {
  @Prop({ type: String, required: true }) public name!: string;
  @Prop({ type: String, required: true }) public id!: string;
  @Prop({ type: String, required: true }) public customer!: string;
  @Prop({ type: String, required: true }) public createDate!: string;
  @Prop({ type: Boolean, default: false }) public isChecked!: boolean;

  private updateChecked(checked: boolean): void {
    this.$emit("checkedChanged", checked);
  }
}
</script>
