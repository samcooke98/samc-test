export class Resource<T> {
  // Implementation is crappy \ thrown together.
  private state: undefined | Promise<unknown> | "loaded";
  private resource: T | undefined;
  private error: Error | undefined;

  /**
   * Suspends if the resource is not yet available.
   * If the resource hasn't been fetched, fetches it.
   * If the resource has errored when laoding, throws the error
   * Returns the resource once avilable
   */
  read() {
    if (this.state == null) {
      this.preload();
    }

    if (this.state == "loaded") {
      return this.resource;
    }
    if (this.error) {
      throw this.error;
    }
    throw this.state;
  }

  preload() {
    if (this.state != undefined) {
      return;
    }
    this.state = this.exec()
      .then((res) => {
        this.resource = res;
        this.state = "loaded";
      })
      .catch((err) => {
        this.error = err;
        this.state = "loaded";
      });
  }

  load(): Promise<T> {
    this.preload();
    // Preconditions..
    if(this.state == null) {
      throw new Error('invariant failure');
    }
    if(this.state === 'loaded') {
      // NB: This is crappy, and wrong..
      if(this.resource == null) {
        throw new Error('invariant failure');
      }
      return Promise.resolve(this.resource);
    }

    return this.state?.then(() => {
      return this.resource!;
    });
  }

  constructor(private readonly exec: () => Promise<T>) {}
}
