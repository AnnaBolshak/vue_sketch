<template>
  <div class="card-view">
    <template v-if="projects.length">
      <card-item
        v-for="project in projects"
        :key="project.id"
        :id="project.id"
        :name="project.name"
        :customer="project.customer"
        :createDate="project.createDate"
        :isChecked="isChecked(project.id)"
        @checkedChanged="updateCheckedProjects(project.id, $event)"
      />
    </template>
    <template v-else>No matching projects found.</template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/typings/project";
import CardItem from "@/components/project-item/card-item.vue";

@Component({
  components: {
    CardItem,
  },
})
export default class CardView extends Vue {
  @Prop({ type: Array, required: true }) projects!: Project[];
  @Prop({ type: Array, required: true }) checkedProjects!: string[];

  private isChecked(code: string): boolean {
    return this.checkedProjects.includes(code);
  }

  private updateCheckedProjects(id: string, checked: boolean): void {
    this.$emit(
      "checkedProjectsChanged",
      checked
        ? [...this.checkedProjects, id]
        : this.checkedProjects.filter((checkedId) => checkedId !== id)
    );
  }
}
</script>

<style lang="less" scoped>
.card-view {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
