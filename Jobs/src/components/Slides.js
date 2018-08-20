import React from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;


class Slides extends React.Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title='Start Now!'
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            const { text, color }  = slide;

            return (
                <View key={text} style={[styles.slideStyle, { backgroundColor: color }]} >
                    <Text style={styles.textStyle}>{text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        paddingRight: 20,
        paddingLeft: 20,
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15,
    },
}

export default Slides;