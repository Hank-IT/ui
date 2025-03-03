# Library Overview

This library can be integrated with any frontend framework. It comes with built-in support for Vue 3, which is assumed
throughout the documentation.

## Request Handling

The library leverages a fetch-based driver to perform HTTP requests. The following sections explain how to initialize
the request driver and define custom requests.

---

## Initializing the Request Driver

Before making any requests, you must initialize the appropriate request driver. This is done during your application's
boot process by using the static `setRequestDriver` method.

### Using the Fetch Driver

To set up the fetch driver, import `BaseRequest` and `FetchDriver` from '@hank-it/ui/service/requests' and initialize
the driver as shown:

```typescript
import { BaseRequest, FetchDriver } from '@hank-it/ui/service/requests';

BaseRequest.setRequestDriver(new FetchDriver());
```

### Enabling Credential Support

If your requests need to include credentials (e.g., cookies for cross-origin requests), enable credential support as
follows:

```typescript
BaseRequest.setRequestDriver(new FetchDriver({
    corsWithCredentials: true,
}));
```

### Adding Global Headers

To include headers such as a CSRF token with every request, define them globally:

```typescript
BaseRequest.setRequestDriver(new FetchDriver({
    headers: {
        'X-XSRF-TOKEN': <token>,
    },
}));
```

---

## Defining Requests

Each API endpoint is represented as a separate class that extends `BaseRequest`. This class specifies the HTTP Method,
URL, and the expected request/response types.

### Example: Expense Index Request

The following example demonstrates how to define a GET request to the `/api/v1/expenses` endpoint:

```typescript
import { BaseRequest, RequestMethodEnum, JsonResponse } from '@hank-it/ui/service/requests';

export interface GenericResponseErrorInterface {
    message: string;
}

export interface ExpenseIndexRequestParams {
    filter?: {
        search_text?: string;
    };
}

export interface ExpenseResource {
    id: string;
// other data fields
}

export interface ExpenseIndexRequestResponseBody {
    data: ExpenseResource[];
}

export class ExpenseIndexRequest extends BaseRequest<
        GenericResponseErrorInterface,
        ExpenseIndexRequestResponseBody,
        JsonResponse<ExpenseIndexRequestResponseBody>,
        undefined,
        ExpenseIndexRequestParams
> {
    public method(): RequestMethodEnum {
        return RequestMethodEnum.GET;
    }

    public url(): string {
        return '/api/v1/expenses';
    }
}
```

### Explanation

- **HTTP Method**: Uses `GET` to retrieve data from the `/api/v1/expenses` endpoint.
- **Error Handling**: On failure (4XX/5XX status codes), the response will conform to `GenericResponseErrorInterface`.
- **Success Response**: A successful response is expected to follow the `ExpenseIndexRequestResponseBody` interface.
- **Response Format**: The response is of type JSON, as indicated by `JsonResponse`.
- **Request Body**: Since this is a GET request, the body is `undefined`.
- **Query Parameters**: Accepts query parameters that match the `ExpenseIndexRequestParams` interface.

---

## Sending the Request

Once the request is defined, you can send it using the following code:

```typescript
const request = new ExpenseIndexRequest();

// The response type and body are inferred automatically.
request.send().then((response: JsonResponse<ExpenseIndexRequestResponseBody>) => {
    const body = response.getBody(); // Type: ExpenseIndexRequestResponseBody
});
```

This completes the setup and usage of the request driver and custom requests. You can now use these patterns to create
additional requests as needed.
