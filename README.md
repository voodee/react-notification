# React notification
[![Build Status](https://travis-ci.org/voodee/react-notification.svg?branch=master)](https://travis-ci.org/voodee/react-notification) [![peerDependencies Status](https://david-dm.org/voodee/react-notification/peer-status.svg)](https://david-dm.org/voodee/react-notification?type=peer) [![devDependencies Status](https://david-dm.org/voodee/react-notification/dev-status.svg)](https://david-dm.org/voodee/react-notification?type=dev) [![peerDependencies Status](https://david-dm.org/voodee/react-notification/peer-status.svg)](https://david-dm.org/voodee/react-notification?type=peer) [![Coverage Status](https://coveralls.io/repos/github/voodee/react-notification/badge.svg?branch=master)](https://coveralls.io/github/voodee/react-notification?branch=master)

## Installing
This component is available as CommonJS and UMD module. Install via NPM running:

`npm i https://github.com/voodee/react-notification/tarball/master --save`

Colons can be used to align columns.


## Using
Here is a basic example:
```js
const
    React           = require('react'),
    ReactDOM        = require('react-dom'),
    Notification    = require('react-notification');

class MyComponent extends React.Component {

    _addNotification = e => {
        e.preventDefault();
        this._notification.add({
            message: 'Notification message',
            level: 'success'
        })
    };


    _setNotification = notification => {
        this._notification = notification
    };


    render() {
        return (
            <div>
                <button onClick={this._addNotification}>Add notification</button>
                <Notification ref={this._setNotification} />
            </div>
        )
    }
};

ReactDOM.render(
    <MyComponent />,
    document.getElementById('app')
);
```

## Methods
### add(notification)
Add a notification object. This displays the notification based on the object you passed.

Returns the notification object to be used to programmatically dismiss a notification.

The notification object has the following properties:

| Name         | Type            | Default         | Description                                                                                                                                                               |
|------------  |---------------  |---------        |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| message      | string          | ' '             | Message of the notification                                                                                                                                              |
| level        | string          | 'default'       | Level of the notification. Available: **success**, **error**, **warning**, **info** and **default**                                                                                    |
| position     | string          | 'bottom-center' | Position of the notification. Available: **top-left**, **top-right**, **top-center**, **bottom-left**, **bottom-right**, **bottom-center**  |
| autoDismiss  | integer         | 5               | Delay in seconds for the notification go away. Set this to **0** to not auto-dismiss the notification                                                                      |
| dismissible  | noolean         | true            | Set if notification is dismissible by the user.
| closeButton  | noolean         | false           | Show close button


### remove()
Remove a notification programmatically.

## Contributions
Run the tests:
`npm test`
