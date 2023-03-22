import { DesignationService } from "@/services/DesignationService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";

// initial state
const state = () => ({
    designationList: {
        designations: [],
        errorMessage: "",
        isLoading: false,
        designation: null,
    },
})

// getters
const getters = {
    getDesignationState: function (state) {
        return state.designationList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.designationList.isLoading = payload;
    },
    SET_DESIGNATIONS: function (state, payload) {
        state.designationList.designations = payload.designations;
    },
    SET_DESIGNATION: function (state, payload) {
        state.designationList.designation = payload.designation;
    },
    SET_ERROR: function (state, payload) {
        state.designationList.errorMessage = payload.error;
    },
}

// actions
const actions = {
    getAllDesignations: async function ({ commit }) {
        try {
            commit("SET_LOADING", true);
            let response = await DesignationService.getAll();
            commit("SET_DESIGNATIONS", { designations: response.data.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deleteDesignation: async function ({ commit }, id) {
        try {
            await DesignationService.delete(id);
            NotificationHelper.notificationhandler('designation deleted successfully!')
            store.dispatch("getAll")
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    updateDesignation: async function ({ commit }, data) {
        try {
            await DesignationService.update(data, data._id);            
            NotificationHelper.notificationhandler('designation updated successfully!')
            store.dispatch("getAllDesignations")
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },getDesignationById: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            let response = await DesignationService.getById(id);
            console.log(response)
            commit("SET_DESIGNATION", { designation: response.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    createDesignation:async function({commit},data){
        try {
            commit("SET_LOADING", true);
            await DesignationService.create(data);
            NotificationHelper.notificationhandler('Designation created successfully!')
            store.dispatch('getAllDesignations')
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