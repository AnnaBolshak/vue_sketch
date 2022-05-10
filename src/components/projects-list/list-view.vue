<template>
  <div class="list-view">
    <template v-if="projects.length">
      <div class="list-item header">
        <div class="title">
          <label class="checkbox">
            <input type="checkbox" v-model="isAllProjectsChecked" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div
          class="name"
          @click="sort('name')"
        >
          Name
          <font-awesome-icon :icon="['fa-solid', currentSort === 'name' ? `${sortIconClass}` : 'fa-sort']"/>
        </div>

        <div
          class="customer"
          @click="sort('customer')"
        >
          Customer
          <font-awesome-icon :icon="['fa-solid', currentSort === 'customer' ? `${sortIconClass}` : 'fa-sort']"/>
        </div>
        <div
          class="date"
          @click="sort('createDate')"
        >
          Date of creation
          <font-awesome-icon :icon="['fa-solid', currentSort === 'createDate' ? `${sortIconClass}` : 'fa-sort']"/>
        </div>
        <div
          class="code"
          @click="sort('id')"
        >
          Code
          <font-awesome-icon :icon="['fa-solid', currentSort === 'id' ? `${sortIconClass}` : 'fa-sort']"/>
        </div>
      </div>

      <list-item
        v-for="project in sortedProjects"
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { Project, Indexable } from "@/typings/project";
import ListItem from "@/components/project-item/list-item.vue";

@Component({
  components: {
    ListItem,
  },
})
export default class ListView extends Vue {
  @Prop({ type: Array, required: true }) checkedProjects!: string[]
  @Prop({ type: Array, required: true }) projects!: Project[]

  private currentSort = 'name'
  private currentSortDir = 'asc'

  private get sortIconClass (): string {
    return this.currentSortDir == 'asc' ? 'fa-sort-up' : 'fa-sort-down'
  }

  private get sortedProjects (): Project[] {
    return this.projects.sort((a: Project, b: Project) => {
      let modifier = 1;
      if (this.currentSortDir === "desc") modifier = -1;
      if (this.currentSort === "id") {
        return (
          modifier *
          ((a as Indexable)[this.currentSort] as string).localeCompare(
            (b as Indexable)[this.currentSort] as string,
            "en",
            { numeric: true }
          )
        );
      }
      if (
        ((a as Indexable)[this.currentSort] as string) <
        ((b as Indexable)[this.currentSort] as string)
      )
        return -1 * modifier;
      if (
        ((a as Indexable)[this.currentSort] as string) >
        ((b as Indexable)[this.currentSort] as string)
      )
        return modifier;

      return 0;
    });
  }

  get isAllProjectsChecked(): boolean {
    return (
      !!this.projects.length &&
      this.checkedProjects.length === this.projects.length
    );
  }

  set isAllProjectsChecked(value: boolean) {
    this.$emit(
      "checkedProjectsChanged",
      value ? this.projects.map((project) => project.id) : []
    );
  }

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

  private sort(sort: string): void {
    if (sort === this.currentSort) {
      this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
    }
    this.currentSort = sort;
  }
}
</script>

<style lang="less">
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: solid 1px #909090;
  padding: 16px;
  box-sizing: border-box;

  &.header {
    background-color: #cccccc29;
    border-top: solid 1px #909090;
    cursor: pointer;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }

  .name,
  .customer {
    flex: 3;
  }
  .date {
    flex: 2;
  }

  .title,
  .code {
    flex: 1;
    text-align: center;
  }
}
</style>
