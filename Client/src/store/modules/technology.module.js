import { TechnologyService } from "@/services/TechnologyService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";

// initial state
const state = () => ({
    technologyList: {
        technologies: [],
        errorMessage: "",
        isLoading: false,
        technology: null,
    },
})

// getters
const getters = {
    getTechnologyState: function (state) {
        return state.technologyList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.technologyList.isLoading = payload;
    },
    SET_TECHNOLOGIES: function (state, payload) {
        state.technologyList.technologies = payload.technologies;
    },
    SET_TECHNOLOGY: function (state, payload) {
        state.technologyList.technology = payload.technology;
    },
    SET_ERROR: function (state, payload) {
        state.technologyList.errorMessage = payload.error;
    },
}

// actions
const actions = {
    getAllTechnology: async function ({ commit }) {
        try {
            let response = await TechnologyService.getAll();
            commit("SET_TECHNOLOGIES", { technologies: response.data.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deleteTechnology: async function ({ commit }, id) {
        try {
            await TechnologyService.delete(id);
            NotificationHelper.notificationhandler('Technology deleted successfully!')
            store.dispatch('getAllTechnology')
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    updateTechnology: async function ({ commit }, data) {
        try {
            await TechnologyService.update(data, data._id);            
            NotificationHelper.notificationhandler('Technology updated successfully!')
            store.dispatch('getAllTechnology')
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },getTechnologyById: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            let response = await TechnologyService.getById(id);
            console.log(response)
            commit("SET_Technology", { technology: response.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    createTechnology:async function({commit},data){
        try {
            commit("SET_LOADING", true);
            await TechnologyService.create(data);
            NotificationHelper.notificationhandler('Technology created successfully!')
            store.dispatch('getAllTechnology')
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}