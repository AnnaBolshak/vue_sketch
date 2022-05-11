<template>
  <div class="projects-list">
    <div class="nav">
      <div class="selection-count">
        <span v-if="projects.length > 0">
          {{ projects.length }} items | {{ checkedProjects.length }} selected
        </span>
      </div>
      <div class="search-bar">
        <search-field
          placeholder="Filter projects"
          :keyword="searchProjectsKeyword"
          :val="searchProjectsKeyword"
          @change="searchProjectHandle"
        />
      </div>
      <div class="routers">
        <router-link to="/list-view">List view</router-link> |
        <router-link to="/card-view">Card view</router-link>
      </div>
    </div>
    <div class="content">
      <router-view
        :projects="filteredProjects"
        :checkedProjects="checkedProjects"
        @checkedProjectsChanged="updateCheckedProjects"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Project } from "@/typings/project";
import filterItems from "@/utils/filter-projects";
import SearchField from "@/components/search-field.vue";

@Component({
  name: "projects-list",
  components: {
    SearchField,
  },
})
export default class ProjectsList extends Vue {
  private searchProjectsKeyword = "";
  private checkedProjects: string[] = [];

  private get projects(): Project[] {
    return this.$store.getters.projects;
  }

  private get filteredProjects(): Project[] {
    return filterItems(this.projects, this.searchProjectsKeyword);
  }

  private searchProjectHandle(keyword: string): void {
    this.setUncheckProjects();
    this.searchProject(keyword);
  }

  private searchProject(keyword: string): void {
    this.searchProjectsKeyword = keyword.trim();
  }

  private updateCheckedProjects(projectCodes: string[]): void {
    this.checkedProjects = projectCodes;
  }

  private setUncheckProjects(): void {
    this.checkedProjects = [];
  }

  private created(): void {
    this.$store.dispatch("fetchProjects");
  }
}
</script>

<style lang="less" scoped>
.projects-list {
  .nav {
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .content {
    margin: 0 20px;
  }
}
</style>

<style lang="less">
.checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #eee;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 6px;
    top: 2px;
    width: 3px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
