import React, { Component } from 'react';
import requireAuth from './require_authentication';

class Resources extends Component {
  render() {
    return (
      <div>
        Super Special Recipe
        <ul>
          <li>1 Cup Sugar</li>
          <li>1 Cup Pepper</li>
          <li>1 Cup Salt</li>
        </ul>
      </div>
    );
  }
}

export default requireAuth(Resources);
