import React,{ useState } from 'react';
import './App.css';
import Funnel from './Funnel';
import { makeStyles, Theme } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Layout from './Layout/Layout';
import Calendar from './Calendar';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    scrollbarWidth: 'none',
  },   
  logo: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    outline: 'none',
  }
}))

function App() {
  const classes = useStyle();
  const [open, setOpen] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<number>(1);

  const handleClose = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <Drawer anchor="left" open={open} onClick={handleClose}>
        dad
        dsassad 
        dsffds
        fsdfsdfsdfsdfsd

      </Drawer>
      <Layout currentTab ={currentTab} setCurrentTab={setCurrentTab}>
        {currentTab === 1 ?  <Funnel /> : (currentTab === 5 ? <Calendar /> : null)}
      </Layout>
     </div>
  );
}

export default App;
