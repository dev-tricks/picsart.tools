import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'app/app.module';
import { environment } from 'environments/environment';
import { hmrBootstrap } from 'hmr';

let findGetParameter = (parameterName: string): string => {
  let result = null, tmp = [];
  let items = location.search.substr(1).split('&');
  for (let index = 0; index < items.length; index++) {
    tmp = items[index].split('=');
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
};

let removeGetParameter = (key, sourceURL) => {
  let rtn = sourceURL.split('?')[0],
    param,
    params_arr = [],
    queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
  if (queryString !== '') {
    params_arr = queryString.split('&');
    for (let i = params_arr.length - 1; i >= 0; i -= 1) {
      param = params_arr[i].split('=')[0];
      if (param === key) {
        params_arr.splice(i, 1);
      }
    }
    if (params_arr && params_arr.length) {
      rtn = rtn + '?' + params_arr.join('&');
    }
  }
  return rtn;
};

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  }
  else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  const code = findGetParameter('code');

  if (code) {
    const url = removeGetParameter('code', window.location.href);
    const request = new XMLHttpRequest();
    request.open('post', `${ environment.serverUrl }auth/exchangeToken`, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify({
      code: code,
      redirectUrl: url
    }));
    request.onload = () => {
      localStorage.setItem('user', request.responseText);
      sessionStorage.setItem('token', JSON.parse(request.responseText).token);
      window.location.href = url;

      bootstrap();
    };

  } else {
    const token = sessionStorage.getItem('token');

    if (token) {
      bootstrap();
    } else {
      window.location.href = 'https://kc.picsart.tools/auth/realms/master/protocol/openid-connect/auth?client_id=' + environment.clientId + '&redirect_uri=' + window.location.href + '&response_type=code&scope=openid';
    }
  }
}
