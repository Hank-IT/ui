/**
 * Wrapper to mark an array as property aware.
 * When a form field is defined as an instance of PropertyAwareArray,
 * the BaseForm will transform each element into reactive properties with
 * computed getters/setters, error/suggestion tracking, and dirty flags.
 */
export class PropertyAwareArray<T> extends Array<T> {
  public constructor(items: T[]) {
    super(...items);
  }

  public get items(): T[] {
    return this;
  }

  public set items(newItems: T[]) {
    this.splice(0, this.length, ...newItems);
  }
}