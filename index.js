const notifier = require('node-notifier');
const stripAnsi = require('strip-ansi');
let notifications = [];
let notifierString;

exports.middleware = store => next => action => {
  if ('SESSION_ADD_DATA' === action.type) {
    const {data} = action;
    registerConfigs();
    if (isNotifierString(data)) {
      // load notification configs
      let instanceOverrides = findNotifierString(data);

      if (instanceOverrides) {
        instanceOverrides.message = stripAnsi(data).replace(/\r?\n|\r|%/g, '');

        if (instanceOverrides.reply) {
          notifier.notify(instanceOverrides, responseHandler(next, action, store));
        } else {
          notifier.notify(instanceOverrides);
        }
      }
    }
    next(action);
  } else {
    next(action);
  }
};

function sendSessionData(uid, data, escaped) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SESSION_USER_DATA',
      data,
      effect() {
        // TODO
        // If no uid is passed, data is sent to the active session.
        const targetUid = uid || getState().sessions.activeUid;

        window.rpc.emit('data', {uid: targetUid, data, escaped});
      }
    });
  };
}

function isNotifierString(data) {
  return new RegExp('(' + notifierString + ')').test(data);
}

function findNotifierString(data) {
  return notifications.find(n => {
    return new RegExp('(' + n.test + ')').test(data);
  });
}

const responseHandler = (next, action, store) => (error, response, metadata) => {
  if (metadata && metadata.activationValue) {
    sendSessionData(action.uid, `${metadata.activationValue}\r`)(store.dispatch, store.getState);
  }
};

function registerConfigs() {
  const notifierConfigs = window.config.getConfig().hyperNotifier;

  if (notifications.length > 0 && !notifierString) {
    return;
  }

  if (notifierConfigs.notifications) {
    notifications = notifierConfigs.notifications;
  }

  if (!notifierString) {
    notifierString = notifications.map(n => n.test).join(')|(');
  }
}
