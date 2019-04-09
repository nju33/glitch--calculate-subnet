import React from 'react';
import renderer from 'react-test-renderer';
import Index from './index';

test('index page', async () => {
  const component = renderer.create(<Index />);
  let tree;

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.root.instance.preFetch();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.root.instance.showErrors({
    ipAddress: 'ip address error',
    subnetmask: 'subnetmask error',
  });
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.root.instance.postFetch({
    networkAddress: [0, 0, 0, 0],
    broadcastAddress: [0, 0, 0, 0],
    hostAddressRange: [[0, 0, 0, 0], [0, 0, 0, 0]],
  });
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
