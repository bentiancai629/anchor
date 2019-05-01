// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import {
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

class RexInterfaceAbout extends PureComponent<Props> {
  render() {
    const {
      t
    } = this.props;

    return (
      <Segment basic>
        <Header
          warning
        >
          <Header.Subheader>
            {t('rex_rent_about_header')}
          </Header.Subheader>
        </Header>
      </Segment>
    );
  }
}

export default translate('rex')(RexInterfaceAbout);