# Toru runs for good

This demenstrates integrating website seamlessly with Twitter.


## Development

- Node 10.15.3
- npm 6.10.1

To run the app locally, run `npm start`

## Deployment

We assume you deploy the app on Zeit Now.

One-time preparation

- `npx now login`
- make sure you don't have a project called 'run4good' in your Now account.

To deploy run the following commands;

```
npm run build
npm run deploy
```

## License

- The source codes are distributed under MIT licence. See LICENSE file for details.
- The image assets are obtained from https://unsplash.com/.
