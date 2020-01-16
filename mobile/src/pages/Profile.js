import React from 'react';
import { View } from 'react-native';

import { WebView } from 'react-native-webview';
// import { Container } from './styles';

function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');

  return (
    <WebView source={{ uri: `https://github.com/${githubUsername}` }} style={{ flex: 1 }} />
  );
}

export default Profile;