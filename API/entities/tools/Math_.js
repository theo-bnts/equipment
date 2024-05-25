class Math_ {
  static round(number, decimals) {
    const factor = 10 ** decimals;
    return Math.round((number + Number.EPSILON) * factor) / factor;
  }
}

export default Math_;
