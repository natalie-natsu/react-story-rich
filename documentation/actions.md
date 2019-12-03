Here a list of all action acting on **data, history or location** reducers.

### setData<small>(data)</small>
### updateData<small>(data)</small>
|Param|Type|Required|Example|
|-------|--------|--------|--------------|
|**data**|object|required|`{ environment: { light: 'off' } }`|

### setLocation<small>(location)</small>
|Param|Type|Required|Example|
|-------|--------|--------|--------------|
|**location**|number|required|`6`|

### setHistory<small>(history)</small>
|Param|Type|Required|Example|
|-------|--------|--------|--------------|
|**history**|array|required|`[{ from: 0, to: 1, data: {} }]`|

### resetStory<small>()</small>
Reset all root reducer and delete storage if any
(work great with redux-persist);

### goTo<small>(from, to, data)</small>
|Param|Type|Required|Example|
|-------|--------|--------|--------------|
|**from**|number|required|`0`|
|**to**|number|required|`1`|
|**data**|object||`{}`|

Go from current element (from)
to a specific story element number (to)
and save current data.

### goBackwardTo<small>(to, historyIndex, data)</small>
|Param|Type|Required|Example|
|-------|--------|--------|--------------|
|**to**|number|required|`4`|
|**historyIndex**|number|required|`1`|
|**data**|object||`{}`|

Go backward to a story element in the history (to)
or a specific history index (historyIndex)
and reload data.

### goForward<small>(skip, data)</small>
### goBackward<small>(skip, data)</small>
|Param|Type|Required|Example|
|-------|--------|--------|--------------|
|**skip**|number|required|`0`|
|**data**|object||`{}`|

Go forward/backward in story elements order and skip certain elements.
Also save current data in history state.
