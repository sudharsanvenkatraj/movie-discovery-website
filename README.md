# JkTechFrontendApplication - Movie Discovery

## Application Overview

Movie Discovery is a responsive web application that helps users decide “What Should I Watch Tonight?” by browsing curated movie suggestions, searching for titles or actors, and managing a wishlist of favorite movies.

## Features

- Browse trending and curated movies
- Data are fetch directly from TMDB API
- Search movies by title or actor
- View detailed information for each movie
- Add or remove movies from your wishlist
- Responsive design for desktop and mobile
- Angular SSR (Server-Side Rendering) support

## Technical Details

- **Angular Version**: 19
- **Node.js Version**: 22.x (recommended)
- **Styling**: Angular Material vs Bootstrap 5.1.3 CSS for responsive design

## Get a TMDB API Key 
For the current project, I have used a Bearer token.


1. Sign Up or Log In to TMDB
    - Create account in https://www.themoviedb.org/

2. Navigate to API Settings
    - Go to Settings.
    - In the left menu, click API.

3. Apply for an API Key
    - Scroll down to API Key (v3 auth).
    - Click the "Create" or "Apply" button.
    - Fill out the required fields:
        - App name
        - App URL (can be http://localhost:4200 for development)
        - App description
    - Submit the form.

4. Copy Your API Key or bearer token.

## Getting Started

### Prerequisites

- Node.js (v18.x recommended)
- npm (v8.x or later)
- Angular CLI (v19)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sudharsanvenkatraj/movie-discovery-website
    cd movie-discovery-website
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Running Unit Tests

To execute unit tests via [Karma](https://karma-runner.github.io):

```sh
ng test
```

Code coverage is currently at 90%. Refer to the report to see detailed metrics.

```sh
ng test --no-watch --code-coverage
```


### Server-Side Rendering (SSR)

To build and run the SSR server:

```sh
npm run build:ssr
npm run serve:ssr
```

### Project Structure

```
src/
  app/
    component/
      header/      # App header and wishlist
      landing/     # Landing page and movie list
      detail/      # Movie detail view
      footer/      # App footer
    core/
      services/    # API and utility services
      interceptor/ # HTTP interceptors
    shared/        # Shared modules/components
  assets/          # Static assets (images, icons)
  environments/    # Environment configs
  styles.css       # Global styles
  custom-theme.scss# Angular Material theme
```

### API Configuration

API keys, TMDB token and endpoints are configured in [`src/environments/environment.development.ts`](src/environments/environment.development.ts).



## Deploy in Server

Once the branch is merged into `master`, the pipeline is triggered by CodePipeline, and the deployment to production begins automatically. The deployment script is defined in the `buildspec.yml` file.

## License

This project is for educational/demo purposes. See [LICENSE](LICENSE) if present.

---



© 2025 Movie Discovery. All rights reserved.
