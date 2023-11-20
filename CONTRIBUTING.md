# Contributing

## Folder structure and workspaces

- `examples`: examples for merchants to use as inspiration
- `packages`: components built with Mitosis
- `server`: Checkout server in Astro, PCI compliant
- `stories`: Storybook for developing/testing components, currently uses React
- `web`: components written in Mitosis

## Dependencies

1. Install [Bun](https://bun.sh)
2. Run `bun i` on a terminal

That's it 😄

### Running locally

```sh
bun start
```

Automatically starts `components`, `stories`, and `server`.  
Opens `stories` and `server` on the browser.

### Other scripts

Look at `package.json#scripts` for a complete list.  
Use with:

```sh
bun run <script>
```
