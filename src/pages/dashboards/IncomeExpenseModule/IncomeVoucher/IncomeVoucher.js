import React, {useState, useEffect} from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Button,
} from '@mui/material';
import {Alert} from '@mui/material';
import axios from 'axios';
const moment = require('moment');

const IncomeVoucher = () => {
  const [rows, setRows] = useState([{number: 1, description: '', amount: ''}]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [voucherno, setVoucherno] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [name, setName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [date, setDate] = useState('');

  const calculateTotalAmount = () => {
    const sum = rows.reduce((total, row) => {
      return total + parseFloat(row.amount || 0);
    }, 0);
    setTotalAmount(sum);
  };
  const isLastRowDescriptionSelected = () => {
    const lastRowIndex = rows.length - 1;
    const lastRow = rows[lastRowIndex];
    return !!lastRow.description;
  };

  const handleAddRow = () => {
    if (!isLastRowDescriptionSelected()) {
      setSnackbarMessage('সর্বশেষ সারির জন্য একটি বিবরণ নির্বাচন করুন');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const nextNumber = rows.length + 1;
    setRows([...rows, {number: nextNumber, description: '', amount: ''}]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    calculateTotalAmount();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        date,
        name,
        memberId,
        currentAddress,
        myArrayField: rows.map((row) => ({
          number: row.number,
          description: row.description,
          amount: row.amount,
        })),
      };
      console.log(
        dataToSend,
        'jadnjadndjndjindjidnjidfnjisdnidjsfndifjndfijndfij',
      );

      // Send a POST request to your API endpoint using axios
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        dataToSend,
      );

      // Handle the response
      console.log('Response:', response.data);
      setSnackbarMessage('সফলভাবে তৈরী হয়েছে');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to submit');
      console.error('Error:', error.message);
      setSnackbarMessage('ব্যর্থ হয়েছে');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const generateNo = () => {
    const timestamp = moment().format('YYMMDDHHmmss');
    const voucherNumber = `R${timestamp}`;
    setVoucherno(voucherNumber);
  };

  useEffect(() => {
    generateNo();
  }, []);

  // Dropdown options for "বিবরণ"
  const descriptionOptions = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} sx={{p: 4}}>
          <Button
            variant='outlined'
            color='primary'
            // href={refUrl}
            target='_blank'
            sx={{margin: '10px'}}
          >
            নতুন বিবরণ যোগ করুন
          </Button>
          <hr />
          <Typography
            sx={{textAlign: 'center', margin: '10px'}}
            variant='h2'
            mb={4}
          >
            আনসারুল মুসলিমীন বহুমূখী সমবায় সমিতি লি: <br />
            ANSARUL MUSLIMIN BAHUMUKHI SAMABAY SAMITY LTD.
          </Typography>
          <Typography sx={{textAlign: 'center'}} mb={4}>
            ১-জি, ১/১, চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬ <br />
            গভ: রেজি: নং-১২৮/৯৮
            <br />
            ফোন-৮০২১৬৩৬
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '10px',
            }}
            mb={5}
          >
            টাকা গ্রহনের রসিদ
          </Typography>
          <Typography>রসিদ নং - {voucherno}</Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{margin: '10px'}}>
              <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{margin: '10px'}}
              />
              <TextField
                label='Member ID'
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                sx={{margin: '10px'}}
              />
            </div>
            <div style={{margin: '10px'}}>
              <TextField
                label='Address'
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                sx={{margin: '10px'}}
              />
              <TextField
                // label='Date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{margin: '10px'}}
              />
            </div>
          </div>
          <Grid container spacing={2} mb={4} mt={4} sx={{textAlign: 'center'}}>
            <Grid item xs={2}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                ক্র: নং:
              </Typography>
              {rows.map((row, index) => (
                <TextField key={index} value={row.number} disabled />
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                বিবরণ
              </Typography>
              {rows.map((row, index) => (
                <select
                  key={index}
                  value={row.description}
                  onChange={(e) =>
                    handleRowChange(index, 'description', e.target.value)
                  }
                  style={{width: '100%', height: '50px', marginBottom: '5px'}}
                >
                  <option value=''>বিবরণ নির্বাচন করুন</option>
                  {descriptionOptions.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ))}
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant='h3'
                component='h2'
                sx={{backgroundColor: 'black', color: 'white'}}
              >
                টাকার পরিমাণ
              </Typography>
              {rows.map((row, index) => (
                <TextField
                  key={index}
                  value={row.amount}
                  onChange={(e) =>
                    handleRowChange(index, 'amount', e.target.value)
                  }
                  type='number'
                  inputProps={{min: 0}}
                />
              ))}
            </Grid>
          </Grid>
          <div style={{textAlign: 'right', margin: '20px'}}>
            <Typography>মোট টাকার পরিমাণ: {totalAmount}</Typography>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button variant='outlined' onClick={handleAddRow}>
              সারি অ্যাড করুন
            </Button>
            <br />
            <Button
              variant='outlined'
              onClick={handleSubmit}
              sx={{marginTop: '20px'}}
            >
              সংরক্ষণ করুন
            </Button>
          </div>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{width: '100%'}}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default IncomeVoucher;
