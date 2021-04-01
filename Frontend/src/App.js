import React, {Suspense} from 'react'
import './App.css';

import { PeopleList, PeopleForm,  PeoplePutForm } from './components/people';
import { CategoriesList, CategoriesForm, CategoriesPutForm } from './components/categories';
import { BooksForm, BooksList, BooksPutForm } from './components/books';
//import { PeopleContext, CategoriesContext, BooksContext } from './AppContext';
//import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {  BooksProvider, useBooks } from './Context/BooksContext';
import {  PeopleProvider, usePeople } from './Context/PeopleContext';
import {  CategoriesProvider, useCategories } from './Context/CategoriesContext';

const BooksContext = React.createContext();
const PeopleContext = React.createContext();
const CategoriesContext = React.createContext();

export default () => (//Envolvemos la App dentro del proveedor
  <BooksProvider>
    < PeopleProvider>
      <CategoriesProvider>
        <App></App>
      </CategoriesProvider>
    </ PeopleProvider>
  </BooksProvider>
);

function App() {
  return (
    <div className="App">
      <Router>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">
              <img src="react-logo.png" alt="logo"></img>
            </Link>
          </li>
          <li>
            <Link to="/people/form">personas</Link>
          </li>
          <li><a href="#">Libros</a></li>
          <li><a href="#">Categorias</a></li>
          <li><a href="#">Descripción</a></li>
          <div className="nav-btn-container">
            <li><button className="signin-btn">Sign In</button></li>
            <li><button className="signup-btn">Sign Up</button></li>
          </div>
        </ul>
      </nav>
      <div className="App-header">
        <h1>Where is my book?</h1>
      </div>
      <div className="content-container">
        <div>
          <Switch>
            <Route exact path="/people/form">
              <PeopleForm />
            </Route>
          </Switch>
            {/* <Route exact path="/people/form" component={PeopleForm} />
            <Route exact path="/people/list" component={PeopleList} />
            <Route exact path={`/people/change/:id/:nombre`} component={PeoplePutForm} />
          
            <Route exact path="/categories/form" component={CategoriesForm} />
            <Route exact path="/categories/list" component={CategoriesList} /> 
            <Route exact path={`/categories/change/:id/:nombre`} component={CategoriesPutForm} />

            <Route exact path="/bookform" component={BooksForm} />
            <Route exact path="/" component={BooksList} />
            <Route exact path={`/book/change/:id/:descripcion`} component={BooksPutForm} /> */}
        </div>
      </div>
      </Router>
      <footer>
        <p>Grupo P - Curso ReactJS - 2020/2021</p>
      </footer>
    </div>
  );
}

//export App;
