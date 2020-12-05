import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditTraining(props){
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer:'',
    })

    const handleClickOpen = () => {
      setTraining ({
          date: props.params.data.date,
          duration: props.params.data.duration,
          activity: props.params.data.activity,
          customer: props.params.data.customer
      })
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
        props.updateTraining(props.params, training);
        console.log(props.params, training);
        handleClose();
    }

    return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update training details!
          </DialogContentText>
          <TextField
           autofocus
            name="date"
            value={training.date}
            onChange={inputChanged}
            margin="dense"
            label="Date"
            fullWidth
          />
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
         <TextField
            name="firstname"
            value={training.customer.firstname}
            onChange={inputChanged}
            margin="dense"
            label="FirstName"
            fullWidth
          />
         <TextField
            name="lastname"
            value={training.customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Last Name"
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
};
