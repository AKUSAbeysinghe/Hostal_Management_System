import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ComplaintContext } from '../App';

export default function StudentDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const categories = ['Water', 'Electricity', 'Furniture', 'Cleanliness', 'Other'];

  // Add new complaint
  const addComplaint = () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }
    const newComplaint = {
      id: Date.now().toString() + Math.random().toString(), // Unique ID
      category,
      description,
      status: 'Pending',
    };
    setComplaints(prev => [newComplaint, ...prev]);
    setDescription('');
  };

  // Delete complaint
  const deleteComplaint = (id) => {
    Alert.alert(
      'Delete Complaint',
      'Are you sure you want to delete this complaint?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // ✅ Create a new array reference
            const updated = complaints.filter(c => c.id !== id);
            setComplaints(updated);
          },
        },
      ]
    );
  };

  // View/Edit complaint
  const viewComplaint = (complaint) => {
    setSelectedComplaint({ ...complaint }); // clone object
    setModalVisible(true);
  };

  // Save edits
  const saveEdit = () => {
    const updated = complaints.map(c =>
      c.id === selectedComplaint.id ? { ...selectedComplaint } : c
    );
    setComplaints(updated);
    setModalVisible(false);
    setSelectedComplaint(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        extraData={complaints} // ✅ triggers re-render
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.complaintItem}>
            <Text style={styles.title}>{item.category} Issue</Text>
            <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.viewBtn} onPress={() => viewComplaint(item)}>
                <Text style={styles.btnText}>View/Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteComplaint(item.id)}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Edit Complaint</Text>
            {selectedComplaint && (
              <>
                <TextInput
                  style={styles.input}
                  value={selectedComplaint.description}
                  onChangeText={text =>
                    setSelectedComplaint({ ...selectedComplaint, description: text })
                  }
                  multiline
                  placeholderTextColor="#78909C"
                />
                <View style={styles.categoryContainer}>
                  {categories.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryBtn,
                        selectedComplaint.category === cat && styles.selectedCategory,
                      ]}
                      onPress={() =>
                        setSelectedComplaint({ ...selectedComplaint, category: cat })
                      }
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
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedComplaint(null);
                  }}
                >
                  <Text style={[styles.btnText, { color: '#263238' }]}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F7FA', paddingHorizontal: 16, paddingTop: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: '#1976D2', fontWeight: 'bold', fontSize: 18 },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: '#0D47A1' },
  input: { borderWidth: 1, borderColor: '#B3E5FC', padding: 12, borderRadius: 12, backgroundColor: '#FFFFFF', marginBottom: 12, fontSize: 16, color: '#263238' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  categoryBtn: { backgroundColor: '#80DEEA', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, marginBottom: 8, minWidth: 80, alignItems: 'center' },
  selectedCategory: { backgroundColor: '#26A69A' },
  categoryText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  addBtn: { backgroundColor: '#26A69A', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  complaintItem: { backgroundColor: '#F0FCFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#B3E5FC' },
  title: { fontWeight: '700', fontSize: 17, color: '#0D47A1', marginBottom: 6 },
  description: { color: '#455A64', fontSize: 15, marginBottom: 6 },
  status: { color: '#78909C', fontSize: 14, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', marginTop: 8 },
  viewBtn: { flex: 1, marginRight: 8, backgroundColor: '#2196F3', padding: 10, borderRadius: 10, alignItems: 'center' },
  deleteBtn: { flex: 1, marginLeft: 8, backgroundColor: '#EF5350', padding: 10, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  emptyText: { color: '#78909C', fontSize: 16, textAlign: 'center', marginTop: 20 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { width: '88%', backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16 },
});
