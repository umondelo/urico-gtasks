// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  googleApi: {
    GOOGLE_VALIDATE_TOKEN_URL: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=',
    GOOGLE_TASK_API_URL: 'https://www.googleapis.com/tasks/v1/lists/%40default/tasks?access_token=',
    GOOGLE_AUTH_URL: 'https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ftasks+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ftasks+profile&redirect_uri=http://localhost:4200/index.html&response_type=token&client_id=329454390163-pdnkibiof3vql58mpd7ht7meplhh3tbo.apps.googleusercontent.com',
    GOOGLE_LOGOUT: 'https://mail.google.com/mail/u/0/?logout&hl=en',
  }
};
