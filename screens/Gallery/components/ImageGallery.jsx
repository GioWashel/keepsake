import React, {useState} from 'react';
import { View, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../constants/Colors';
const ImageGallery = () => {
    const {height, width} = useWindowDimensions();
    const [images, setImages] = useState(
        //temporary data, will be fetched from firebase storage
        [require('../assets/images/snap1.jpg'),
         require('../assets/images/snap2.jpg'),
         require('../assets/images/snap3.jpg'),
         require('../assets/images/snap6.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg'),
         require('../assets/images/snap17.jpg')]);
    const navigation = useNavigation();
    const [opacities, setOpacities] = useState(Array(images.length).fill(1));
    const numColumns = 3;
    const handleImagePress = (index) => {
        const imageName = `Image + ${index}`;
        console.log(imageName);
        navigation.navigate("DateScreen", {name: imageName });
    }
    return(
        <FlatList
            horizontal={false}
            style={{ flex: 1, backgroundColor: Colors.red }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={images}
            keyExtractor={(item, index) => item + index}
            numColumns={numColumns}
            renderItem={({ item, index }) => (
            <Pressable
                delayLongPress={50}
                onPress={() => handleImagePress(index)}
                onPressOut={() => {
                // Reset ths opacity for theSS pressed image
                const newOpacities = [...opacities];
                newOpacities[index] = 1;
                setOpacities(newOpacities);
                }}
                onPressIn={() => {
                // Decrease the opacity for the pressed image
                const newOpacities = [...opacities];
                newOpacities[index] = 0.4;
                setOpacities(newOpacities);
                }}
            >
                <View style={{opacity: opacities[index] }}>
                    <Image
                        source={item}
                        key={index}
                        contentFit="cover"
                        style={{
                        width: width / 3.8,
                        height: height / 4.5,
                        margin: 10,
                        borderRadius: 10,
                        }}
                    />
                </View>
            </Pressable>
            )}
        />
    );
}
export default ImageGallery;

