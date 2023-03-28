import { createStore, createLogger } from 'vuex'
import userModule from './modules/user.module'
import designationModule from './modules/designation.module'
import technologyModule from './modules/technology.module'
import assetsTypeModule from './modules/assetsType.module'
import assetsModule from './modules/assets.module'
import salaryModule from './modules/salary.module'
import leaveModule from './modules/leave.module'

const debug = process.env.NODE_ENV !== 'production'


export default createStore({
  modules: {
    userModule,
    designationModule,
    technologyModule,
    assetsTypeModule,
    assetsModule,
    salaryModule,
    leaveModule,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
