import React from 'react';
import {Button, Box} from 'native-base';

const AddButton = ({openAddNewReminder}) => {
  return (
    <Box alignItems="center">
      <Button
        colorScheme="blue"
        width="70"
        onPress={() => openAddNewReminder()}>
        +
      </Button>
    </Box>
  );
};

export default AddButton;
