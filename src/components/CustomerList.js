import React, { useState, useEffect, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const CustomerList= () =>  {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();
    
    useEffect(() => {
        getCustomers(); 
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
        fetch(link.data.links[0].href, {
            method: 'DELETE'
        })
        .then(_ => getCustomers())
        .then(_ => setMsg('Customer was deleted successfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
        }   
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
            .then(_ => getCustomers())
            .then(_ => setMsg('Customer added successfully'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
         }   

    const updateCustomer = (link, customer) => {
        fetch (link.data.links[0].href, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => setMsg('Edit successful'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }     

    const addTrainings = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(_ => getCustomers())
            .then(_ => setMsg('New Training Added'))
            .then(_ => setOpen(true))
            .catch(err => console.log(err))
    }

    const columns = [
    {headerName: 'First Name', field: 'firstname', width: 140, sortable: true, filter: true},
    {headerName: 'Last Name', field: 'lastname', width: 130, sortable: true, filter: true},
    {headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true},
    {headerName: 'Postcode', field: 'postcode', width: 130, sortable: true, filter: true},
    {headerName: 'City', field: 'city', width: 130, sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', width: 130, sortable: true, filter: true},
    {headerName: '',
     width: 100,
     field: 'links.0.href',
     cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params}/>
    },
    {headerName: '', 
     field: 'links.0.href', 
     width: 100,
     cellRendererFramework: params => <Button color="secondary" size="small" onClick={() =>deleteCustomer(params)}>Delete</Button>
    },
    {headerName: '',
    width:190,
    field: 'links.0.href',
    cellRendererFramework: params => <AddTraining addTrainings={addTrainings} params={params}/>
   }
]

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }


    return (
        <div class="page">
        <div class="addC">
        <AddCustomer addCustomer={addCustomer}/>
        </div>
        <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
            <AgGridReact
                ref={gridRef}
                onGridReady={ params => {
                    gridRef.current = params.api
                    params.api.sizeColumnsToFit();
                    
                }}
                columnDefs={columns}
                rowData={customers}
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

export default CustomerList;
