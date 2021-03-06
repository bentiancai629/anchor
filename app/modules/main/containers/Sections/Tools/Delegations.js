// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsDelegationsComponent from '../../../../../shared/components/Tools/Delegations';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as StakeActions from '../../../../../shared/actions/stake';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as WalletActions from '../../../../../shared/actions/wallet';

class ToolsDelegations extends Component<Props> {
  render = () => (
    <ToolsDelegationsComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    connection: state.connection,
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    validate: state.validate,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsDelegations));
