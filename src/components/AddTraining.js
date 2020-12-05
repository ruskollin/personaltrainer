import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import DateFnsUtils from '@date-io/date-fns'; 
import { DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

function AddTraining(props){
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: props.params.value,
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const handleSave = () => {
        props.addTrainings(training);
        handleClose();
    };

    const modifyDate = (date) => {
      setDate(date);
      setTraining({...training, date: date.toISOString()});
  }

    return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Customer Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a new training!
          </DialogContentText>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker style={{margin: 5}} label="Date" format="dd.MM.yyyy HH:mm" onChange={date => modifyDate(date)} value={date} id="date" name="date" />
          </MuiPickersUtilsProvider> 
          <TextField
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            fullWidth
          />
          <TextField
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default AddTraining;