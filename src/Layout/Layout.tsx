import React, { useState } from 'react';
import logo from '../honey.png';
import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core';
import { StoryTabs, StoryTab, TabPanel } from '../Components/Tabs';


const useStyle = makeStyles((theme: Theme) => ({
    container:{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f1f6fb',
    },
    root: {
      overflow: 'hidden',
      padding: theme.spacing(1.5, 2, 0, 2),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: `1px solid #cdcdcd`,
      justifyContent: 'space-between',
    },   
    logo: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      border: '0 !important',
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      
    }
  }))

type OwnProps = {
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactElement | null;
}

const Layout: React.FC<OwnProps> = ({
  currentTab,
  setCurrentTab,
  children,
}) => {
    const classes = useStyle();

    return <div className={classes.container}>
       <div className={classes.root}>
           <div className={classes.title}>
                <img src={logo} alt="App logo" className={classes.logo} />
                <div>
                    <Typography variant="subtitle1" color="textPrimary"><b>Customer Stories</b></Typography>
                    <AppTabs tab={currentTab} setTab={setCurrentTab} />
                </div>
           </div>
           <Avatar src="https://images.pexels.com/photos/2100035/pexels-photo-2100035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" sizes="27" />
       </div>
        <TabPanel index={currentTab} value={currentTab}>
          {children}
        </TabPanel>
        
    </div>
}

export default Layout;


type AppTabsProps = {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;  
}

const tabStyle = makeStyles((theme: Theme) => ({
  root: {
    marginTop: -theme.spacing(2),
  }
}))

const AppTabs: React.FC<AppTabsProps> = ({tab, setTab}) => {
  const [tabs, setTabs] = useState([
    {
      position: 0,
      title: 'List',
    },
    {
      position: 1,
      title: 'Board',
    },
    {
      position: 2,
      title: 'Timeline',
    },
    {
      position: 3,
      title: 'Progress',
    },
    {
      position: 4,
      title: 'Team',
    },
    {
      position: 5,
      title: 'Calendar',
    },
    {
      position: 6,
      title: 'More',
    }
  ]);
  
  const classes = tabStyle();
  
    return <div className={classes.root}>
      <div>
      <StoryTabs
            indicatorColor="primary"
            textColor="primary"
            value={tab}
            aria-label="User-management-tabs"
            onChange={(_e, v) => setTab(v)}
          >
            {tabs.map((tab) => (
              <StoryTab label={tab.title} disableRipple key={tab.position} />
            ))}
          </StoryTabs>
        </div>
    </div>
}