import React from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        headerRight: (
            <Button
                title='Settings'
                backgroundColor='rgba(0, 0, 0, 0)'
                color='rgba(0, 122, 255, 1)'
                onPress={() => navigation.navigate('settings')}
            />
        ),
    })

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const {
                jobtitle,
                jobkey,
                company,
                formattedRelativeTime,
                url,
                longitude, latitude,
            } = job;

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.05,
                latitudeDelta: 0.02,
            }
            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>

                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={initialRegion}
                            scrollEnabled={false}
                        />

                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        
                        <Button
                            title='Apply Now!'
                            backgroundColor='#03A9F4'
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            )
        })
    }

    render() {

        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles={
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    italics: {
        fontStyle: 'italic',
    }
}

const mapStateToProps = ({ likedJobs }) => {
    return { likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);