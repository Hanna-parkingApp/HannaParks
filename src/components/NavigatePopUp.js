import { useState } from 'react';
import { Popup, showLocation} from 'react-native-map-link';
import { useSelector } from 'react-redux';
import { delay } from '../constants/helpers/helperFunctions';
import { selectCarDetail } from '../features/car-detail/carDetailSlice';

const NavigatePopUp = (props) => {
    const { setModalVisible } = props;
    const [isVisible, setIsVisible] = useState(false);

    const carDetail = useSelector(selectCarDetail)

    const showLoc = showLocation({
        latitude: carDetail.specificLoc.latitude,
        longitude: carDetail.specificLoc.longitude,
        sourceLatitude: -8.0870631,  // optionally specify starting location for directions
        sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
        title: carDetail.generalLoc,  // optional
        googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
        googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
        alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
        dialogTitle: 'Do you want to navigate to parking location?', // optional (default: 'Open in Maps')
        dialogMessage: 'choose the app', // optional (default: 'What app would you like to use?')
        cancelText: 'cancel', // optional (default: 'Cancel')
        // appsWhiteList:['waze','apple-maps','google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
        naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
        // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
        // app: 'uber',  // optionally specify specific app to use
        directionsMode: 'car' // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
    })

    return (
        <Popup
            isVisible={isVisible}
            onCancelPressed={async () =>{ 
                setIsVisible(false);
                await delay(2);
                setModalVisible(false);
                
            } }
            //onAppPressed={() => {setIsVisible(false); setModalVisible(false)}}
            // onBackButtonPressed={() => setIsVisible(false) }
            // modalProps={{ // you can put all react-native-modal props inside.
            //     animationIn: 'slideInUp'
            // }}
            // appsWhiteList={['waze','apple-maps','google-maps']}
        // options={{ /* See `showLocation` method above, this accepts the same options. */ }}
        style={{ 
            container: {},
            itemContainer: {},
            image: {},
            itemText: {},
            headerContainer: {},
            titleText: {},
            subtitleText: {},
            cancelButtonContainer: {},
            cancelButtonText: {},
            separatorStyle: {},
            activityIndicatorContainer: {}
         }}
        />
    )
}

export default NavigatePopUp;