
myDelay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

await this.myDelay(10);