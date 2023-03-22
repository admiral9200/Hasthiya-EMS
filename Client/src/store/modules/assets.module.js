import { AssetsService } from "@/services/AssetsService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";

// initial state
const state = () => ({
    assetList: {
        assets: [],
        isLoading: false,
        asset: null,
        totalPages: 0,
    },
})

// getters
const getters = {
    getAssetState: function (state) {
        return state.assetList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.assetList.isLoading = payload;
    },
    SET_ASSETS: function (state, payload) {
        state.assetList.assets = payload.assets;
        state.assetList.totalPages = payload.totalPages;
    },
    SET_ASSET: function (state, payload) {
        state.assetList.asset = payload.asset;
    },
}

// actions
const actions = {
    getAllAssets: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await AssetsService.getAll(payload);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_ASSETS", { assets: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllAssetsByType: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await AssetsService.getByType(payload.id, payload.page);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_ASSETS", { assets: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllAssetsByUser: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await AssetsService.getByAssignPerson(payload);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_ASSETS", { assets: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deleteAsset: async function ({ commit }, id) {
        try {
            commit("SET_LOADING", true);
            await AssetsService.delete(id);
            store.dispatch('getAllAssets')
            NotificationHelper.notificationhandler("Asset deleted successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    updateAsset: async function ({ commit }, asset) {
        try {
            commit("SET_LOADING", true);
            await AssetsService.update(asset, asset._id);
            store.dispatch('getAllAssets')
            NotificationHelper.notificationhandler("Asset updated successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    getAssetById: async function ({ commit }, id) {
        try {
            commit("SET_LOADING", true);
            let response = await AssetsService.getById(id);
            commit("SET_ASSET", { asset: response.data.data })
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },    
    createAsset:async function({commit},data){
        try {
            commit("SET_LOADING", true);
            await AssetsService.create(data);
            NotificationHelper.notificationhandler('asset created successfully!')
            store.dispatch('getAllAssets')
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