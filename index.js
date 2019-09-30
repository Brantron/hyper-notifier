const notifier = require('node-notifier');

let notifications = []
let newConfig = {}
let defaultConfig = {
  registered: false,
  sound: 'Basso'
}

exports.middleware = (store) => (next) => (action) => {
  if ('SESSION_PTY_DATA' === action.type) {
    const { data } = action;
    if (isNotifierString(data)) {
      // load user configs
      if(!defaultConfig.registered) {
        defaultConfig = registerConfigs()
      }

      const instanceOverrides = findNotifierString(data) || {}

      notifier.notify({
        ...defaultConfig,
        ...instanceOverrides
      });
    }
    next(action);
  } else {
    next(action);
  }
};


function isNotifierString(data) {
  return new RegExp('(' + notifications.map(n => n.test).join(')|(') + ')').test(data)
}

function findNotifierString(data) {
  return notifications.find(n => {
    return new RegExp('(' + n.test + ')').test(data)
  })
}

function registerConfigs() {
  const notifierConfigs = config.getConfig().hyperNotifier
  if(notifierConfigs.settings) {
    newConfig = {
      ...notifierConfigs,
      registered: true
    }
  }

  if(notifierConfigs.notifications) {
    notifications = notifierConfigs.notifications
  }

  return {...defaultConfig, ...newConfig}
}

exports.mapTermsState = (state, map) => {
  console.log('mapTermsState')
  return map
};
