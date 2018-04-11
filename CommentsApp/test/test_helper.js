import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDom from 'react-dom';

// Set up test environment to run like a browser in the command line
global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass) {
  const componentInstance = TestUtils.renderIntoDocument(<ComponentClass />);

  return $(ReactDom.findDOMNode(componentInstance)); // produces HTML
}

// build helper for simulating events

// Set up chai-jquery
