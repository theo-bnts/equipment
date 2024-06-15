import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import routes from './app.routes';

export default {
  providers: [provideRouter(routes)],
} as ApplicationConfig;
