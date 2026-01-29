# Operations Management Portal UI

## Background
- Client-Side SPA
- TS Types Generated from backend OpenAPI Spec (using NSwag)
- Zod Form validation generated from TS types
- React hook form + reusable wizards

## Usage
- Regen types from backend 
```bash
nswag run \nswag.json
```
- This will get rid of some decorators we need for zod
- Add the following decorator above any non - *Client type (or find a configuration setting that can ignore *Client)
```ts
/**
 * @toExtract
 */
```
- If any fields change, change the WizardMeta's as needed
- Gen Zod Types
```bash
npx ts-to-zod
```
-- the file type param needs to go from 'data' to 'data?' for ts-to-zod

- one other ts-to-zod pain point:
  - ts-to-zod hates arrays for some reason, so I had to comment out the arrays on project, then manually add
  ```ts
  additionalTasks: z.array(iAdditionalTaskSchema).optional(),
  ```
