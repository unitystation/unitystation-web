# Why is this empty directory here?

This project uses the App Router (`app/`) exclusively. This empty `pages/`
directory only exists as a workaround for Cypress component testing: without
it, the Cypress Next.js dev server treats the project root as the Pages Router
directory and applies page-only compiler rules to every module including
`node_modules` which makes component specs fail with
"Using `export * from '...'` in a page is disallowed" (from react-icons).

Do not add pages here.
