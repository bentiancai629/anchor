// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { times } from 'lodash';
import { Button, Grid, Header, Icon, Message, Segment, Table } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import GlobalButtonElevate from '../../containers/Global/Button/Elevate';
import WalletPanelFormHash from '../Wallet/Panel/Form/Hash';

const { clipboard } = require('electron');
const ecc = require('eosjs-ecc');

class ToolsKeyGenerator extends Component<Props> {
  state = {
    keys: [],
    revealed: {}
  };

  copyToClipboard = () => {
    let string = '';
    this.state.keys.forEach((key) => {
      string += `Public Key: ${key[0]}\nPrivate Key: ${key[1]}\n\n`;
    });
    clipboard.writeText(string);
    this.setState({
      copied: true,
    }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  };
  generateKeyPairs = (e, { count }) => {
    console.log(count)
    times(count, this.generateKeyPair);
  }

  generateKeyPair = () => {
    const { connection } = this.props;
    const { keyPrefix } = connection;
    ecc.randomKey().then(privateKey => {
      const keys = this.state.keys.slice(0);
      const publicKey = ecc.privateToPublic(privateKey, keyPrefix);
      keys.push([publicKey, privateKey]);
      this.setState({
        keys,
        revealed: Object.assign({}, this.state.revealed, {
          [publicKey]: false
        }),
      });
      if (this.props.onKeypair) {
        this.props.onKeypair(publicKey);
      }
      return keys;
    }).catch((e) => {
      console.log('error', e);
    });
  };

  toggleReveal = (publicKey) => {
    this.setState({
      revealed: Object.assign({}, this.state.revealed, {
        [publicKey]: !this.state.revealed[publicKey]
      })
    });
  }

  saveKeyPairs = (password) => {
    const { keys } = this.state;
    this.props.actions.importKeypairStorage(password, keys);
    if (this.props.onSave) {
      this.props.onSave();
    }
  }

  render() {
    const {
      actions,
      connection,
      settings,
      t
    } = this.props;
    const {
      copied,
      keys,
      revealed,
    } = this.state;

    if (!settings.walletHash) {
      return (
        <Segment style={{ margin: 0 }}>
          <Grid divided="vertically" padded="vertically" stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header size="large">
                  <Icon name="lock" />
                  <Header.Content>
                    {t('global_account_import_private_requires_hash_header_r2')}
                    <Header.Subheader>
                      {t('global_account_import_private_requires_hash_subheader_r2')}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center">
                <p>
                  <WalletPanelFormHash
                    actions={actions}
                  />
                </p>
                <p>
                  Ensure you keep a copy of both your password and your keys safely offline. This password cannot be recovered.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
    }
    return (
      <Segment attached="bottom">
        <Header>
          {t('tools:tools_keys_key_generation_header_r2')}
          <Header.Subheader>
            {t('tools:tools_keys_key_generation_subheader_message_r2')}
          </Header.Subheader>
        </Header>
        <Button
          color="blue"
          content="Generate Key Pair (x2)"
          icon="circle plus"
          count={2}
          onClick={this.generateKeyPairs}
        />
        <Button
          basic
          color={(copied) ? "teal" : "blue"}
          content={(copied) ? 'Copied!' : t('tools:tools_keys_key_generation_copy_clipboard')}
          disabled={keys.length === 0}
          floated="right"
          icon="clipboard"
          onClick={this.copyToClipboard}
        />
        <Message
          header="Some/all of these keys have NOT been saved."
          hidden={this.props.importing || this.props.closable}
          icon="warning sign"
          negative
          size="large"
          content="These key must either be saved externally or within your Anchor wallet using the controls above."
        />
        <Message
          header="Keys Saved"
          hidden={!(keys.length > 0 && this.props.closable)}
          icon="circle checkmark"
          positive
          size="large"
          content={(
            <div>
              Make sure to create a new backup of your wallet to save these keys.
            </div>
          )}
        />
        <Segment.Group>
          {(keys.length) ? (
            <React.Fragment>
              {keys.map(key => {
                const isRevealed = (revealed[key[0]]);
                return (
                  <Segment color="grey">
                    <Table definition>
                      <Table.Row>
                        <Table.Cell collapsing>Public Key</Table.Cell>
                        <Table.Cell>{key[0]}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell collapsing>Private Key</Table.Cell>
                        <Table.Cell>
                          {(isRevealed)
                            ? (
                              <span>
                                <Icon
                                  name="eye"
                                  onClick={() => this.toggleReveal(key[0])}
                                />
                                {key[1]}
                              </span>
                            )
                            : (
                              <span>
                                <Icon
                                  name="eye"
                                  onClick={() => this.toggleReveal(key[0])}
                                />
                                ************************************************************
                              </span>
                            )
                          }

                        </Table.Cell>
                      </Table.Row>
                    </Table>
                  </Segment>
                )
              })}
              <Segment basic textAlign="center">
                <GlobalButtonElevate
                  onSuccess={(password) => this.saveKeyPairs(password)}
                  trigger={(
                    <Button
                      centered
                      color="purple"
                      content={t('tools:tools_keys_key_generation_save_keys')}
                      icon="save"
                    />
                  )}
                />
              </Segment>

            </React.Fragment>
          )
          : (
            <Segment color="grey" secondary>
              <p>
                Click 'Generate Key' to create a new public/private key pair.
              </p>
            </Segment>
          )
        }
        </Segment.Group>
      </Segment>
    );
  }
}

export default withTranslation(['global', 'tools'])(ToolsKeyGenerator);
