import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileManagementDashboard = () => {
  const { isAuth, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "medication", "appointment"
  const [formValues, setFormValues] = useState({
    medicationName: "",
    dosage: "",
    appointmentDate: "",
    appointmentTime: "",
    settingOption: ""
  });
  const [medications, setMedications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [settings, setSettings] = useState({});
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    if (!userId) {
      const newUserId = Math.random().toString(36).substr(2, 9); // Generate random ID
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, [userId]);



  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const savedMedications = JSON.parse(localStorage.getItem(`medications_${userId}`)) || [];
      const savedAppointments = JSON.parse(localStorage.getItem(`appointments_${userId}`)) || [];
      const savedSettings = JSON.parse(localStorage.getItem(`settings_${userId}`)) || {};

      setMedications(savedMedications);
      setAppointments(savedAppointments);
      setSettings(savedSettings);
    }
  }, [isAuth, navigate, userId]);

  const handleOpenDialog = (type, index = null) => {
    setDialogType(type);
    if (type === "medication" && index !== null) {
      const medication = medications[index];
      setFormValues({
        medicationName: medication.name,
        dosage: medication.dosage,
      });
      setEditIndex(index);
    } else if (type === "appointment" && index !== null) {
      const appointment = appointments[index];
      setFormValues({
        appointmentDate: appointment.date,
        appointmentTime: appointment.time,
      });
      setEditIndex(index);
    } else {
      setFormValues({
        medicationName: "",
        dosage: "",
        appointmentDate: "",
        appointmentTime: "",
      });
      setEditIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormValues({
      medicationName: "",
      dosage: "",
      appointmentDate: "",
      appointmentTime: "",
      settingOption: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddItem = () => {
    if (dialogType === "medication") {
      let updatedMedications;
      if (editIndex !== null) {
        updatedMedications = medications.map((med, index) =>
          index === editIndex ? { name: formValues.medicationName, dosage: formValues.dosage } : med
        );
      } else {
        updatedMedications = [
          ...medications,
          {
            name: formValues.medicationName,
            dosage: formValues.dosage,
          },
        ];
      }
      setMedications(updatedMedications);
      localStorage.setItem(`medications_${userId}`, JSON.stringify(updatedMedications));
    } else if (dialogType === "appointment") {
      let updatedAppointments;
      if (editIndex !== null) {
        updatedAppointments = appointments.map((appt, index) =>
          index === editIndex
            ? { date: formValues.appointmentDate, time: formValues.appointmentTime }
            : appt
        );
      } else {
        updatedAppointments = [
          ...appointments,
          {
            date: formValues.appointmentDate,
            time: formValues.appointmentTime,
          },
        ];
      }
      setAppointments(updatedAppointments);
      localStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
    }

    handleCloseDialog();
  };

  const handleDeleteItem = (type, index) => {
    if (type === "medication") {
      const updatedMedications = medications.filter((_, i) => i !== index);
      setMedications(updatedMedications);
      localStorage.setItem(`medications_${userId}`, JSON.stringify(updatedMedications));
    } else if (type === "appointment") {
      const updatedAppointments = appointments.filter((_, i) => i !== index);
      setAppointments(updatedAppointments);
      localStorage.setItem(`appointments_${userId}`, JSON.stringify(updatedAppointments));
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom style={{ color: 'white' }}>
        Profile Management Dashboard
      </Typography>
      {user?.email && (
        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
          Logged in as: {user.email}
        </Typography>
      )}


      <Grid container spacing={3}>
        {/* Medications Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5">Medications</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog("medication")}
              className="mb-2"
            >
              Add Medication
            </Button>
            <List>
              {medications.map((med, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${med.name} - ${med.dosage}`} />
                  <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog("medication", index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem("medication", index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Appointments Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5">Appointments</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog("appointment")}
              className="mb-2"
            >
              Add Appointment
            </Button>
            <List>
              {appointments.map((appt, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${appt.date} at ${appt.time}`} />
                  <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog("appointment", index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem("appointment", index)}>
                    <DeleteIcon />
                  </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <br></br>

        {/* Personalized Recommendations */}
        {/* Personalized Recommendations */}
        <Grid item xs={12}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5">Personalized Recommendations</Typography>
            <Typography variant="body1">
              Based on your profile, we recommend the following guided meditation and
              relaxation techniques:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>For Anxiety:</strong>
                  Engage in deep breathing exercises, try mindfulness meditation, and consider journaling to help manage overwhelming feelings.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>For Depression:</strong>
                  Make time for physical activity, connect with loved ones, and consider Cognitive Behavioral Therapy (CBT) techniques to challenge negative thoughts.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>For Stress Management:</strong>
                  Practice progressive muscle relaxation, focus on time management, and ensure you get adequate rest and sleep.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>For Insomnia:</strong>
                  Create a consistent sleep routine, avoid screens before bedtime, and practice relaxation exercises such as guided imagery or listening to calming sounds.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>For Relationship Issues:</strong>
                  Communicate openly with loved ones, consider therapy or counseling, and practice empathy and listening to build stronger connections.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom>
                  <strong>For Self-Esteem Issues:</strong>
                  Focus on self-compassion, avoid self-criticism, and engage in activities that boost your sense of accomplishment and self-worth.
                </Typography>
              </li>
            </ul>
            <Typography variant="body2" color="textSecondary">
              Remember to seek professional help if you are facing serious mental health concerns. These suggestions are not a substitute for therapy.
            </Typography>
          </Paper>
        </Grid>

      </Grid>

      {/* Dialogs for adding/updating items */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editIndex !== null ? `Edit ${dialogType}` : `Add ${dialogType}`}</DialogTitle>
        <DialogContent>
          {dialogType === "medication" && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="medicationName"
                label="Medication Name"
                fullWidth
                value={formValues.medicationName}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="dosage"
                label="Dosage"
                fullWidth
                value={formValues.dosage}
                onChange={handleInputChange}
              />
            </>
          )}
          {dialogType === "appointment" && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="appointmentDate"
                label="Appointment Date"
                type="date"
                fullWidth
                value={formValues.appointmentDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                name="appointmentTime"
                label="Appointment Time"
                type="time"
                fullWidth
                value={formValues.appointmentTime}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddItem} color="primary">
            {editIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileManagementDashboard;
