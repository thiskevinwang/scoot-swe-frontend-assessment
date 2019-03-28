# Scoot - Associate SWE Assignment

The **Front End** project for Scoot Networks' Associate Engineer assessment.

## Getting Started

### Prerequisites

- **Node.js** version >= `6.5`
- **npm** version >= `3.10`

To check [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) versions, run:

```shell
node -v
npm -v
```

- More info: https://nodejs.org/en/download/

### Install Dependencies

From the project root directory:

```shell
npm install
```

### Running in `development` mode

```shell
npm start
```

Runs the app in the development mode.<br>
Open **[http://localhost:3000](http://localhost:3000)** to view it in the browser.

### Running in `production` mode

```shell
npm run build && serve -s build
# or
npm run prod
```

Builds the app to the `build` folder, and serves it.<br>
Open **[http://localhost:5000](http://localhost:5000)** to view it in the browser.

## WARNING

The `<ScootMap />` component runs in `development` mode by default, even if the app is running in `production` mode.

### Steps to override:

- You will need a **Google API KEY**

  - [Retrieving your Google API Key](https://support.google.com/googleapi/answer/6158862?hl=en).

- Copy-paste your Google API Key into `.env.example` like such:

```shell
REACT_APP_GOOGLE_API_KEY= #API key goes here
```

- **Save**
- **Rename** `.env.example` to `.env`

> Note: `.env` is excluded from version control to avoid sharing API keys (ex. to GitHub). And may no longer be viewable from your text editor. To edit it directly...
>
> From the project root directory:
>
> ```shell
> open .env
> # or
> vim .env
> ```

The map should now run in `production` mode, when the app is in `production` mode as well!
