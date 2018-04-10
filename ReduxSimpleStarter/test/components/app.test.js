import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {
  it('shows a comment box', () => {
    const component = renderComponent(App);
    expect(component.find('.comment-box')).to.exist;
  });
});
