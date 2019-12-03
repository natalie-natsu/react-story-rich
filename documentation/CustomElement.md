````jsx harmony
import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Element from '@react-story-rich/core/components/Element';

import image from './static/contemplative-reptile.jpg';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

// forwardRef is important otherwise component will not be auto focused (+ throwing a warning)
const MediaCard = forwardRef(({ readOnly }, ref) => {
  const classes = useStyles();

  return (
    <Card ref={ref} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            A lizard is on your way !
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            You are frozen by fear a short moment before deciding what to do.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" disabled={readOnly}>
          Leave it
        </Button>
        <Button size="small" color="primary" disabled={readOnly}>
          Attack it
        </Button>
      </CardActions>
    </Card>
  );
});

MediaCard.propTypes = {
  readOnly: PropTypes.bool.isRequired,
};

function CustomElement() {
  const [readOnly, setReadOnly] = useState(true);
  const onTimeout = () => { setReadOnly(false); };

  return (
    <Element
      component={MediaCard}
      onTimeout={onTimeout}
      readOnly={readOnly}
      timeout={5000}
    />
  );
}

  <CustomElement />;
````
