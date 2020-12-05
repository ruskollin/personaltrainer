import React, { useState, useEffect, useRef} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import EditTraining from './EditTraining';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import moment from 'moment/moment';

const TrainingList = () =>  {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();
    
    useEffect(() => {
        getTrainings(); 
    }, [])

    const handleClose = () => {
        setOpen(false);
    } 

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {
            method: 'DELETE'
        })
        .then(_ => getTrainings())
        .then(_ => setMsg('Training was deleted successfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
        }   
    }

    const columns = [
    {headerName: 'date', field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
        return moment(data.value).format('DD.MM.YYYY HH:mm')
    }
    },
    {headerName: 'duration', field: 'duration', sortable: true, filter: true},
    {headerName: 'activity', field: 'activity', sortable: true, filter: true},
    {headerName: '', 
   field: 'id', width: 90,
   cellRendererFramework: params => <Button color="secondary" size="small" onClick={() =>deleteTraining(params)}>Delete</Button>
  }
]

const addTrainings = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/gettrainings', {
        method: 'POST',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(newTraining)
    })
        .then(_ => getTrainings())
        .then(_ => setMsg('Training added successfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
     }  

     const updateTraining = (link, training) => {
        fetch (link.data.id, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(_ => getTrainings())
        .then(_ => setMsg('Edit successful'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }     

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }


    return (
        <div class="page">
        <div className="ag-theme-material" style={{height: '600px', width: '100%', margin: 'auto'}}>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => {
                    gridRef.current = params.api
                    params.api.sizeColumnsToFit();
                }}
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={10}
            >

            </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                />
        </div>
    </div>
    );
}

export default TrainingList;