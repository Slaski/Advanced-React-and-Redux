import jsdom from 'jsdom';
import jquery from 'jquery';

// Set up test environment to run like a browser in the command line
global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class

// build helper for simulating events

// Set up chai-jquery
