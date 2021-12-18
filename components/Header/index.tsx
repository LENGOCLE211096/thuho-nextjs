// import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ForumIcon from '@material-ui/icons/Forum';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as React from 'react';

// import HeaderLink from './HeaderLink';
// import Banner from './banner.jpg';
// import messages from './messages';

const useStyles = makeStyles(() =>
	createStyles({
		icon: {
      marginRight: 5,
    },
	})
);

const Header = () => {
  const classes = useStyles();
  return (
    <Box 
    bgcolor="rgb(175 0 0 / 83%)"
    color="white"
    display="flex" 
    justifyContent="space-between"
    alignItems="center"
    height={40}
    paddingX={2}
    >
      <Box display="flex">
        <Box><KeyboardBackspaceIcon /></Box>
        <Box marginLeft={3}>
          <Typography>Thu hộ tập trung</Typography>
        </Box>
      </Box>
      <Box>
        <AppsIcon className={classes.icon} />
        <NotificationsIcon className={classes.icon} />
        <ChildCareIcon className={classes.icon} />
        <ForumIcon />
      </Box>     
    </Box>
  );
}

export default Header;
