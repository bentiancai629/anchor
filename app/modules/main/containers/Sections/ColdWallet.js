// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ColdWallet from '../../../../shared/components/ColdWallet/Wallet';
import * as TransactionActions from '../../../../shared/actions/transaction';

class ColdWalletContainer extends Component<Props> {
  render() {
    return (
      <ColdWallet {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...TransactionActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ColdWalletContainer));
