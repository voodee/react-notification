import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import MdCloseIcon from 'react-icons/md/close'

import Timer from './utils/Timer'

import styles from './styles.sass'

@CSSModules(styles, {allowMultiple: true})
export default class NotificationItem extends Component {

    componentDidMount() {
        const {notification} = this.props;

        if (notification.get('autoDismiss') && notification.get('dismissible')) {
            this._timer = new Timer(
                this._onRemove,
                notification.get('autoDismiss') * 1000
            )
        }
    }

    _onRemove = () => {
        this.props.onRemove();
    };


    _handleMouseEnter = () => {
        this._timer.pause()
    };


    _handleMouseLeave = () => {
        this._timer.resume()
    };


    render() {
        const
            { notification } = this.props,
            animationType = notification.get('animationType'),
            transitionEnterTimeout = notification.get('transitionEnterTimeout'),
            transitionLeaveTimeout = notification.get('transitionLeaveTimeout')
            ;

        return (
                <div
                    styleName={`notification notification--level-${notification.get('level')} ${notification.get('closeButton') ? 'notification--with-close-button' : ''}`}
                    onClick={ this._onRemove }
                    onMouseEnter={ this._handleMouseEnter }
                    onMouseLeave={ this._handleMouseLeave }
                >
                    {notification.get('message')}
                    {notification.get('closeButton') &&
                    <MdCloseIcon styleName="notification-icon" size={26} />
                    }
                </div>
        )
    }


}


NotificationItem.propTypes = {
    onRemove: React.PropTypes.func
};


