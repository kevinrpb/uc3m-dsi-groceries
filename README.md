# Uc3mDsiGroceries

## TODO
### Styles
- [ ] Hacer iconos cuadrados
- [X] Poner fondo de body del mismo color que la app

### Auth
- [ ] Tener en cuenta campo genero en el registro

### Servicio Productos
- [X] Crear modelo de producto
- [X] Sincronización de productos con firestore

### Servicio Listas
- [X] Sincronización con listas en firestore
- [X] Ver como hacer `where` para sacar las compartidas
- [X] Permitir crear nueva lista
- [X] Permitir editar lista
  - [X] Item por item
  - [X] Vaciar completamente
- [X] Permitir eliminar lista
  - [ ] Al eliminar lista compartida, no se elimina, se deja de ser miembro
- [X] Permitir compartir lista
  - [X] La función compartir debe encontrar el ucid recibiendo un email (el usuario no puede meter el ucid a mano)
  - [X] Función para obtener los objetos user de los miembros (displayName, email, foto) --> desde los ucid en el array de participantes (Lo ideal es que fuera Observable<{}[]>)
  - [ ] Eliminar usuarios compartiendo
  - [ ] Si no eres owner que no deje compartir

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
