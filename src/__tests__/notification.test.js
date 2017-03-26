import React, { Component } from 'react';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import Notification from '../Container';
import Item from '../Item';

const defaultNotification = {
    message: 'This is a message'
};

describe('Component', () => {
    let node;
    let instance;
    let component;
    const ref = 'notificationSystem';

    it('test', () => {
        expect('true').to.equal('true');
    })

    beforeEach(() => {

        class ElementWrapper extends Component {
            render() {
                return <Notification ref={ ref } />;
            }
        }
        node = window.document.createElement('div');
        instance = TestUtils.renderIntoDocument(React.createElement(ElementWrapper), node);
        component = instance.refs[ref];

    });


    it('should be rendered', () => {
        component = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
        should.exist(component);
    });


    it('should render a single notification', () => {
        component.add(defaultNotification);
        let notifications = TestUtils.scryRenderedComponentsWithType(instance, Item);
        expect(notifications).to.have.length(1)

    });


    it('notification with good text', () => {
        component.add(defaultNotification);
        let notification = TestUtils.findRenderedComponentWithType(instance, Item);
        let text = TestUtils.findRenderedDOMComponentWithTag(notification, 'div').textContent;
        expect(text).to.equal(defaultNotification.message)
    });


    it('click close to notification', () => {
        component.add(defaultNotification);
        let notifications = TestUtils.scryRenderedComponentsWithType(instance, Item);
        expect(notifications).to.have.length(1);

        let notificationNode = TestUtils.findRenderedDOMComponentWithTag(notifications[0], 'div');
        TestUtils.Simulate.click(notificationNode);

        notifications = TestUtils.scryRenderedComponentsWithType(instance, Item);
        expect(notifications).to.have.length(0);
    });


    it('level default', () => {
        component.add(defaultNotification);
        let notification = TestUtils.findRenderedComponentWithType(instance, Item);
        let notificationNode = TestUtils.findRenderedDOMComponentWithTag(notification, 'div');

        expect(notificationNode.className).to.match(/notification--level-default/);
    });


    ['success', 'error', 'warning', 'info', 'default'].forEach( level => {
        it(`level ${level}`, () => {
            component.add(Object.assign(
                {},
                defaultNotification,
                {level}
            ));
            let notification = TestUtils.findRenderedComponentWithType(instance, Item);
            let notificationNode = TestUtils.findRenderedDOMComponentWithTag(notification, 'div');

            let className = new RegExp(`notification--level-${level}`);

            expect(notificationNode.className).to.match(className);
        })
    });


    ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'].forEach( position => {
        it(`position`, () => {
            component.add(Object.assign(
                {},
                defaultNotification,
                {position}
            ));
            let notificationContainerNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[1];

            let className = new RegExp(`notifications--position-${position}`);

            expect(notificationContainerNode.className).to.match(className);

        })
    });

});