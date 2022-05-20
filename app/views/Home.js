import React from 'react';
import {Button, View, StyleSheet, Text, FlatList} from 'react-native';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddButton from '../components/AddButton';
import {Center, NativeBaseProvider} from 'native-base';

/*
REMINDER
id: int
title: string
notes: string
time: date - timestamp
*/

const Home = ({navigation, name = 'Jona'}) => {
  const [reminders, setReminders] = React.useState([]);
  const [profile, setProfile] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button color="#1E88F7" title="Profile" onPress={openProfile} />
      ),
    });
  });

  React.useEffect(() => {
    getData()
      .then(value => {
        if (!!value) {
          setReminders(value);
        }
      })
      .catch(e => console.log('ERROR', e));
  }, []);

  React.useEffect(() => {
    getProfile()
      .then(value => {
        if (!!value) {
          setProfile(value);
        }
      })
      .catch(e => console.log('ERROR', e));
  }, []);

  const SaveProfile = _profile => {
    const newProfile = _profile;
    newProfile.phone = _profile.phone;
    newProfile.description = _profile.description;
    setProfile(newProfile);
    storeProfile(newProfile);
  };

  const openProfile = () => {
    const newProfile = {
      phone: profile.phone,
      description: profile.description,
    };
    navigation.navigate('Profile', {
      profile: newProfile,
      saveProfile: SaveProfile,
      name: 'Jonathan',
    });
  };

  const AddReminder = reminder => {
    const newReminders = [...reminders, reminder];
    setReminders(newReminders);
    storeData(newReminders);
  };

  const openAddNewReminder = () => {
    const newId = !!reminders.length
      ? reminders[reminders.length - 1].id + 1
      : 1;
    const newItem = {
      id: newId,
      title: '',
      notes: '',
      time: new Date().getTime(),
    };
    navigation.navigate('NewReminder', {
      reminder: newItem,
      addReminder: AddReminder,
    });
  };

  const deleteReminder = reminder => {
    const newReminders = reminders.filter(item => item.id !== reminder.id);
    setReminders(newReminders);
    storeData(newReminders);
  };

  const saveReminder = reminder => {
    const newReminders = reminders.map(r => {
      if (r.id === reminder.id) {
        return reminder;
      } else return r;
    });
    setReminders(newReminders);
    storeData(newReminders);
  };

  const openReminder = reminder => {
    navigation.navigate('Details', {
      reminder: reminder,
      saveReminder: saveReminder,
    });
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('Reminders-Data', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const storeProfile = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('Profile-Data', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getProfile = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Profile-Data');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Reminders-Data');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {name} </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={reminders}
          renderItem={({item}) => (
            <ListItem
              reminder={item}
              deleteReminder={deleteReminder}
              openDetails={openReminder}
            />
          )}
        />
      </View>
      <NativeBaseProvider>
        <Center flex={1} px="1">
          <AddButton openAddNewReminder={openAddNewReminder} />
        </Center>
      </NativeBaseProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  listContainer: {
    width: '100%',
    height: '80%',
  },
});

export default Home;
