import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { ComplaintContext } from '../App';

export default function WardenDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [staffName, setStaffName] = useState('');

  const openAssignModal = (id) => {
    setSelectedComplaintId(id);
    setStaffName(''); // reset input
    setModalVisible(true);
  };

  const handleAssign = () => {
    if (!staffName.trim()) {
      Alert.alert('Error', 'Please enter a staff name');
      return;
    }

    const updated = complaints.map((c) =>
      c.id === selectedComplaintId
        ? { ...c, assignedTo: staffName.trim(), status: 'Assigned' }
        : c
    );

    setComplaints(updated);
    setModalVisible(false);
    setSelectedComplaintId(null);
    setStaffName('');

    Alert.alert('Success', `Assigned to ${staffName.trim()}`, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('Staff');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Warden Dashboard</Text>

      {complaints.length === 0 && (
        <Text style={styles.emptyText}>No complaints received yet.</Text>
      )}

      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.category} Issue</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            {item.assignedTo && (
              <Text style={styles.assigned}>Assigned To: {item.assignedTo}</Text>
            )}

            {item.status === 'Pending' && (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => openAssignModal(item.id)}
              >
                <Text style={styles.btnText}>Assign to Staff</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Assign Staff Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign to Staff</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter staff name"
              value={staffName}
              onChangeText={setStaffName}
              placeholderTextColor="#78909C"
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setModalVisible(false);
                  setStaffName('');
                }}
              >
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.assignBtn]}
                onPress={handleAssign}
              >
                <Text style={styles.modalBtnText}>Assign</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#E0F7FA', // Light cyan background
  },
  backBtn: {
    marginBottom: 12,
  },
  backText: {
    color: '#1976D2', // Deep blue
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0D47A1', // Deep navy
  },
  emptyText: {
    color: '#78909C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  item: {
    backgroundColor: '#F0FCFF', // Very light cyan-white card
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#B3E5FC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    color: '#0D47A1',
    marginBottom: 6,
  },
  description: {
    color: '#455A64',
    fontSize: 15,
    marginBottom: 8,
  },
  status: {
    color: '#78909C',
    fontSize: 14,
    marginBottom: 6,
  },
  assigned: {
    color: '#546E7A',
    fontSize: 14,
    marginBottom: 12,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#26A69A', // Mint teal primary action
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },

  // ── Modal Styles ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D47A1',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#B3E5FC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FAFEFF',
    color: '#263238',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelBtn: {
    backgroundColor: '#B0BEC5', // Soft gray
  },
  assignBtn: {
    backgroundColor: '#26A69A', // Teal
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  modalBtnTextCancel: {
    color: '#263238',
    fontWeight: '600',
    fontSize: 15,
  },
});