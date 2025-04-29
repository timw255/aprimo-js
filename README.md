# Aprimo JS &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/timw255/aprimo-js/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/aprimo-js.svg)](https://www.npmjs.com/package/aprimo-js)

A JavaScript SDK for interacting with Aprimo REST APIs.

> **This is a community-supported SDK and is not officially maintained or endorsed by Aprimo.** It is provided as a helpful resource for developers building with Aprimo. See the [Aprimo Developers](https://developers.aprimo.com/) site for official documentation and supported resources.

## Available Modules

Aprimo JS provides a modular interface to most core Aprimo DAM APIs.

The following modules are available:

- `auditTrail`
- `classifications`
- `collections`
- `contentTypes`
- `downloadLinks`
- `fieldDefinitions`
- `fieldGroups`
- `fileTypes`
- `files`
- `maintenanceJobs`
- `orders`
- `permissions`
- `publicLinks`
- `recordLocks`
- `records`
- `rules`
- `search`
- `settingCategories`
- `settingDefinitions`
- `settings`
- `translations`
- `uploader`
- `userGroups`
- `users`

> ℹ️ Each module provides a consistent API surface **where applicable**

```ts
await aprimo.[module].get(params);
await aprimo.[module].getById(id);
await aprimo.[module].create(data);
await aprimo.[module].update(id, data);
await aprimo.[module].delete(id);
await aprimo.[module].getPaged(params);
```
For example:

```ts
const result = await aprimo.records.get({ pageSize: 50 });
```

Modules may only support a subset of these operations depending on the underlying API.

## Installation

```bash
npm install aprimo-js
```

## Authentication

The SDK supports three authentication strategies. See [Integration Registrations](https://developers.aprimo.com/docs/OAuth2#integration-registrations) in the official documentation for details on how to register your client and configure a flow.

### Client Credentials Flow

For service-to-service interactions (e.g., scripts, background tasks).

```ts
const aprimo = createClient({
  type: "client_credentials",
  environment: "your-subdomain",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});
```

### Resource Owner Password Flow

For acting on behalf of a real user, where a browser login isn't available.

```ts
const aprimo = createClient({
  type: "password",
  environment: "your-subdomain",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  username: "username",
  password: "user-token",
});
```

### Custom Token Provider (e.g., PKCE + Refresh Token)

For browser-based login flows or integrations where you already manage the token lifecycle.

```ts
const aprimo = createClient({
  type: "custom",
  environment: "your-subdomain",
  tokenProvider: async () => {
    const token = await getTokenSomehow();
    return token;
  },
});
```

### Tokens and Refresh Handling

- **Credential and Password flows** handle token caching and expiration automatically.
- **Custom strategies** give you full control — you're responsible for managing token expiration and refresh logic.

## Basic Usage

### Upload and Create an Asset Record
 
Upload a file, then create a record that references the uploaded file using the returned upload token. This is the standard flow for creating new records in Aprimo DAM.
 
```ts
import { createClient } from "aprimo-js";

const aprimo = createClient({
  type: "client_credentials",
  environment: "your-subdomain",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

// Step 1: Upload the file
const file = new File([new Blob(["hello world"])], "example.txt");
const upload = await aprimo.uploader.uploadFile(file);

const uploadToken = upload.data!.token;

// Step 2: Create a record and attach the uploaded file
const res = await aprimo.records.create({
  status: "draft",
  contentType: "Asset",
  files: {
    master: uploadToken,
    addOrUpdate: [
      {
        versions: {
          addOrUpdate: [
            {
              id: uploadToken,
              fileName: file.name,
            },
          ],
        },
      },
    ],
  },
});

console.log("Created record:", res.data!.id);
```

### Read a record by ID
 
Fetch a record and include linked resources.
 
```ts
import { Expander } from "aprimo-js";
import type { Record, File, FileVersion } from "aprimo-js/model";

const expander = Expander.create()
  .for<Record>("Record").expand("masterfile", "fields")
  .for<File>("File").expand("fileversions")
  .for<FileVersion>("FileVersion").expand("renditions");

const res = await aprimo.records.getById(id, expander);

console.log("Record with expanded links:", res.data);
```

> ℹ️ Learn more about using `Expander` in the [Expanding Linked Resources](#expanding-linked-resources) section below.

### Update a record
 
Update metadata on a record. You only need to include the fields you want to change.
 
```ts
const res = await aprimo.records.update(id, {
  fields: {
    addOrUpdate: [
      {
        fieldId: "00000000000000000000000000000000", // Example
        localizedValues: [
          {
            languageId: "00000000000000000000000000000000", // Example
            value: "Updated value"
          }
        ]
      },
    ],
  },
});
```

### Delete a record
 
Delete the record by ID. This is permanent and cannot be undone.
 
```ts
const res = await aprimo.records.delete(assetId);
```

### Paged Data

Use `.getPaged()` with `for await...of` to iterate over large datasets without manually managing pagination. This is especially useful for exports, audits, or bulk operations.

```ts
const all: Classification[] = [];

for await (const pageResult of aprimo.classifications.getPaged({ pageSize: 1000 })) {
  all.push(...(pageResult.data?.items ?? []));
}

console.log('Classification count:', all.length);
```

## Expanding Linked Resources

Some API responses support embedding related resources (like master files, fields, etc.). To control this, use the `Expander` utility to specify which relationships to expand.

```ts
import { Expander } from 'aprimo-js';
import type { Record, File, FileVersion } from 'aprimo-js/model';

const expander = Expander.create()
  .for<Record>("Record").expand("masterfile", "fields")
  .for<File>("File").expand("fileversions")
  .for<FileVersion>("FileVersion").expand("renditions");

const result = await aprimo.records.getById("your-record-id", expander);

const rendition = result.data?._embedded?.masterfile?._embedded?.fileversions?.items?.[0]
  ._embedded?.renditions?.items?.find(r => r.type === "Original");

if (!rendition) throw new Error("Original rendition not found.");
```

The `Expander` generates the appropriate `select-<TypeName>` headers under the hood, and ensures your expand calls are type-safe and properly scoped.

_**Why do I pass both the type (`<Record>`) and the name (`"Record"`) to `.for()`?**_

This is intentional:

- `Record`, `File`, and `FileVersion` are **TypeScript types** used for **type checking** and auto-complete.
- `"Record"`, `"File"`, and `"FileVersion"` are **string keys** required by the API to construct proper headers like `select-Record: masterfile,fields`, `select-File: fileversions`, `select-FileVersion: renditions`

## Advanced Upload Options

The `uploader.uploadFile()` method supports large files, progress tracking, and cancellation out of the box.

### Customize Segment Size

By default, large files are split into 20MB chunks. You can customize the segment size (in **megabytes**) using the `segmentSize` option:

```ts
const res = await aprimo.uploader.uploadFile(file, {
  segmentSize: 10, // Use 10MB chunks instead of the default 20MB
});
```

This can be useful if you're uploading from environments with bandwidth or memory constraints.

> ℹ️ Setting a very small segment size may increase upload overhead due to more network calls. Choose a size that balances reliability and performance for your use case.

### Parallel Uploads

By default, large files are uploaded sequentially (one segment at a time). You can speed this up by enabling parallel uploads using `parallelLimit`:

```ts
const res = await aprimo.uploader.uploadFile(file, {
  parallelLimit: 4, // Upload up to 4 segments at once
});
```

> ℹ️ If you don't set `parallelLimit`, the upload runs one segment at a time (i.e., parallelLimit = 1).

Setting a higher value (e.g., 4 or 6) can significantly reduce total upload time for large files — if the environment (browser, Node.js, network, etc.) can support it. Avoid setting overly high values as it may degrade performance or overwhelm system/network resources.

### Track Upload Progress

You can pass an `onProgress` callback to track how many bytes have been uploaded in real time:

```ts
const file = new File([/* your data */], "largefile.mp4");

const res = await aprimo.uploader.uploadFile(file, {
  onProgress: (segmentsUploaded, totalSegments) => {
    console.log(`Uploaded ${segmentsUploaded} of ${totalSegments} segments`);
  },
});
```

### Cancel an Upload

To support cancellation (e.g., if the user cancels the upload or navigates away), pass an AbortSignal:

```ts
const controller = new AbortController();

const res = await aprimo.uploader.uploadFile(file, {
  signal: controller.signal,
});

setTimeout(() => controller.abort(), 500); // Cancel after 500ms
```

If canceled, the result will contain an `AbortError`:

```ts
if (!res.ok && res.error?.type === "AbortError") {
  console.log("Upload was cancelled.");
}
```

### Error Handling

Failures during upload (e.g., segment or commit failure) return meaningful error types:

```ts
if (!res.ok) {
  switch (res.error?.type) {
    case "UploadSetupFailed":
      console.error("Could not set up upload session.");
      break;
    case "UploadSegmentFailed":
      console.error("A segment failed to upload.");
      break;
    case "UploadCommitFailed":
      console.error("Upload succeeded, but commit failed.");
      break;
    default:
      console.error("Unknown upload error:", res.error?.message);
  }
}
```

### Example

Here's an advanced example that shows how to use more features of the uploader:

```ts
import { createClient } from "aprimo-js";

const aprimo = createClient({
  type: "client_credentials",
  environment: "your-subdomain",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

const file = new File([/* your file data */], "my-asset.mp4");

const controller = new AbortController();

const res = await aprimo.uploader.uploadFile(file, {
  segmentSize: 10, // 10MB segments instead of default 20MB
  parallelLimit: 4, // Upload 4 segments at once
  signal: controller.signal, // Allow canceling
  onProgress: (uploaded, total) => {
    console.log(`Uploaded ${uploaded} of ${total} segments`);
  },
});

if (!res.ok) {
  switch (res.error?.type) {
    case "AbortError":
      console.warn("Upload was cancelled by the user.");
      break;
    case "UploadSetupFailed":
      console.error("Could not set up the upload.");
      break;
    case "UploadSegmentFailed":
      console.error("A segment failed to upload.");
      break;
    case "UploadCommitFailed":
      console.error("Commit failed after segments uploaded.");
      break;
    default:
      console.error("Unknown error:", res.error?.message);
  }
} else {
  console.log("Upload successful! Upload token:", res.data?.token);
}
```

## Understanding `ApiResult<T>`
 
API calls returns an `ApiResult<T>` object to help you handle success and error cases consistently.
 
```ts
type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: {
    type?: string;
    message?: string;
    raw?: unknown;
  };
};
```
 
### Fields:

| Field   | Type     | Description                                                              |
|---------|----------|--------------------------------------------------------------------------|
| `ok`    | boolean  | Indicates if the request was successful (`true` for 2xx responses)       |
| `status`| number   | The HTTP status code returned by the API                                 |
| `data`  | `T`      | The deserialized response body (only present if successful)              |
| `error` | object   | Contains error info when `ok` is `false`, with `type`, `message`, `raw`  |

### Example Usage:

```ts
const result = await aprimo.records.getById(id);

if (!result.ok) {
  console.error("Request failed:", result.error?.message);
} else {
  console.log("Record id:", result.data?.id);
}
```

## 429 Rate Limit Handling

The `HttpClient` supports automatic retries for `429 Too Many Requests` errors.

### Enabling Retries

```typescript
import { createClient } from "aprimo-js";

const aprimo = createClient({
  environment: "your-env",
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  authMode: "client_credentials",
  httpOptions: {
    maxRetries: 3,
    retryHandler: async (error, attempt) => {
      await new Promise((r) => setTimeout(r, 500 * attempt));
      return true;
    },
  },
});
```

- `maxRetries`: Maximum number of total attempts (default `0`).
- `retryHandler`: Optional async function to control delay or cancel retry.

### Behavior

- Retries only occur for `429` errors.
- `retryHandler` controls delay before retrying.
- If `retryHandler` returns `false`, no further attempts will be made.

## Content Selector (Browser Only)

The Aprimo Content Selector is a browser-based UI that allows users to browse and select content from Aprimo DAM. It’s ideal for embedding in CMS plugins, marketing tools, or custom portals.

> ℹ️ The content selector is available via the SDK but only works in browser environments (e.g., React, Next.js). It won’t function in Node.js or server-only environments.

### Usage

Use the `contentSelector` helper to open the selector in a new window and handle the selected items via callback:

```ts
import { contentSelector } from "aprimo-js/content-selector";

const selector = contentSelector("your-subdomain");

selector.open(
  {
    title: "Choose content",
    description: "Only content with headphones",
    select: "multiple",
    limitingSearchExpression: "Title CONTAINS 'headphones'",
    accept: "Add to Gallery",
    facets: ["FileTypeFilter", "ContentTypeFilter"],
    targetOrigin: "*",
  },
  (result) => {
    if (result.result === "cancel") {
      console.log("User cancelled content selection");
    } else {
      const ids = result.selection.map((s) => s.id);
      console.log("Selected record IDs:", ids);
    }
  }
);
```


### Select Options

| `select` Value     | Behavior                                                                 |
|--------------------|--------------------------------------------------------------------------|
| `single`           | Select one record                                                        |
| `multiple`         | Select multiple records                                                  |
| `singlefile`       | Select a master file or a rendition (returns file info)                 |
| `singlerendition`  | Select a record with a public link (returns the record + public URI)     |

> ℹ️ When using `singlerendition`, your `limitingSearchExpression` should be: `"latestversionofmasterfile.haspublicuri = true"`

## Contributing

We welcome contributions of all kinds — PRs, bug reports, feedback, and ideas!

To get started:

```bash
git clone https://github.com/timw255/aprimo-js.git
cd aprimo-js
npm install
```

Create a .env file with your Aprimo credentials:
```
APRIMO_ENVIRONMENT=your-subdomain
APRIMO_CLIENT_ID=your-client-id
APRIMO_CLIENT_SECRET=your-client-secret
TEST_RECORD_ID=00000000000000000000000000000000
```

> ℹ️ `TEST_RECORD_ID` should reference a real record in your Aprimo environment. It's used to test specific modules (e.g., locking, public-links).

## Running Tests

Integration tests will create and delete real data in your Aprimo environment. Avoid running them against production.

```bash
npm run test:int
```

---
⭐ Star us on GitHub: [timw255/aprimo-js](https://github.com/timw255/aprimo-js)