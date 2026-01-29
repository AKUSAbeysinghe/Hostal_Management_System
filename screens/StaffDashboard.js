import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ComplaintContext } from '../App';

export default function StaffDashboard({ navigation }) {
  const { complaints, setComplaints } = useContext(ComplaintContext);

  // Filter only assigned tasks (assuming assignedTo is set somewhere)
  const assignedTasks = complaints.filter((c) => c.assignedTo);

  const markCompleted = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: 'Completed' } : c
    );
    setComplaints(updated);
    Alert.alert('Success', 'Task marked as completed!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Staff Dashboard</Text>

      {assignedTasks.length === 0 && (
        <Text style={styles.emptyText}>No tasks assigned yet.</Text>
      )}

      <FlatList
        data={assignedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.category} Issue</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text style={styles.assigned}>Assigned To: {item.assignedTo}</Text>

            {item.status !== 'Completed' && (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => markCompleted(item.id)}
              >
                <Text style={styles.btnText}>Mark as Completed</Text>
              </TouchableOpacity>
            )}

            {item.status === 'Completed' && (
              <Text style={styles.completedText}>✓ Task Completed</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#E0F7FA'    // Light cyan / pale turquoise (same as student dashboard)
  },
  backBtn: { 
    marginBottom: 12 
  },
  backText: { 
    color: '#1976D2',           // Deep blue (consistent with student screen)
    fontWeight: 'bold', 
    fontSize: 18 
  },
  header: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 16, 
    color: '#0D47A1'            // Deep navy blue for headers
  },
  emptyText: { 
    color: '#78909C', 
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 24 
  },
  item: { 
    backgroundColor: '#F0FCFF',   // Very light cyan-white card
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#B3E5FC',       // Soft cyan border
    // subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { 
    fontWeight: '700', 
    fontSize: 17, 
    color: '#0D47A1',           // Deep blue
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
    marginBottom: 6 
  },
  assigned: { 
    color: '#546E7A', 
    fontSize: 14, 
    marginBottom: 12 
  },
  btn: { 
    marginTop: 8, 
    backgroundColor: '#26A69A',   // Mint teal primary action color
    padding: 12, 
    borderRadius: 10, 
    alignItems: 'center',
    // Optional depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: { 
    color: '#FFFFFF', 
    fontWeight: '600', 
    fontSize: 15 
  },
  completedText: { 
    marginTop: 12, 
    color: '#26A69A',           // Teal success color
    fontWeight: 'bold', 
    fontSize: 15, 
    textAlign: 'center' 
  },
});