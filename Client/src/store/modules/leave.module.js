import { LeaveService } from "@/services/LeaveService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";

// initial state
const state = () => ({
    leaveList: {
        leaves: [],
        isLoading: false,
        leave: null,
        totalPages: 0,
        leaveCount:0,
    },
})

// getters
const getters = {
    getLeaveState: function (state) {
        return state.leaveList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.leaveList.isLoading = payload;
    },
    SET_LEAVES: function (state, payload) {
        state.leaveList.leaves = payload.leaves;
        state.leaveList.totalPages = payload.totalPages;        
        state.leaveList.leaveCount = payload.leaveCount;
    },
    SET_LEAVE: function (state, payload) {
        state.leaveList.leave = payload.leave;
    },
}

// actions
const actions = {
    getAllLeaves: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await LeaveService.getAll(payload);
            if (response.data.status == 200) {
                console.log("leaves"+response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_LEAVES", { leaves: response.data.data.docs, totalPages: response.data.data.totalPages,leaveCount:response.data.data.leavesCount });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllLeavesByEmployee: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await LeaveService.getAllByEmployee(payload.id, payload.page);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_LEAVES", { leaves: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllLeavesByReportPerson: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await LeaveService.getAllByReportPerson(payload.id, payload.page);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_LEAVES", { leaves: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deleteLeave: async function ({ commit }, id) {
        try {
            commit("SET_LOADING", true);
            await LeaveService.delete(id);
            store.dispatch('getAllLeaves')
            NotificationHelper.notificationhandler("Leave deleted successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    updateLeave: async function ({ commit }, leave) {
        try {
            commit("SET_LOADING", true);
            await LeaveService.update(leave, leave._id);
            NotificationHelper.notificationhandler("Leave updated successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    getLeaveById: async function ({ commit }, id) {
        try {
            commit("SET_LOADING", true);
            let response = await LeaveService.getById(id);
            commit("SET_LEAVE", { leave: response.data.data })
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },    
    createLeave:async function({commit},data){
        try {
            commit("SET_LOADING", true);
            await LeaveService.create(data);
            NotificationHelper.notificationhandler('leave created successfully!')
            store.dispatch('getAllLeaves')
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