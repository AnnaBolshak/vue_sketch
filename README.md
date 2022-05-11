# This is a sketch of vue components

This project is a code sample of Vue.js components.

Sketch contains list of projects (in this case list of exhibitions of museums but it could be any projects). 

Properties of the project:
- Id
- Name 
- Customer
- CreateDate

Implemented search by name, customer and id.

Two views: list and card view are available.

For list view available following operation: **selecting** projects with checkbox, select/diselect all projects, **sorting** by name, customer, date, id.

> #### Technologies and libraries list
>
> - Vue.js
> - Vuex
> - Vue Router
> - Axios
> - Vue Class Component
> - TS
> - Vue Property Decorator
> - Font Awesome

Projects data is imported with Axios from the local json file.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
