# hyper-notifier
![](https://cl.ly/3191dc78d5b7/Screen%252520Recording%2525202019-10-02%252520at%25252012.43%252520AM.gif)

**hyper-notifier is a notifications and alerting plugin for [Hyper.js](https://hyper.is/)**. This allows similar functionality to Iterm which allow users to add a config, and register alerts based on console output. Under the hood it is a wrapper around [Node Notifier](https://github.com/mikaelbr/node-notifier)

## Getting Started

First add the plugin to your plugins in your `.hyper.js`

```
plugins: ["hyper-notifier"],
```
Then register your notifications in your `.hyper.js`

```
module.exports = {
  config: {
    hyperNotifier: {
      notifications: [
        {
          test: 'ERR!',                // the string we are testing for
          title: 'ERR! was detected!', // notification title
          sound: 'Funk',
        }
        {
          test: 'y/n',                 // the string we are testing for
          title: 'response needed',    // notification title
          reply: true,                 // wait for response
          wait: 30                     // wait 30 seconds
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
