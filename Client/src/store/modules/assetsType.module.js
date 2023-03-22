import { AssetsTypeService } from "@/services/AssetsTypeService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";

// initial state
const state = () => ({
    assetsTypeList: {
        assetsTypes: [],
        errorMessage: "",
        isLoading: false,
        assetsType: null,
    },
})

// getters
const getters = {
    getAssetsTypeState: function (state) {
        return state.assetsTypeList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.assetsTypeList.isLoading = payload;
    },
    SET_DESIGNATIONS: function (state, payload) {
        state.assetsTypeList.assetsTypes = payload.assetsTypes;
    },
    SET_DESIGNATION: function (state, payload) {
        state.assetsTypeList.assetsType = payload.assetsType;
    },
    SET_ERROR: function (state, payload) {
        state.assetsTypeList.errorMessage = payload.error;
    },
}

// actions
const actions = {
    getAllAssetsTypes: async function ({ commit }) {
        try {
            commit("SET_LOADING", true);
            let response = await AssetsTypeService.getAll();
            commit("SET_DESIGNATIONS", { assetsTypes: response.data.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deleteAssetsType: async function ({ commit }, id) {
        try {
            await AssetsTypeService.delete(id);
            NotificationHelper.notificationhandler('assetsType deleted successfully!')
            store.dispatch("getAllAssetsTypes")
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },
    updateAssetsType: async function ({ commit }, data) {
        try {
            await AssetsTypeService.update(data, data._id);            
            NotificationHelper.notificationhandler('assetsType updated successfully!')
            store.dispatch("getAllAssetsTypes")
        } catch (error) {
            console.log(error)
            commit("SET_ERROR", { error: error })
        }
    },getAssetsTypeById: async function ({ commit },id) {
        try {
            commit("SET_LOADING", true);
            let response = await AssetsTypeService.getById(id);
            console.log(response)
            commit("SET_DESIGNATION", { assetsType: response.data });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    createAssetsType:async function({commit},data){
        try {
            commit("SET_LOADING", true);
            await AssetsTypeService.create(data);
            NotificationHelper.notificationhandler('assetsType created successfully!')
            store.dispatch('getAllAssetsTypes')
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