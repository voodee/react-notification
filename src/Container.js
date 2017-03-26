import React, { Component } from 'react'
import {List, Map} from 'immutable'
import CSSModules from 'react-css-modules'

import {defaultValue, positions, levels} from './constants'
import NotificationItem from './Item'

import styles from './styles.sass'
@CSSModules(styles, {allowMultiple: true})
export default class Notification extends Component {

    constructor(props) {
        super(props);

        this.uid = 0;
        this.state = {
            notifications: List()
        }
    }


    add( notification ) {
        const _notification = defaultValue
            .merge( Map({uid: ++this.uid}))
            .merge( Map(notification) );

        // validation position
        if ( !positions.includes( _notification.get('position') )) {
            throw new Error(`notification position "${ _notification.get('position') }" unsupported`)
        }

        // validation level
        if ( !levels.get( _notification.get('level') )) {
            throw new Error(`notification level "${ _notification.get('level') }" unsupported`)
        }

        const notifications = this.state.notifications.push(_notification);
        this.setState({notifications})
    }

    remove(uid) {
        this.setState({
            notifications: this.state.notifications.filter(notification => {
                if (notification.get('uid') === uid) {
                    if (notification.get('onRemove')) {
                        notification.get('onRemove')(notification)
                    }
                    return false
                }
                return true
            })
        })
    };


    render() {

        // if ( ! this.state.notifications.size ) return null;

        // Group by position
        const notifications = positions.valueSeq().map( position => {
            const _notifications = this.state.notifications.filter( notification => position === notification.get('position'));

            if ( !_notifications.size ) return null;

            return (
                <div styleName={`notifications notifications--position-${position}`} key={position}>
                    { _notifications.map( notification =>
                        <NotificationItem
                            key             = {notification.get('uid')}
                            notification    = {notification}
                            onRemove        = {this.remove.bind(this, notification.get('uid'))}
                        />
                    )}
                </div>
            );
        });


        return (
            <div>
                {notifications}
            </div>
        )
    }

}