class Route {
  constructor(from, to) {
    if (from === to) {
      throw Error(`A route needs to have two different locations. Got from: ${from} to: ${to}`);
    }

    this.from = from;
    this.to = to;
  }

  toPlainObject = () => ({
    from: this.from,
    to: this.to,
  })
}

export default Route;
