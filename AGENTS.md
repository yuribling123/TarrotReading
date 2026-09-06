# Project Rules

## Bilingual UI

- This website must always maintain feature parity between the English and Chinese versions.
- When modifying the UI, interactions, content structure, components, state, or page flows in either language, always review and update the other language version as needed.


## Assets

- Put image assets under public/images folder, 
- Can create new folder under public/images to organize images by its purpose
- Use the image by referring to the path

## Maintainability

- For element that might be responsible, create a component for it and use in parent component, follow best practice of maintainibilty, scalability and readbility

- To define the type of a data, put the structure under the exsiting type.ts

## Styling

- Use Tailwind CSS classes directly in a component for component-scoped styling by default.
- Add styles to `app/globals.css` only when they are genuinely global or cannot be expressed clearly with Tailwind, such as shared theme rules, keyframes, pseudo-elements that need global selectors, or complex cross-component state selectors.
- When editing a component, avoid adding nonessential component-specific class rules to `app/globals.css`.
