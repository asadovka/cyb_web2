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

storiesOf('Button', module)
.add('basic', withNotes(someMarkdownText)(() => <Button onClick={action('clicker')}>2</Button>));


storiesOf('Button2', module)
.add('sdfsfd', withNotes(someMarkdownText)(() => <Button onClick={action('clicker')}>223423</Button>))
.add('22', withNotes(someMarkdownText)(() => <Button onClick={action('clicker')}>2</Button>));
  