import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Button as Btn,
} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {HStack, NativeBaseProvider, Center, Button} from 'native-base';

const NewReminder = ({navigation, route}) => {
  const reminder = route.params.reminder;
  const [title, setTitle] = useState(reminder.title);
  const [notes, setNotes] = useState(reminder.notes);
  const [date, setDate] = React.useState(new Date());

  const handleSave = () => {
    const newReminder = {...reminder};
    newReminder.title = title;
    newReminder.notes = notes;
    newReminder.date = date;
    if (newReminder.title === '') {
      Alert.alert('Tittle cannot be empty', 'Please fill the title input');
    } else {
      route.params.addReminder(newReminder);
      navigation.goBack();
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Reminder Details</Text>
        <Text style={styles.caption}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Awesome title"
        />
        <Text style={styles.caption}>Notes</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
          numberOfLines={5}
          placeholder="Write something here..."
        />
        <Text>Dated to: {date.toLocaleString()}</Text>
        <NativeBaseProvider>
          <Center>
            <HStack space={4} alignItems="center">
              <Button
                title="Pick Date"
                variant="ghost"
                size="lg"
                onPress={showDatepicker}>
                Pick Date
              </Button>
              <Button
                title="Pick Date"
                variant="ghost"
                size="lg"
                onPress={showTimepicker}>
                Pick Time
              </Button>
            </HStack>
          </Center>
        </NativeBaseProvider>
      </View>
      <Btn title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  form: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
    marginBottom: 20,
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
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 10,
  },
  textArea: {
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 10,
  },
});

export default NewReminder;
