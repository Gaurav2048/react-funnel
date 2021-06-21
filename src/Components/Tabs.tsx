import React from 'react';
import {
  withStyles,
  Box,
  Tab,
  Tabs,
  createStyles,
  Theme,
} from '@material-ui/core';

export const StoryTabs = withStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    minHeight: 40,
    height: 40,
    paddingBottom: 0,
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
}))(Tabs);

export const StoryTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      height: 30,
      minWidth: 'fit-content',
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: 12,
      marginRight: 24 ,
      padding: 0,
    },
    selected: {},
  }),
)(Tab);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`storypanel-${index}`}
      aria-labelledby={`story-tab-${index}`}
      {...{ flexGrow: 1, height: '100%', overflow: 'hidden' }}
      {...other}
    >
      {value === index ? children : null}
    </Box>
  );
};