import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export const firebaseConfig = {
  apiKey: "AIzaSyAh3j2RU9A-__4156MAL4B5z5qrd2APBdA",
  authDomain: "trixie-dgje.firebaseapp.com",
  projectId: "trixie-dgje",
  storageBucket: "trixie-dgje.appspot.com",
  messagingSenderId: "120315258252",
  appId: "1:120315258252:web:b4cd997a272b1f5ad8a2a9"
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
