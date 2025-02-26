import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const initialState = [];

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: task });
      setTask('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        todo list
      </Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' }}
        placeholder="Enter new task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Save" onPress={addTodo} />

      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TODO', payload: item.id })}>
            <Text style={{ fontSize: 18, backgroundColor: '#ddd', padding: 10, marginTop: 5, borderRadius: 5, textAlign: 'center' }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
