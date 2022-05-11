import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Project } from "@/typings/project";

Vue.use(Vuex);
export interface State {
  projects: Project[];
}

export enum Mutations {
  SET_PROJECTS = "SET_PROJECTS",
}

export default new Vuex.Store({
  state: {
    projects: [],
  },
  mutations: {
    [Mutations.SET_PROJECTS](state: State, projects: Project[]): void {
      state.projects = projects;
    },
  },
  actions: {
    fetchProjects({ commit }): Promise<void> {
      return axios.get("/static/projects.json").then(({ data }) => {
        commit(Mutations.SET_PROJECTS, data);
      });
    },
  },
  getters: {
    projects: (state): Project[] => state.projects,
  },
  modules: {},
});
