import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes, WithNotes } from '@storybook/addon-notes';
import { Welcome } from '@storybook/react/demo';
import someMarkdownText from '../README.md';

import { Button } from '../app/src/components/Button/';

// console.log(someMarkdownText);
import { withState } from '@dump247/storybook-state';


storiesOf('Checkbox', module)
.add('with check', withState({ checked: false })(({ store }) => (
  <label><input type='checkbox' {...store.state}
            onChange={(checked) => {
              store.set({ checked: !store.state.checked });
            }}/>
            test
            </label>
)));
