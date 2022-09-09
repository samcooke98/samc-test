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

  constructor(private readonly exec: () => Promise<T>) {}
}
