import React from 'react';
import Popover from '@material-ui/core/Popover';
import FilterListIcon from '@material-ui/icons/FilterList';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Button, Typography, Box, SvgIcon } from '@material-ui/core';
import AppSelect from '../Components/Select';

const FunnelHeader: React.FC = () => {
    return <PopupState variant="popover" popupId="demo-popup-popover" >
    {(popupState) => (
      <div>
        <Button 
            variant="outlined" 
            size="small" 
            color="primary" 
            {...bindTrigger(popupState)}
            startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box p={2}>
            <AppSelect>
                
            </AppSelect>
          </Box>
        </Popover>
      </div>
    )}
  </PopupState>
}

export default FunnelHeader;
