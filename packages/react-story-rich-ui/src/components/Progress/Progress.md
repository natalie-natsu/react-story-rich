````jsx harmony
import React, { useState } from 'react';
import Navigation from '@react-story-rich/core/classes/Navigation';
import useTimeout from '@react-story-rich/core/hooks/useTimeout';
import useProgress from '@react-story-rich/ui/hooks/useProgress';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const [enabled, setEnabled] = useState(false);

const onTimeout = () => alert(`It's too late ! The dragon has defeated you.`);
const timeout = 3000;
const injected = { enabled, nav: new Navigation(1) };

const [hasProgress, ProgressExample] = useProgress(onTimeout, timeout, injected, enabled);
useTimeout(onTimeout, timeout, injected);

<>
  <FormControlLabel
    label="start the countdown"
    control={<Switch checked={enabled} onChange={() => setEnabled(!enabled)} />}
  />
  {hasProgress && ProgressExample}
</>
````
