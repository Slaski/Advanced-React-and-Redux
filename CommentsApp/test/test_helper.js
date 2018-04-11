import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// Set up test environment to run like a browser in the command line
global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers)}>
      <ComponentClass />
    </Provider>
  );

  return $(ReactDom.findDOMNode(componentInstance)); // produces HTML
}

// build helper for simulating events

// Set up chai-jquery
export { renderComponent, expect };
