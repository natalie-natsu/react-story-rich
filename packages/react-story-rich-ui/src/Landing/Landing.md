```jsx harmony
import React, { useMemo } from 'react';

import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import HistoryIcon from '@material-ui/icons/History';
// import SettingsIcon from '@material-ui/icons/Settings';
// import StarIcon from '@material-ui/icons/Star';
// import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import Layout from '@react-story-rich/ui/Layout';
import Landing from '@react-story-rich/ui/Landing';

import banner from './static/banner.png';

const storyLocation = 0; // Get location from the store

const texts = {
  credits: 'See credits',
  keepPlaying: 'Continue',
  quit: 'Quit',
  settings: 'Update settings',
  start: 'Start a new game',
};

const newGame = useMemo(() => storyLocation === 0, [storyLocation]);
// const playIcon = useMemo(() => (newGame ? <PlayArrowIcon /> : <HistoryIcon />), [newGame]);

const play = useMemo(
  () => (newGame ? texts.start : texts.keepPlaying),
  [newGame, texts.start, texts.keepPlaying],
);

  <Layout>
    <Landing banner={banner} name="@react-story-rich">
      <Card>
        <List component="nav">
          <ListItem button >
            <ListItemAvatar>
              <Avatar>
                playIcon
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={play} />
          </ListItem >
          <ListItem button to="/settings">
            <ListItemAvatar>
              <Avatar>
                SettingsIcon
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={texts.settings} />
          </ListItem >
          <ListItem button to="/credits">
            <ListItemAvatar>
              <Avatar>
                StarIcon
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={texts.credits} />
          </ListItem >
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                PowerSettingsNewIcon
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={texts.quit} />
          </ListItem>
        </List>
      </Card>
    </Landing>
  </Layout>
```
