import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment-list';

describe('CommentList', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentList, null, {
      comments: ['New Comment', 'Other New Comment']
    });
  });

  it('has the right class', () => {
    expect(component).to.have.class('comment-list');
  });

  it('shows li for each comment', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('shows each comment that is provided', () => {
    expect(component).to.contain('New Comment');
    expect(component).to.contain('Other New Comment');
  });
});
