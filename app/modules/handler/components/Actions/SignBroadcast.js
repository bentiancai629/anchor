// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Header, Icon, Label } from 'semantic-ui-react';

class PromptActionSign extends Component<Props> {
  render() {
    const {
      disabled,
      loading,
      onClick,
      t,
      wallet,
    } = this.props;
    return (
      <Button
        animated="fade"
        as="div"
        disabled={disabled}
        floated="right"
        labelPosition="left"
        onClick={onClick}
      >
        <Label
          as="a"
          basic
          pointing="right"
        >
          <Header textAlign="left">
            <Header.Content>
              <Header.Subheader style={{ fontWeight: 'bold' }}>
                Sign & Broadcast Transaction
              </Header.Subheader>
              {wallet.account}@{wallet.authorization}
            </Header.Content>
          </Header>
        </Label>
        <Button
          color="purple"
          icon
          loading={loading}
          style={{ position: 'relative' }}
        >
          <Button.Content hidden style={{ marginTop: '-0.75em' }}>
            <Icon
              name="signup"
              size="large"
              style={{ margin: 0 }}
            />
            <Icon
              name="plus"
              size="small"
              style={{
                margin: '0 0.5em'
              }}
            />
            <Icon
              name="cloud upload"
              size="large"
              style={{ margin: 0 }}
            />
          </Button.Content>
          <Button.Content visible style={{ margin: '0 1em' }}>
            <Icon
              name="pencil"
              size="large"
              style={{ margin: 0 }}
            />
            <Icon
              name="plus"
              size="small"
              style={{
                margin: '0 0.5em'
              }}
            />
            <Icon
              name="cloud"
              size="large"
              style={{ margin: 0 }}
            />
          </Button.Content>
        </Button>
      </Button>
    );
  }
}

export default withTranslation('global')(PromptActionSign);
