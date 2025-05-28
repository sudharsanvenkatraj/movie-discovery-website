# Movie Discovery

Movie Discovery is a responsive web application that helps users decide “What Should I Watch Tonight?” by browsing curated movie suggestions, searching for titles or actors, and managing a wishlist of favorite movies.

## Features

- Browse trending and curated movies
- Data are fetch directly from TMDB API
- Search movies by title or actor
- View detailed information for each movie
- Add or remove movies from your wishlist
- Responsive design for desktop and mobile
- Angular SSR (Server-Side Rendering) support

## Tech Stack

- [Angular](https://angular.io/) 17+
- [Angular Material](https://material.angular.io/)
- [Express](https://expressjs.com/) (for SSR)
- [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
- TypeScript

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

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/sudharsanvenkatraj/movie-discovery-website
    cd movie-discovery-website-cicd
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Development Server

Start the Angular development server:

```sh
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser. The app will reload automatically if you change any source files.


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

API keys and endpoints are configured in [`src/environments/environment.development.ts`](src/environments/environment.development.ts).



## Deploy in Server

Once the branch is merged into `master`, the pipeline is triggered by CodePipeline, and the deployment to production begins automatically. The deployment script is defined in the `buildspec.yml` file.

## License

This project is for educational/demo purposes. See [LICENSE](LICENSE) if present.

---



© 2025 Movie Discovery. All rights reserved.