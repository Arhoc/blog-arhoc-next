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
                <video autoPlay muted loop className="video-background">
                    <source src="/assets/banner-animated.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
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
                            Spotify Premium sin anuncios v1.1.22.633
                        </p>
                        <p className="subtitle">
                            Descargar para Windows
                        </p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <h1 className="title has-text-light">Descargar Spotify Premium para Windows</h1>

                    <div className="content">
                        <center>
                            <a href="/cdn/SpotifyPremium-main.zip" className="router-link" router-link-active="active">
                                <button class="button is-success">Descargar Spotify Premium v1.1.22.633</button>
                            </a>
                        </center>
                        <br />

                        <img src="https://user-images.githubusercontent.com/56351738/151934393-70cde3db-62f7-48d7-8250-dbb2d741226f.png"></img>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <h1 className="title has-text-light">Instrucciones</h1>

                    <div className="content">
                        <p> Extrae "Spotify Crack by Zuptil.zip". <br />
                            Abre la carpeta "Spotify-Desktop_v1.1.22.633 <br />
                            Ejecuta "SpotifyFullSetup_v1.1.22.633.exe" e instala Spotify <br />
                            Una vez que se abra Spotify, cierra la aplicación <br />
                            Ejecuta "SpotifyPatch.bat". <br />
                            Disfruta de música y podcasts sin publicidad</p>

                        <img src="https://i.redd.it/23shsitmn8n21.jpg"></img>
                    </div>
                </div>
            </section>
        </>
    );
}
