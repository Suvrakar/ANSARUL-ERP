import AppCard from '@crema/core/AppCard';
import {Typography, Skeleton} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ActiveStatus from '@crema/common/ActiveStatus';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import OrderList from '../RentalList';

export default function RentalDetails() {
  const {id} = useParams();
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState([]);

  const getMember = async () => {
    let rentalid = id;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rental/${rentalid}`,
      );
      setMember(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getRoshidStatus = async (voterId) => {
    try {
      const query = voterId;
      {
        console.log(query, 'dklmdfklmdfklmsdfkldfsmplsdfmpdfsmfsdp');
      }
      const page = 1;
      const perPage = 10;

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income-expense`,
        {
          params: {
            query,
            page,
            perPage,
          },
        },
      );

      const {allIncomeExpense} = response.data;
      setRentals(allIncomeExpense);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  useEffect(() => {
    if (member?.voterId) {
      getRoshidStatus(member.voterId);
    }
  }, [member]);

  return (
    <div>
      <AppCard>
        <Typography variant='h3' mb={3}>
          Rental Information
        </Typography>
        <hr />
        {loading ? (
          <Skeleton variant='rectangular' width={200} height={30} />
        ) : (
          <>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                আবেদনকারীর নাম: {member?.name}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                আবেদনের তারিখ :
                {moment(member?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্টেটাস :{' '}
                <ActiveStatus
                  status={member?.activeStatus === true ? 'active' : 'inactive'}
                />
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                ভাড়ার ধরণ :{' '}
                <span style={{textWeight: '600px'}}>{member?.rentaltype}</span>
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                অ্যাডভান্স পে: {member?.advancepay}
              </Typography>
            </div>

            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                স্থায়ী ঠিকানা: {member?.permanentAddress}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                বর্তমান ঠিকানা: {} {member?.currentAddress}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                ভোটার নাম্বার: {member?.voterId}
              </Typography>
            </div>
            <div style={{marginTop: '10px'}}>
              <Typography variant='h4'>
                মোবাইল নাম্বার: {member?.phone}
              </Typography>
            </div>
          </>
        )}
      </AppCard>

      <div style={{marginTop:'15px'}}>
        <OrderList customerDetails={rentals} />
      </div>

      <AppCard sx={{mt: 4}}>
        <div style={{marginTop: '10px'}}>
          <Typography variant='h4'>
            Last Payment: {rentals[0]?.myArrayField?.map((x) => x.description)}
          </Typography>
        </div>
        <div style={{marginTop: '10px'}}>
          <Typography variant='h4'>
            Last Payment:{' '}
            {moment(rentals[0]?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
          </Typography>
        </div>
      </AppCard>
    </div>
  );
}
