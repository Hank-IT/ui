# Requirements
While this library can be used with any frontend, it includes Vue 3 support out of box and assumes the usage of Vue 3 in the documentation.

# Assumptions
 - This library expects data to be returned as json.
 - Validation errors return status code 422.

## Requests
This library supports fetch. Select your preferred client while bootstraping your application:

## Request driver

### Fetch
``` typescript
import { BaseRequest, FetchDriver } from '@hank-it/ui/service/requests'

BaseRequest.setRequestDriver(new FetchDriver)
```

You may enable credential support using:
``` typescript
BaseRequest.setRequestDriver(new FetchDriver(true))
```

## Defining requests
Each requests requires its own class:

``` typescript
import { BaseRequest, type ResponseContract } from '@hank-it/ui/service/requests'

export class GetCustomersRequest extends BaseRequest {
  method(): string {
    return 'GET'
  }

  url(): string {
    return '/api/v1/customers'
  }
}
```

### Defining paginatable requests
``` typescript
import { BaseRequest, type PaginatableRequest, type ResponseContract } from '@hank-it/ui/service/requests'

export class GetCustomersRequest extends BaseRequest implements PaginatableRequest {
  method(): string {
    return 'GET'
  }

  url(): string {
    return '/api/v1/customers'
  }
  
  // Used to retrieve the page data from the response
  getPage(data: object): object {
    return data.data
  }

  // Used to retrieve the total number of items from the response
  getTotal(data: object): number {
    return data.meta.total
  }
}
```

### Sending requests

#### Generic get request
``` typescript
new GetCustomersRequest()
    .send()
    .then(result => result.getBodyPromise())
    .then(data => {
        // Do something with data
    })
```

You may also access the raw response or the status code:
``` typescript
new GetCustomersRequest()
    .send()
    .then((result: ResponseContract) => {
        // result.getRaw()
        // result.getStatusCode()
        
        return result.getBodyPromise()
    })
    .then(data => {
        // Do something with data
    })
```

#### Posting json data
``` typescript
// This is the json content for the request
const content = new JsonContent({
  email: "username",
  password: "password",
})

new UserLoginRequest()
  .setData(content)
  .send()
  .then(result: ResponseContract => {
    // Do something with result
  })
```

### Posting form data (File uploading)
You may use any request to upload files:
``` typescript
const file = ref()

function submit() {
  const content = new FormDataContent({
    file: file.value.files[0],
  })

  new UploadInboxItemRequest()
    .setData(content)
    .send()
    .then(result: ResponseContract => {
       // Do something with result
    })
}
```

Uploading multiple files is supported by simply passing an array of files.

## Pagination with Array source

``` typescript
// This is our data source
const rows = [
  {
    color: "red",
    value: "#f00"
  },
  ...
  {
    color: "black",
    value: "#000"
  }
]

// Create data driver and give our data
const dataDriver = new ArrayDriver(rows)

// Create frontend driver and give initial  
// values for currentpage and pageSize
const frontendDriver = new VueDriver(1, 2)

const paginator = new Paginator(dataDriver, frontendDriver)

// Make the paginator prepare the first page 
paginator.init()

// All these methods return Vue 3 refs (or whatever is defined in the provided frontendDriver)
// and can be used directly in your template. You may also update these refs and 
// the required changes are done automatically behind the scenes.
const currentPage = paginator.currentPage()
const start = paginator.start()
const end = paginator.end()
const totalPages = paginator.totalPages()
const pageData = paginator.currentPageData()
const total = paginator.total()
const pageSize = paginator.pageSize()
```

## Pagination with Request source
You may use any request that implements the ``PaginatableRequest`` interface as data source:

``` typescript
// This is the request we want to paginate. Make sure you 
// implement the "PaginatableRequest" interface for this to work.
const getInboxItemsRequest = new GetInboxItemsRequest

// Create the data driver and provide our paginatable request
const dataDriver = new RequestDriver(getInboxItemsRequest)

// Create frontend driver and give initial  
// values for currentpage and pageSize
const frontendDriver = new VueDriver(1, 2)

const paginator = new Paginator(dataDriver, frontendDriver)

// Make the paginator prepare the first page 
paginator.init()

// All these methods return Vue 3 refs (or whatever is defined in the provided frontendDriver)
// and can be used directly in your template. You may also update these refs and 
// the required changes are done automatically behind the scenes.
const currentPage = paginator.currentPage()
const start = paginator.start()
const end = paginator.end()
const totalPages = paginator.totalPages()
const pageData = paginator.currentPageData()
const total = paginator.total()
const pageSize = paginator.pageSize()
```

## ToDo
- Request cancellation
    - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#aborting_a_fetch
- File responses (blob)
- File upload progress handling
- XSRF-TOKEN Support for fetch abstraction
- Infinite Scrolling