// @flow
import React, { PureComponent } from 'react';
import { Button, Container, Form, Header, Icon, Image, Modal, Segment } from 'semantic-ui-react';

import DangerLink from '../../../../../shared/containers/Global/DangerLink';
import Logo from '../../../../../renderer/assets/images/anchor-logo-blue.svg';
import packageJson from '../../../../../../package.json';

const { ipcRenderer } = require('electron');

class OverviewSidebarUpdate extends PureComponent<Props> {
  state = { open: false }
  toggle = () => this.setState({ open: !this.state.open })
  checkForUpdates = () => ipcRenderer.send('checkForUpdates')
  render() {
    const {
      constants,
      settings,
    } = this.props;
    const {
      open
    } = this.state;
    const { version } = packageJson;
    let upgradeAvailable = false;
    // Determine if an upgrade is actually available
    if (version && constants && constants.desktop && constants.desktop !== version) {
      const [
        nextMajor,
        nextMinor,
        nextPatch
      ] = constants.desktop.split('.');
      const [
        currentMajor,
        currentMinor,
        currentPatch
      ] = version.split('.');
      // Determine if a higher version number exists
      const matchMajor = (currentMajor === nextMajor);
      const matchMinor = (currentMinor === nextMinor);
      upgradeAvailable = (
        nextMajor > currentMajor
        || (matchMajor && parseInt(nextMinor, 10) > parseInt(currentMinor, 10))
        || (matchMajor && matchMinor && parseInt(nextPatch, 10) > parseInt(currentPatch, 10))
      );
      // console.log(nextMajor, currentMajor)
      // console.log(matchMajor, parseInt(nextMinor, 10), parseInt(currentMinor, 10))
      // console.log(matchMajor, matchMinor, parseInt(nextPatch, 10), parseInt(currentPatch, 10))
      // If the user has explicitly skipped this update
      // if (settings.upgradeSkip === constants.desktop) {
      //   upgradeAvailable = false;
      // }
    }

    if (!upgradeAvailable) return false;

    const update = constants.desktoplog;
    if (!update) return false;

    return (
      <React.Fragment>
        <Segment attached="top" color="blue" textAlign="center">
          <Header>
            <Header.Subheader>
              New Anchor Release
            </Header.Subheader>
            v{constants.desktop}
          </Header>
          <Modal
            closeIcon
            onOpen={this.toggle}
            onClose={this.toggle}
            open={open}
            size="tiny"
            trigger={(
              <Button
                centered
                content="Details"
                icon="external"
                primary
              />
            )}
          >
            <Header
              size="large"
            >
              <Image
                src={Logo}
                style={{ marginRight: '0.25em' }}
              />
              <Header.Content>
                Anchor - v{constants.desktop}
                <Header.Subheader>
                  {update.header}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Modal.Content>
              <p>An update for Anchor is now available and information about this recent release is included below.</p>
              <Form style={{ marginBottom: '1em' }}>
                <Header size="tiny">
                  {constants.desktop} Release Notes
                </Header>
                <Form.TextArea rows={6}>
                  {update.description}
                </Form.TextArea>
              </Form>
              <p>For further information about this release, please visit our GitHub releases page.</p>
              <Container textAlign="center">
                <DangerLink
                  content={(
                    <Form.Button
                      content="View Update on GitHub"
                      icon="github"
                      primary
                    />
                  )}
                  link={`https://github.com/greymass/anchor/releases/tag/v${constants.desktop}`}
                />
              </Container>
            </Modal.Content>
            <Modal.Actions>
              <Header size="small">
                Would you like to automatically update?
              </Header>
              <Button basic color='red' onClick={this.toggle}>
                <Icon name='remove' /> No
              </Button>
              <Button color='green' onClick={this.checkForUpdates}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Segment>
      </React.Fragment>
    );
  }
}

export default OverviewSidebarUpdate;
