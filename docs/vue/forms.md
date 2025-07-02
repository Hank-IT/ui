# BaseForm Documentation

## Overview

`BaseForm` is a powerful and flexible TypeScript class for handling form state, validation, and submission in Vue
applications. It provides a comprehensive solution for managing form data with features like:

- Type-safe form state management
- Dirty state tracking for individual fields
- Error handling and field validation
- Form persistence between page reloads
- Support for complex nested objects and arrays
- Automatic transformation of form values to API payloads

## Key Features

### 1. Type-Safe Form Management

The `BaseForm` is a generic class that takes two type parameters:

- `RequestBody`: The shape of the data that will be sent to the server
- `FormBody`: The shape of the form's internal state, which can differ from the request payload

````typescript
class MyForm extends BaseForm<MyRequestPayload, MyFormState> {
    // ...
}
````

### 2. Form State Persistence

Forms can automatically save their state to browser storage (session, local, etc.), allowing users to navigate away and
return without losing their input.

````typescript
protected override
getPersistenceDriver()
:
PersistenceDriver
{
    return new SessionStorageDriver() // Or LocalStorageDriver, etc.
}
````

### 3. Transformations and Getters

Transform form values before they are sent to the server using getter methods:

````typescript
protected
getStartedAt()
:
string
{
    return DateTime.fromFormat(`${this.state.start_date} ${this.state.start_time}`, 'dd.MM.yyyy HH:mm').toISO()
}
````

### 4. Error Handling and Validation

Map server-side validation errors to specific form fields, with support for nested fields:

````typescript
protected override
errorMap: {
    [serverKey
:
    string
]:
    string | string[]
}
= {
    started_at: ['start_date', 'start_time'],
    ended_at: ['end_date', 'end_time']
}
````

### 5. Array Management

Special support for arrays with the class, enabling reactive updates to array items: `PropertyAwareArray`

````typescript
public
addPosition()
:
void {
    this.addToArrayProperty('positions', {
        index: this.properties.positions.length + 1,
        gross_amount: null,
        vat_rate: VatRateEnum.VAT_RATE_19,
        booking_account_category_id: null
    })
}
````

## Core Concepts

### State and Dirty Tracking

`BaseForm` tracks the original state and current state of each form field, automatically computing "dirty" status for
fields that have been changed.

````typescript
// Check if any field in the form has been modified
form.isDirty()
````

### The Properties Object

The `properties` getter provides access to each form field with its model, errors, and dirty status:

````html

<template>
    <input v-model="form.properties.email.model" />
    <div v-if="form.properties.email.dirty">This field has been changed</div>
    <div v-if="form.properties.email.errors.length">{{ form.properties.email.errors[0] }}</div>
</template>
````

### Form Submission

Build a payload for API submission with:

````typescript
const payload = form.buildPayload()
````

## How to Use

### 1. Create a Form Class

````typescript
import { BaseForm, type PersistenceDriver, SessionStorageDriver } from '@hank-it/ui/vue/forms'

interface MyFormState {
    name: string
    email: string
}

interface MyRequestPayload {
    name: string
    email: string
    timestamp: string // Added field not in the form
}

class MyForm extends BaseForm<MyRequestPayload, MyFormState> {
    // Fields to add to the final payload that aren't in the form state
    protected override append: string[] = ['timestamp']

    // Fields to exclude from the final payload
    protected override ignore: string[] = []

    // Map server error keys to form field names
    protected override errorMap: { [serverKey: string]: string | string[] } = {}

    public constructor() {
        super({
          name: '',
          email: ''
        }, { persist: true, persistSuffix: 'optional-suffix' })
    }

    // Use session storage for persistence
    protected override getPersistenceDriver(): PersistenceDriver {
        return new SessionStorageDriver()
    }

    // Generate a timestamp for the request
    protected getTimestamp(): string {
        return new Date().toISOString()
    }
}
````

### 2. Use in Components

````vue
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Name</label>
      <input v-model="form.properties.name.model.value" />
      <div v-if="form.properties.name.errors.length" class="error">
        {{ form.properties.name.errors[0] }}
      </div>
    </div>
    
    <div>
      <label>Email</label>
      <input v-model="form.properties.email.model.value" />
      <div v-if="form.properties.email.errors.length" class="error">
        {{ form.properties.email.errors[0] }}
      </div>
    </div>
    
    <button type="submit" :disabled="!form.isDirty()">Submit</button>
    <button type="button" @click="form.reset()">Reset</button>
  </form>
</template>

<script setup>
import { MyForm } from './MyForm'

const form = new MyForm({
  name: '',
  email: ''
})

async function submitForm() {
  try {
    const payload = form.buildPayload()
    await api.submitForm(payload)
    // Success handling
  } catch (error) {
    if (error.response?.data?.errors) {
      form.fillErrors(error.response.data.errors)
    }
  }
}
</script>
````

## Working with Arrays
The `PropertyAwareArray` class enables special handling for array items. Each value of objects in the PropertyAwareArray will receive a v-model, errors, etc.:

````typescript
import { BaseForm, PropertyAwareArray } from '@hank-it/ui/vue/forms'

export interface FormWithPositions {
  // ...other fields
  positions: PositionItem[]
}

export class MyComplexForm extends BaseForm<RequestType, FormWithPositions> {
  constructor() {
    super({
      // ...other defaults
      positions: new PropertyAwareArray([
        { id: 1, value: '' }
      ])
    })
  }
  
  // Add a new position to the array
  public addPosition(): void {
    this.addToArrayProperty('positions', {
      id: this.properties.positions.length + 1,
      value: ''
    })
  }
  
  // Remove a position by id
  public removePosition(id: number): void {
    this.state.positions = new PropertyAwareArray(
      this.state.positions.filter(position => position.id !== id)
    )
    this.resetPositionIds()
  }
  
  // Reset the sequential IDs after removing items
  protected resetPositionIds(): void {
    let count = 1
    this.state.positions.forEach(position => {
      position.id = count
      count++
    })
  }
}

const form = new MyComplexForm()
const id = form.properties.positions[0].id.model.value
````

## Advanced Features
### 1. Form Reset
Revert all changes to the original state:

````typescript
form.reset()
````

### 2. Error Handling
Fill form with validation errors from a server response:

````typescript
try {
  await submitForm(form.buildPayload())
} catch (error) {
  form.fillErrors(error.response.data.errors)
}
````

The `fileErrors` method currently only supports the Laravel style dot notation errors.

### 3. Filling Form State
Update multiple form fields at once, preserving the dirty state:

````typescript
form.fillState({
  name: 'John Doe',
  email: 'john@example.com'
})
````

### 4. Synchronizing Values Without Marking Dirty
Update both the current and original state, keeping the field "clean":

````typescript
form.syncValue('email', 'new@example.com')
````

## Real-World Examples
### 1. Date/Time Handling

````typescript
export class TimeTrackingEntryCreateUpdateForm extends BaseForm<RequestPayload, FormState> {
  protected override append: string[] = ['started_at', 'ended_at']
  protected override ignore: string[] = ['start_date', 'start_time', 'end_date', 'end_time']
  
  protected getStartedAt(): string {
    return DateTime.fromFormat(`${this.state.start_date} ${this.state.start_time}`, 'dd.MM.yyyy HH:mm').toISO()
  }
  
  protected getEndedAt(): string {
    return DateTime.fromFormat(`${this.state.end_date} ${this.state.end_time}`, 'dd.MM.yyyy HH:mm').toISO()
  }
}
````

### 2. Complex Object Handling

````typescript
export class IncomingVoucherCreateUpdateForm extends BaseForm<RequestPayload, FormState> {
  // Extract IDs from related objects
  protected getBusinessAssociateId(value: BusinessAssociateResource): string | null {
    return value?.id
  }
  
  protected getFileId(value: FileResource): string | null {
    return value?.id
  }
}
````