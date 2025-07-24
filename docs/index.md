# Getting Started

This library can be integrated with any frontend framework. It comes with built-in support for Vue 3, which is assumed
throughout the documentation.

````bash
npm install @hank-it/ui --save
````

## Request Handling

The library leverages a fetch-based driver to perform HTTP requests. The following sections explain how to initialize
the request driver and define custom requests.

## Initializing the Request Driver

Before making any requests, you must initialize the appropriate request driver. This is done during your application's
boot process by using the static `setRequestDriver` method.

### Using the Fetch Driver

To set up the fetch driver, import `BaseRequest` and `FetchDriver` from '@hank-it/ui/service/requests' and initialize
the driver as shown:

```typescript
import { BaseRequest, FetchDriver } from '@hank-it/ui/service/requests'

BaseRequest.setRequestDriver(new FetchDriver())
```

### Enabling Credential Support

If your requests need to include credentials (e.g., cookies for cross-origin requests), enable credential support as
follows:

```typescript
BaseRequest.setRequestDriver(new FetchDriver({
    corsWithCredentials: true,
}))
```

### Adding Global Headers

To include headers such as a CSRF token with every request, define them globally:

```typescript
BaseRequest.setRequestDriver(new FetchDriver({
    headers: {
        'X-XSRF-TOKEN': "<token>",
    },
}))
```

Sometimes you want to refetch the header when the request is sent. You may specify a callback for this:

```typescript
BaseRequest.setRequestDriver(new FetchDriver({
    headers: {
        'X-XSRF-TOKEN': () => getCookie('XSRF-TOKEN')
    },
}))
```

### Specifying a Base URL

In case your backend lives on a separate domain, you may specify a default base url, which is prepended to every request url:

```typescript
BaseRequest.setDefaultBaseUrl('https://example.com')
```