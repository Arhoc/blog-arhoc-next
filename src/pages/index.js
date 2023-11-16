import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

//import { sql } from "@vercel/postgres";

const inter = Inter({ subsets: ['latin'] })

//const {rows, fields} = await sql`select title from blogentry where post_id = 1;`;

//console.log(rows);
//console.log(fields);

export default function Home() {

  return (
    <>
      <section className="hero is-info is-large banner">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item" href="/home">
                  <h1 className="title has-text-light" style={{ fontFamily: 'Share Tech Mono' }}>FORENSE EN POTENCIA</h1>
                </a>
                <span className="navbar-burger" data-target="navbarMenuHeroB">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroB" className="navbar-menu">
                <div className="navbar-end">
                  <a className="navbar-item is-active" href="/home">
                    Principal
                  </a>
                  <a className="navbar-item">
                    Blog
                  </a>
                  <a className="navbar-item">
                    Contacto
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">
              Un Forense En Potencia:
            </p>
            <p className="subtitle">
              El blog de G. Aidon.
            </p>
          </div>
        </div>
      </section>

      <section className="hero is-halfheight">
        <div className="hero-body animated-element">
          <div className="container has-background-black-ter">
            <a href="../blog/bruteforce-writeup" className="router-link" router-link-active="active">
              <section className="hero is-halfheight bruteforce-banner m-4">
                <div className="container has-text-centered">
                  <h1 className="title has-text-light is-size-3 m-2">Post: Bruteforce</h1>
                  <h2 className="subtitle has-text-grey-lighter mt-2">WriteUp de un challenge sencillo, donde debemos analizar un registro en formato .csv y obtener datos de un ataque a un servidor RDP.</h2>
                </div>
              </section>
            </a>
          </div>
        </div>
      </section>

      <section className="hero is-halfheight">
        <div className="hero-body animated-element">
          <div className="container has-background-black-ter">
            <a href="../blog/injection-series-writeup" className="router-link" router-link-active="active">
              <section className="hero is-halfheight injection-banner m-4">
                <div className="container has-text-centered">
                  <h1 className="title has-text-light is-size-3 m-2">Post: Injection Series Part 4</h1>
                  <h2 className="subtitle has-text-grey-lighter mt-2">WriteUp de la cuarta parte del challenge &quot;Injection Series&quot;,
                    donde se
                    tratan temas referentes a la ingeniería inversa.</h2>
                </div>
              </section>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
