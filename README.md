This project is my initial implementation of my portfolio (https://github.com/Poolchaos/flaapworks-vue), which was built in Aurelia.
Due to this project loading large framework files, I decided to move to VueJS

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles for development
```
npm run build
```

### Compiles and minifies for production
```
npm run build:prod
```
## As part of thi project, I had to proxy some of the API's for testing:

### run a url on a proxy to bypass cors on localhost

lcp --proxyUrl https://www.linkedin.com

```
npm i local-cors-proxy -g
define port --port
```