import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import Container from './Container';
import "./styles.css"

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

export default App;
