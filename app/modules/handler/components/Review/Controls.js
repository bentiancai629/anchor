// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Divider, Form, Header, Icon, Segment } from 'semantic-ui-react';
import GlobalAccountDropdownSelect from '../../../../shared/containers/Global/Account/Dropdown/Select';

class PromptReviewControls extends Component<Props> {
  render() {
    const {
      callback,
      canBroadcast,
      chainId,
      couldSignWithDevice,
      enableWhitelist,
      onCheck,
      onSelect,
      onWhitelist,
      settings,
      shouldBroadcast,
      t,
      wallet,
    } = this.props;
    const {
      account,
      authorization,
      mode,
      pubkey,
    } = wallet;
    let callbackField;
    if (callback && callback.url && callback.url !== '') {
      const url = new URL(callback.url);
      callbackField = (
        <Form.Field>
          <label>
            <Icon name="linkify" />
            Callback
          </label>
          <Segment basic size="large" style={{ marginTop: 0 }}>
            <p>{url.origin}</p>
          </Segment>
        </Form.Field>
      );
    }
    return (
      <Form>
        <Header>
          Request Options
          <Header.Subheader>
            Use the controls below to configure how this request will be processed.
          </Header.Subheader>
        </Header>
        <Form.Field>
          <label>
            <Icon
              name="user"
              style={{
                marginRight: '0.5em',
              }}
            />
            Account
          </label>
          <GlobalAccountDropdownSelect
            account={account}
            authorization={authorization}
            mode={mode}
            pubkey={pubkey}
            chainId={chainId}
            onSelect={onSelect}
          />
        </Form.Field>
        {(settings && ['ledger', 'hot'].includes(wallet.mode))
          ? (
            <Form.Field>
              <label>
                <Icon
                  name="cogs"
                  style={{
                    marginRight: '0.5em',
                  }}
                />
                Preferences
              </label>
              <Segment basic style={{ marginTop: 0 }}>
                <Form.Checkbox
                  checked={settings.promptCloseOnComplete}
                  label="Close window when completed"
                  name="promptCloseOnComplete"
                  onChange={onCheck}
                  toggle
                />
                {(
                  shouldBroadcast
                  // Disable this option for now, not production ready.
                  && true === false
                )
                  ? (
                    <Form.Checkbox
                      checked={canBroadcast && settings.promptSignAndBroadcast}
                      disabled={!canBroadcast}
                      label="Broadcast Transaction"
                      name="promptSignAndBroadcast"
                      onChange={onCheck}
                      toggle
                    />
                  )
                  : false
                }
                {(
                  // Using a device prevents whitelists from working
                  !couldSignWithDevice
                  // Disable this option for now, not production ready.
                  && true === false
                )
                  ? (
                    <Form.Checkbox
                      checked={enableWhitelist}
                      label="Add Transaction to Whitelist"
                      name="esr_whitelist"
                      onChange={onWhitelist}
                      toggle
                    />
                  )
                  : false
                }
                <Form.Checkbox
                  checked
                  label="Increase privacy by using anonymous callback proxy"
                  style={{ display: 'none' }}
                />
              </Segment>
            </Form.Field>
          )
          : false
        }
        {callbackField}
      </Form>
    );
  }
}

export default withTranslation('global')(PromptReviewControls);
