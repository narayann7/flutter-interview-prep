#### GenerateStaticParams
`generateStaticParams` is used to generate static paths at build time for dynamic routes. It is called during the build process and not on every request. This is only used when your app is built or when the page is statically re-generated (if revalidation is enabled).
**When is it called?**
• **At build time** when the app is being built (i.e., during npm run build or next build).
• If incremental static regeneration (ISR) is used, it may also be triggered periodically when new content is added.
**When to Use generateStaticParams?**
You should use generateStaticParams when you know your routes in advance (e.g., markdown files stored locally) and want to pre-generate pages for better performance. If you don’t need pre-rendering, you can skip generateStaticParams and rely on dynamic rendering.