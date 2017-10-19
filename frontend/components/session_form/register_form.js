import React from "react";
import { connect } from "react-redux";
import { register, clearSessionErrors, RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import SessionErrors from "./session_errors";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from "react-native";

class RegisterForm extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: null,
    headerTintColor: "#C6D166"
  });

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      errors: []
    };
  }

  componentWillMount() {
    if (this.props.errors.length > 0) {
      this.props.clearSessionErrors();
    }
  }

  onRegister() {
    const { navigate } = this.props.navigation;
    return () => {
      const user = Object.assign({},{
        username: this.state.username.toLowerCase(),
        password: this.state.password,
        email: this.state.email
      });
      this.props.register(user).then((res) => {
        if (res && res.type === RECEIVE_CURRENT_USER) {
          navigate("Explore");
        }
      });
    };
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableAutoAutomaticScroll={true}
        extraHeight={200}
        >
        <Text style={styles.title}>Artis</Text>
        <TextInput
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          style={styles.input}
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          onChangeText={username => this.setState({ username })}
          placeholder="Username"
          style={styles.input}
          underlineColorAndroid={"transparent"}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.input}
          underlineColorAndroid={"transparent"}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onRegister()}
          underlayColor={"#5C821A"}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>

        <SessionErrors errors={this.props.errors} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "white",
    padding: 10
  },
  input: {
    height: 50,
    backgroundColor: "#F7F7F7",
    padding: 4,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#5C821A",
    color: "#0F1B07"
  },
  label: {
    color: "black"
  },
  button: {
    height: 50,
    backgroundColor: "#C6D166",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    color: "white"
  },
  title: {
    fontSize: 100,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#5C821A"
  }
});

const mapStateToProps = state => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(register(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
