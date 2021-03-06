// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';

import { Header } from 'semantic-ui-react';

import { setSetting } from '../../../../../shared/actions/settings';

import OverviewSidebarBackupContainer from './Sidebar/Backup';
import GlobalSidebarPrompt from '../../../components/Overview/Sidebar/Prompt';
import GlobalSidebarTelegram from '../../../components/Overview/Sidebar/Telegram';
import GlobalSidebarUpdate from '../../../components/Overview/Sidebar/Update';

class OverviewSidebarContainer extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Sidebar Prop '${key}' changed`)
    );
  }
  render() {
    const {
      actions,
      app,
      settings
    } = this.props;
    const {
      constants
    } = app;
    return (
      <React.Fragment>
        <Header>
          App Status
          <Header.Subheader>
            Important information and events for your Anchor wallet.
          </Header.Subheader>
        </Header>
        <GlobalSidebarUpdate
          constants={constants}
          settings={settings}
        />
        <OverviewSidebarBackupContainer />
        <GlobalSidebarPrompt
          actions={actions}
          settings={settings}
        />
        <GlobalSidebarTelegram />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    node: state.connection.httpEndpoint,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewSidebarContainer);
