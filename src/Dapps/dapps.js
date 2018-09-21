// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';

import Checkbox from '@parity/ui/lib/Form/Checkbox';
import Page from '@parity/ui/lib/Page';

import DappsStore from './store';

import DappCard from './DappCard';

import styles from './dapps.css';

@observer
class Dapps extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  };

  static propTypes = {
    availability: PropTypes.string.isRequired
  };
  state = {
    showDeployModal: false,
    deployedApp: null
  };

  store = DappsStore.get(this.context.api);

  componentWillMount () {
    this.store.loadAllApps();
  }

  handlePin = (appId) => {
    if (this.store.displayApps[appId].pinned) {
      this.store.unpinApp(appId);
    } else {
      this.store.pinApp(appId);
    }
  }

  onModalClose = () => {
    this.setState({
      showDeployModal: false
    });
  }

  onModalConfirm = () => {
    const name = this.refs.name.value;
    const iconUrl = this.refs.iconUrl.value;
    const contentUrl = this.refs.contentUrl.value;
    const manifestUrl = this.refs.manifestUrl.value;

    this.store.deployApp(this.state.deployedApp, name, iconUrl, contentUrl, manifestUrl).then(() => {
      this.setState({
        showDeployModal: false
      });
    });
  }

  deployApp = (app) => {
    this.setState({
      showDeployModal: true,
      deployedApp: app
    });
  }

  renderSection = (apps) => (
    apps && apps.length > 0 &&
    <div className={ styles.dapps }>
      {
        apps.map((app, index) => (
          <DappCard
            app={ app }
            pinned={ this.store.displayApps[app.id] && this.store.displayApps[app.id].pinned }
            availability={ this.props.availability }
            className={ styles.dapp }
            key={ `${index}_${app.id}` }
            onPin={ this.handlePin }
            onDeployApp={ this.deployApp }
          />
        ))
      }
    </div>
  )

  render () {
    const actions = [
      { type: 'close', label: 'No, Cancel' },
      { type: 'confirm', label: 'Yes, Register', warning: true }
    ];

    const { showDeployModal } = this.state;

    return (
      <Page className={ styles.layout }>
        {this.renderSection(this.store.pinnedApps)}
        {this.renderSection(this.store.visibleUnpinned)}
        {
          this.store.externalOverlayVisible &&
          (
            <div className={ styles.overlay }>
              <div>
                <FormattedMessage
                  id='dapps.external.warning'
                  defaultMessage='Applications made available on the network by 3rd-party authors are not affiliated with Parity Technologies nor are they published by Parity Technologies. Each remain under the control of their respective authors. Please ensure that you understand the goals for each before interacting.'
                />
              </div>
              <div>
                <Checkbox
                  className={ styles.accept }
                  label={
                    <FormattedMessage
                      id='dapps.external.accept'
                      defaultMessage='I understand that these applications are not affiliated with Parity Technologies'
                    />
                  }
                  checked={ false }
                  onClick={ this.onClickAcceptExternal }
                />
              </div>
            </div>
          )
        }
        { showDeployModal &&
          <Modal
            actions={ actions }
            header='Deploy application'
            onClose={ this.onModalClose }
            onConfirm={ this.onModalConfirm }
            secondary
          >

            <div>
              Name
              <input ref='name' />
            </div>
            <div>
              Icon Url
              <input ref='iconUrl' />
            </div>
            <div>
              Content Url
              <input ref='contentUrl' />
            </div>
            <div>
              Manifest Url
              <input ref='manifestUrl' />
            </div>
          </Modal>
        }

      </Page>
    );
  }

  onClickAcceptExternal = () => {
    this.store.closeExternalOverlay();
  }
}

function mapStateToProps (state) {
  const { availability = 'unknown' } = state.nodeStatus.nodeKind || {};

  return {
    availability
  };
}

export default connect(
  mapStateToProps,
  null
)(Dapps);
