import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, ScrollView, Image, Text, StyleSheet, StatusBar, TouchableWithoutFeedback, Alert  } from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Dimensions from 'Dimensions';
import StarRating from '../star_rating/star_rating';

class ReviewIndexItem extends Component {

  constructor(props) {
    super(props);

    this.floatToArray = this.floatToArray.bind(this);
  }

  floatToArray (rating) {
    let arr = [];
    for (var i = 0; i < 5; i++) {
      arr.push(rating);
      rating--;
    }
    return arr;
  }

  _onPressDelete(type) {
    return () => {
      this.props.deleteReviewById(this.props.review.id);
      
    };
  }

  render() {
    const {review, currentUser} = this.props;
    return(
      <View>
        <View style={styles.reviewIndexItemContainer}>
          <Image style={styles.profileImage} source={{uri: review.userImg}} />
          <View>
            <View style={styles.nameAndDate}>
              <Text style={styles.userFullName}>{review.userFullname}</Text>
              <Text>{review.dateCreated}</Text>
            </View>
            <View style={styles.starRating}>
              {this.floatToArray(review.rating).map((score, i) => <StarRating key={i} score={score}/>)}
            </View>
            <View style={styles.bodyAndDelete}>
              <Text>{review.body}</Text>
              {review.author_id === currentUser.id ?
                <TouchableWithoutFeedback onPress={this._onPressDelete("DeleteReview")}>
                  <FontAwesome name={'trash-o'} size={30} />
                </TouchableWithoutFeedback> :
                  <View />}
            </View>
          </View>
        </View>
        <View style={styles.hr}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reviewIndexItemContainer: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  profileImage: {
   width: Dimensions.get('window').width*.2,
   height: Dimensions.get('window').width*.2,
   borderRadius: Dimensions.get('window').width*.1,
   borderColor: 'gray',
   borderWidth: .5
 },
 nameAndDate: {
   width: Dimensions.get('window').width*.8,
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 userFullName: {
   fontWeight: "bold"
 },
 starRating: {
   flexDirection: 'row',
 },
 bodyAndDelete: {
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
 hr: {
   width: Dimensions.get('window').width*1,
   borderBottomColor: 'black',
   borderBottomWidth: 1,
   marginTop: 10,
 },
});

export default ReviewIndexItem;
