import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes, WithNotes } from '@storybook/addon-notes';
import { Welcome } from '@storybook/react/demo';
import someMarkdownText from '../README.md';

import { Button } from '../app/src/components/Button/';

// console.log(someMarkdownText);

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

