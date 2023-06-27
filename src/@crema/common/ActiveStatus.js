import React from 'react';
import PropTypes from 'prop-types';
import CustomChip from './CustomChipMUI';

const ActiveStatus = ({status}) => {
  if (status === 'pending') {
    return <CustomChip label={status} type={'warning'} />;
  }

  if (status === 'inactive') {
    return <CustomChip label={status} type={'error'} />;
  }

  if (status === 'active') {
    return <CustomChip label={status} type={'success'} />;
  }

  return <CustomChip label={status} />;
};

export default ActiveStatus;

ActiveStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
