import isNumber from 'lodash/isNumber';

export const GO_TO = '@react-story-rich.GO_TO';
export const REWIND_TO = '@react-story-rich.REWIND_TO';

class Route {
  constructor(from, to, type = GO_TO) {
    const [validFrom, validTo] = Route.isDestinationValid(from, to);
    this.from = validFrom;
    this.to = validTo;
    this.type = Route.isTypeValid(type);
  }

  static isDestinationValid = (from, to) => {
    if (!isNumber(from) || !isNumber(from)) {
      throw Error(`A route needs to between two location number. Got from: ${from} to: ${to}`);
    }

    if (from === to) {
      throw Error(`A route needs to have two different locations. Got from: ${from} to: ${to}`);
    }

    return [from, to];
  };

  static isTypeValid = (type) => {
    if (![GO_TO, REWIND_TO].includes(type)) {
      throw Error('type should be one of type GO_TO or REWIND_TO');
    }

    return type;
  };

  toPlainObject = () => ({
    from: this.from,
    to: this.to,
    type: this.type,
  })
}

export default Route;
