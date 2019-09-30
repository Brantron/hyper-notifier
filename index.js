const notifier = require('node-notifier');

let notifications = []
let notifierString;

exports.onApp = registerConfigs

exports.middleware = (store) => (next) => (action) => {
  if ('SESSION_PTY_DATA' === action.type) {
    const { data } = action;
    if (isNotifierString(data)) {
      // load notificaion configs
      const instanceOverrides = findNotifierString(data)

      if(instanceOverrides) {
        notifier.notify(instanceOverrides);
      }
    }
    next(action);
  } else {
    next(action);
  }
};


function isNotifierString(data) {
  return new RegExp('(' + notifierString + ')').test(data)
}

function findNotifierString(data) {
  return notifications.find(n => {
    return new RegExp('(' + n.test + ')').test(data)
  })
}

function registerConfigs() {
  const notifierConfigs = config.getConfig().hyperNotifier

  if(notifications.length > 0 && !notifierString) {
    return
  }

  if(notifierConfigs.notifications) {
    notifications = notifierConfigs.notifications
  }

  if (!notifierString) {
    notifierString = notifications.map(n => n.test).join(')|(')
  }
}
