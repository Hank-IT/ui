/**
 * Wrapper to mark an array as property aware.
 * When a form field is defined as an instance of PropertyAwareArray,
 * the BaseForm will transform each element into reactive properties with
 * computed getters/setters, error/suggestion tracking, and dirty flags.
 */
export class PropertyAwareArray<T = any> {
  constructor(public items: T[]) {
  }
}