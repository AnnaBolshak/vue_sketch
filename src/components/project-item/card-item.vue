<template>
  <div class="card-item">
    <div class="header">
      <label class="checkbox"
        >{{ name }}
        <input
          type="checkbox"
          :checked="isChecked"
          @click.stop="updateChecked($event.target.checked)"
        />
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="details">
      <div>
        <span class="details-title">Customer</span>
        <span class="details-content">{{ customer }}</span>
      </div>
      <div>
        <span class="details-title">Date of creation</span>
        <span class="details-content"> {{ createDate }}</span>
      </div>
    </div>
    <div class="footer">
      <span class="code">
        {{ id }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "card-item",
})
export default class CardItem extends Vue {
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

<style scoped lang="less">
.card-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 323px;
  height: 180px;
  border: solid 1px #878787;
  margin: 4px;
  background-color: #ffffff;
  cursor: pointer;
  padding: 16px;

  .header {
    flex: 2;
    font-size: 18px;
  }
  .details {
    display: flex;
    flex: 2;
    flex-direction: row;
    justify-content: space-between;

    &-title {
      display: flex;
      flex-direction: column;
      color: #6c6c6c;
      font-size: 14px;
      margin-bottom: 2px;
    }
    &-content {
      display: flex;
      flex-direction: column;
      color: #242424;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .footer {
    flex: 1;

    .code {
      border-radius: 27%;
      border: solid 1px #cccccc29;
      background-color: #cccccc29;
      padding: 1px 3px;
    }
  }
}
</style>
