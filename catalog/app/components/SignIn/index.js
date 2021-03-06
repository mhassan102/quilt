/* SignIn */
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { makeSignInURL } from 'utils/auth';
import MIcon from 'components/MIcon';
import Spinner from 'components/Spinner';
import { authButtonStyle } from 'constants/style';

import strings from './messages';

const onClickSignIn = () => {
  const dest = makeSignInURL();
  window.location = dest;
};

const SignIn = ({ error, useNavStyle, waiting }) => {
  if (waiting) {
    return <Spinner className="fa-2x" drop="8px" />;
  }
  let icon = null;
  if (error) {
    const title = `${error.message}\n${JSON.stringify(error)}`;
    icon = <MIcon drop="6px" title={title}>error_outline</MIcon>;
  }
  return (
    <div>
      {icon}
      {
        useNavStyle ?
          <FlatButton onClick={onClickSignIn} style={authButtonStyle}>
            <FormattedMessage {...strings.logIn} />
          </FlatButton> :
          <RaisedButton onClick={onClickSignIn}>
            <FormattedMessage {...strings.logIn} />
          </RaisedButton>
      }
    </div>
  );
};

SignIn.propTypes = {
  error: PropTypes.object,
  useNavStyle: PropTypes.bool,
  waiting: PropTypes.bool.isRequired,
};

SignIn.defaultProps = {
  useNavStyle: true,
};

export default SignIn;
