import Route from '../Route';

export const GO_TO = '@react-story-rich.GO_TO';
export const REWIND_TO = '@react-story-rich.REWIND_TO';

class Navigation {
  constructor(type, route, dataContext) {
    if (![GO_TO, REWIND_TO].includes(type)) {
      throw Error('type should be one of type GO_TO or REWIND_TO');
    }

    if (!(route instanceof Route)) {
      throw Error('route should be an instance of Route');
    }

    if (typeof dataContext !== 'object') {
      throw Error('dataContext should be of type object');
    }

    this.type = type;
    this.route = route;
    this.dataContext = dataContext;
  }

  toPlainObject = () => ({
    dataContext: this.dataContext,
    route: this.route.toPlainObject(),
    type: this.type,
  })
}

export default Navigation;
