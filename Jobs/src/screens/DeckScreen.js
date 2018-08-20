import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import Swipe from '../components/Swipe';
import * as actions from '../actions';


class DeckScreen extends React.Component {
    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='description' size={30} color={tintColor} />
        }
    }

    renderCard = (job) => {
        const {
            jobtitle,
            company,
            formattedRelativeTime,
            snippet,
            longitude, latitude,
        } = job;

        const initialRegion = {
            longitude,
            latitude,
            longitudeDelta: 0.05,
            latitudeDelta: 0.02,
        }

        return (
            <Card title={jobtitle} >
                <View style={{ height: 300, flex: 1 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        initialRegion={initialRegion}
                        // cacheEnabled={true}
                    />
                </View>

                <View style={styles.detailWrapper}>
                    <Text>{company}</Text>
                    <Text>{formattedRelativeTime}</Text>
                </View>
                <Text style={styles.detail}>
                    {snippet.replace(/<\/*b>/g, '')}
                </Text>
            </Card>
        );
    }

    renderNoMoreCards = () => {
        return (
            <Card title='No More Jobs'>
                <Button
                    title='Back To Map'
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor='#03A9F4'
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Swipe 
                    data={this.props.jobs}
                    keyProp='jobkey'
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={job => this.props.likeJob(job)}
                />
            </View>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    }
}

const mapStateToProps = ({ jobs }) => {
    return { jobs: jobs.results }
}

export default connect(mapStateToProps, actions)(DeckScreen);