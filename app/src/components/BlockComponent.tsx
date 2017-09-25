import * as React from "react";
import {Link} from "react-router";
import {Logo} from "./logo/Logo";

export function BlockComponent() {
  return (
    <div>
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <Logo/>
            </a>
            <Link
              className="nav-item is-tab is-hidden-mobile"
              activeClassName="is-active"
              to="/"
            >
              Главная
            </Link>
            <Link
              className="nav-item is-tab is-hidden-mobile"
              activeClassName="is-active"
              to="/how-it-works"
            >
              Как работает Cf
            </Link>
            <a className="nav-item is-tab is-hidden-mobile">Как много можно заработать</a>
          </div>
          <span className="nav-toggle">
            <span/>
            <span/>
            <span/>
          </span>
          <div className="nav-right nav-menu">
            <a className="nav-item is-tab is-hidden-tablet">Главная</a>
            <a className="nav-item is-tab is-hidden-tablet is-active">Как работает Cf</a>
            <a className="nav-item is-tab is-hidden-tablet">Как много можно заработать</a>
            <a className="nav-item is-tab">
              <figure className="image is-16x16" style={{"margin-right": "8px"}}>
                <img src="http://bulma.io/images/jgthms.png"/>
              </figure>
              Статус ваших рекомендаций
            </a>
            <a className="nav-item is-tab">Выйти</a>
          </div>
        </div>
      </nav>

      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              IT eXperts
            </h1>
            <h2 className="subtitle">
              Заработай, рекомендуя лучших!
            </h2>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <a href="#">FAQ</a>
              {" - "}
              <a href="#">Условия</a>
              {" - "}
              <a href="#">Конфеденциальность</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
