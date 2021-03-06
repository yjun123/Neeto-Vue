import schedule from 'node-schedule'
import api from 'src/utils/api'
import ServerFileStorage from './utils/storage/ServerFileStorage'
const refreshWizToken = (app) => {
  schedule.scheduleJob('30 * * * * *', async () => {
    if (!ServerFileStorage.isKeyExistsInLocalStorage('token') || !app.isLogin) return
    try {
      await api.AccountServerApi.keepTokenAlive()
    } catch (e) {
      await app.reLogin()
    }
  })
}

export default {
  RegisterScheduleJobs (app) {
    refreshWizToken(app)
  }
}
