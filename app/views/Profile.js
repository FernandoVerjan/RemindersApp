import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';

const Profile = ({navigation, route}) => {
  const profile = route.params.profile;
  const [phone, setPhone] = React.useState(profile.phone);
  const [description, setDescription] = React.useState(profile.description);

  const handleSave = () => {
    const newProfile = {...profile};
    newProfile.phone = phone;
    newProfile.description = description;
    route.params.saveProfile(newProfile);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Image source={{uri: 'https://picsum.photos/410'}} style={styles.image} />
      <Text style={styles.title}>{route.params.name}</Text>
      <Text style={styles.caption}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phone}
        keyboardType="numeric"
        onChangeText={setPhone}
      />
      <Text style={styles.caption}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        placeholder="Something about you"
        onChangeText={setDescription}
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 140,
    height: 140,
    borderRadius: 999,
    alignSelf: 'center',
  },
  caption: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    marginLeft: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    padding: 10,
  },
});

export default Profile;
