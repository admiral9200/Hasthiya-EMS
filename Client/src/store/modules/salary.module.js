import { SalaryService } from "@/services/SalaryService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import store from "..";

// initial state
const state = () => ({
    salaryList: {
        salaries: [],
        isLoading: false,
        salary: null,
        totalPages: 0,
    },
})

// getters
const getters = {
    getSalaryState: function (state) {
        return state.salaryList;
    }
}

// mutations
const mutations = {
    SET_LOADING: function (state, payload) {
        state.salaryList.isLoading = payload;
    },
   SET_SALARIES: function (state, payload) {
        state.salaryList.salaries = payload.salaries;
        state.salaryList.totalPages = payload.totalPages;    
    },
    SET_SALARY: function (state, payload) {
        state.salaryList.salary = payload.salary;
    },
}

// actions
const actions = {
    getAllSalary: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await SalaryService.getAll(payload.page);
            if (response.data.status == 200) {
                console.log("salaries"+response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_SALARIES", { salaries: response.data.data.docs, totalPages: response.data.data.totalPages});
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllSalaryByDate: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await SalaryService.getByDate(payload);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_SALARIES", { salaries: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    getAllSalaryByUser: async function ({ commit }, payload) {
        try {
            commit("SET_LOADING", true);
            let response = await SalaryService.getByAssignPerson(payload);
            if (response.data.status == 200) {
                console.log(response.data.data.docs)
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            commit("SET_SALARIES", { salaries: response.data.data.docs, totalPages: response.data.data.totalPages });
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
            commit("SET_LOADING", false);
        }
    },
    deleteSalary: async function ({ commit }, id) {
        try {
            commit("SET_LOADING", true);
            await SalaryService.delete(id);
            store.dispatch('getAllSalary')
            NotificationHelper.notificationhandler("Salary deleted successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    updateSalary: async function ({ commit }, salary) {
        try {
            commit("SET_LOADING", true);
            await SalaryService.update(salary, salary._id);
            store.dispatch('getAllSalary')
            NotificationHelper.notificationhandler("Salary updated successfully!")
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
    getSalaryById: async function ({ commit }, id) {
        try {
            commit("SET_LOADING", true);
            let response = await SalaryService.getById(id);
            commit("SET_SALARY", { salary: response.data.data })
            commit("SET_LOADING", false);
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },    
    createSalary:async function({commit},data){
        try {
            commit("SET_LOADING", true);
            await SalaryService.create(data);
            NotificationHelper.notificationhandler('salary created successfully!')
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