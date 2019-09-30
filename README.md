# hyper-notifier
![](https://cl.ly/660846eb0602/Screen%252520Recording%2525202019-09-29%252520at%25252006.07%252520PM.gif)

**hyper-notifier is a notifications and alerting plugin for [Hyper.js](https://hyper.is/)**. This allows similar functionality to Iterm which allow users to add a config, and register alerts based on console output. Under the hood it is a wrapper around [Node Notifier](https://github.com/mikaelbr/node-notifier)

## Getting Started

First add the plugin to your plugins in your `.hyper.js`

```
plugins: ["hyper-notifier"],
```
Then register your base settings (optional) and notifications (required) in your `.hyper.js`

```
module.exports = {
  config: {
    hyperNotifier: {
      settings: {
        sound: 'Funk'
      },
      notifications: [
        {
          test: 'ERR!',                // the string we are testing for
          title: 'ERR! was detected!', // node-notifier config
          message: 'check hyperterm'   // node-notifier config
        }
      ]
    }
```

For more advanced notifications, please reference [Node Notifier](https://github.com/mikaelbr/node-notifier). `test` is the string we are testing for, but all other keys on the object will be passed to node-notifier

## Built With

* [Node Notifier](https://github.com/mikaelbr/node-notifier) - The notifications engine

## Author

* **Brandon Lawrence** - [Brantron](https://github.com/Brantron)

<!-- See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project. -->

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
