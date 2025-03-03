export interface PersistedForm<FormBody> {
  state: FormBody;
  original: FormBody;
  dirty: Record<keyof FormBody, boolean>;
}