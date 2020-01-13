class Route {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  toObject = () => ({
    from: this.from,
    to: this.to,
  })
}

export default Route;
