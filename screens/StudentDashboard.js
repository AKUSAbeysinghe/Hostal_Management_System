import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal
} from 'react-native';
import { ComplaintContext } from '../App';

export default function StudentDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const categories = ['Water', 'Electricity', 'Furniture', 'Cleanliness', 'Other'];

  const addComplaint = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }
    const newComplaint = {
      id: Date.now().toString(),
      category,
      description,
      status: 'Pending',
    };
    setComplaints([newComplaint, ...complaints]);
    setDescription('');
    Alert.alert('Success', 'Complaint submitted successfully!');
  };

  const deleteComplaint = (id) => {
    Alert.alert('Delete Complaint', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          const newComplaints = complaints.filter(c => c.id !== id);
          setComplaints(newComplaints);
        }
      }
    ]);
  };

  const viewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setModalVisible(true);
  };

  const saveEdit = () => {
    setComplaints(complaints.map(c => c.id === selectedComplaint.id ? selectedComplaint : c));
    setModalVisible(false);
    setSelectedComplaint(null);
    Alert.alert('Success', 'Complaint updated!');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Submit Complaint</Text>
      <TextInput
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        placeholderTextColor="#78909C"
      />
      <View style={styles.categoryContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, category === cat && styles.selectedCategory]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={addComplaint}>
        <Text style={styles.btnText}>Add Complaint</Text>
      </TouchableOpacity>

      <Text style={[styles.header, { marginTop: 24 }]}>My Complaints</Text>
      {complaints.length === 0 && <Text style={styles.emptyText}>No complaints submitted yet.</Text>}

      <FlatList
        data={complaints}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.complaintItem}>
            <Text style={styles.title}>{item.category} Issue</Text>
            <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.viewBtn} 
                onPress={() => viewComplaint(item)}
              >
                <Text style={styles.btnText}>View/Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteBtn} 
                onPress={() => deleteComplaint(item.id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Edit Complaint</Text>
            {selectedComplaint && (
              <>
                <TextInput
                  style={styles.input}
                  value={selectedComplaint.description}
                  onChangeText={(text) => setSelectedComplaint({ ...selectedComplaint, description: text })}
                  multiline
                  placeholderTextColor="#78909C"
                />
                <View style={styles.categoryContainer}>
                  {categories.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.categoryBtn, selectedComplaint.category === cat && styles.selectedCategory]}
                      onPress={() => setSelectedComplaint({ ...selectedComplaint, category: cat })}
                    >
                      <Text style={styles.categoryText}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.addBtn} onPress={saveEdit}>
                  <Text style={styles.btnText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.addBtn, { backgroundColor: '#B0BEC5', marginTop: 8 }]} 
                  onPress={() => { setModalVisible(false); setSelectedComplaint(null); }}
                >
                  <Text style={[styles.btnText, { color: '#263238' }]}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#E0F7FA'    // ← light cyan / pale turquoise background
  },
  backBtn: { 
    marginBottom: 12 
  },
  backText: { 
    color: '#1976D2',           // deep blue
    fontWeight: 'bold', 
    fontSize: 18 
  },
  header: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 12, 
    color: '#0D47A1'            // deep navy blue for headers
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#B3E5FC', 
    padding: 12, 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF', 
    marginBottom: 12,
    fontSize: 16,
    color: '#263238'
  },
  categoryContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginBottom: 16 
  },
  categoryBtn: { 
    backgroundColor: '#80DEEA',   // soft cyan-teal base
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10, 
    marginBottom: 8,
    minWidth: 80,
    alignItems: 'center'
  },
  selectedCategory: { 
    backgroundColor: '#26A69A'    // mint teal accent when selected
  },
  categoryText: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 14 
  },
  addBtn: { 
    backgroundColor: '#26A69A',   // mint teal primary button
    padding: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 20,
    // Optional: add shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  complaintItem: { 
    backgroundColor: '#F0FCFF',   // very light cyan-white card
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#B3E5FC',
  },
  title: { 
    fontWeight: '700', 
    fontSize: 17, 
    color: '#0D47A1',           // deep blue
    marginBottom: 6 
  },
  description: { 
    color: '#455A64', 
    fontSize: 15, 
    marginBottom: 6 
  },
  status: { 
    color: '#78909C', 
    fontSize: 14, 
    marginBottom: 12 
  },
  buttonRow: { 
    flexDirection: 'row', 
    marginTop: 8 
  },
  viewBtn: { 
    flex: 1, 
    marginRight: 8, 
    backgroundColor: '#2196F3',   // nice blue for view/edit
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  deleteBtn: { 
    flex: 1, 
    marginLeft: 8, 
    backgroundColor: '#EF5350',   // softer red for delete
    padding: 10, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  btnText: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 15 
  },
  emptyText: { 
    color: '#78909C', 
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 20 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.4)' 
  },
  modalContent: { 
    width: '88%', 
    backgroundColor: '#FFFFFF', 
    padding: 24, 
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});