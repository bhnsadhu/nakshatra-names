# Nakshatra Name Finder

A web application that finds your birth star (Nakshatra) based on your birth details and suggests traditional Sanskrit/Indian names based on the sacred syllables.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

3. Add your Mistral API key to the `.env` file:
   ```
   MISTRAL_API_KEY=your_actual_api_key_here
   ```
   Get your API key from [Mistral Console](https://console.mistral.ai/api-keys).

## Local Development with Vercel Dev

To test the serverless API locally:

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Run the development server:
   ```bash
   vercel dev
   ```

This will start both the React app and the serverless API functions locally.

## Deploying to Vercel

This app is designed to work seamlessly with Vercel:

1. Push your code to GitHub

2. Import your repository in [Vercel](https://vercel.com)

3. Add the environment variable in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `MISTRAL_API_KEY` with your Mistral API key
   - Make sure to add it for Production, Preview, and Development environments

4. Deploy!

The `/api` directory contains serverless functions that will automatically be deployed by Vercel.

### Important Notes

- The API key is **never exposed** to the frontend
- All API calls to Mistral are made securely from the serverless backend
- The `/api/generate-names` endpoint handles all name generation requests

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
