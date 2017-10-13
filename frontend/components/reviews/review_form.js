import React from "react";
import { connect } from "react-redux";
import StarRating from '../star_rating/star_rating';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
  Dimensions
} from "react-native";

class ReviewForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      body: ""
    };

    this.intToArray = this.intToArray.bind(this);
    this.getStatefromChild = this.getStatefromChild.bind(this);
  }

  //convert rating into an array so each el in the array represents a star
  intToArray () {
    let rating = this.state.rating;
    let arr = [];
    for (var i = 0; i < 5; i++) {
      arr.push(rating);
      rating--;
    }
    return arr;
  }
  // get user input for star rating
  getStatefromChild(rating) {
    this.setState({
      rating: rating
    });
  }

  onSubmit() {
    return () => {
      const review = Object.assign({}, {
        rating: this.state.rating,
        body: this.state.body,
        user_id: this.props.currentUser.id
      });
      this.props.createReview(review);
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Rate & Review</Text>
        <Image
          style={styles.image}
          source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sushi_chef_Masayoshi_Kazato_02.JPG/1200px-Sushi_chef_Masayoshi_Kazato_02.JPG"}}
        />
      <Text>Overall Experience</Text>
      <Text>How would you rate you service?</Text>
        <View style={styles.starRating}>
        {this.intToArray().map(
          (score, i) => <StarRating
            key={i}
            pos={i+1}
            score={score}
            disabled={false}
            callBackFromParent={this.getStatefromChild}/>
      )}
        </View>
        <Text>Share Your Story!</Text>
        <TextInput
          onChangeText={(body) => this.setState({body})}
          placeholder="Tell others in the Artis community about your experience."
          style={styles.textfield}
          multiline={true}
          underlineColorAndroid={'transparent'}
          textAlignVertical={"top"}
        />
        <TouchableHighlight style={styles.button} onPress={this.onSubmit()}>
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignSelf: "stretch",
    backgroundColor: "white",
    padding: 10
  },
  starRating: {
    flexDirection: 'row',
  },
  input: {
    height: 50,
    backgroundColor: "#F7F7F7",
    padding: 4,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
  },
  textfield: {
    height: 100,
    backgroundColor: "#F7F7F7",
    padding: 4,
    marginTop: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray"
  },
  label: {
    color: "black"
  },
  image: {
    height: Dimensions.get('window').height*0.4
  },
  button: {
    height: 50,
    backgroundColor: "#00BCF3",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "white"
  },
  title: {
    fontSize: 100,
    alignSelf: "center",
    fontWeight: "bold"
  }
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
