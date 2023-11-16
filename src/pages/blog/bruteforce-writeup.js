import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function BruteForceWriteup() {
    const first_ls = `[arhoc@ArchLinux Bruteforce ]$ ls -la
  total 11976
  drwxr-xr-x 2 arhoc arhoc    4096 Nov  4 14:26  ./
  drwxr-xr-x 7 arhoc arhoc    4096 Nov  4 14:25  ../
  -rw-r--r-- 1 arhoc arhoc  113141 Nov  4 14:24  00fd9853557296dd3312d4529c137f1cecb329d7.zip
  -rw-r--r-- 1 arhoc arhoc 6032687 Feb 12  2022  BTLO_Bruteforce_Challenge.csv
  -rw-r--r-- 1 arhoc arhoc   69632 Feb 12  2022  BTLO_Bruteforce_Challenge.evtx
  -rw-r--r-- 1 arhoc arhoc 6032687 Feb 12  2022  BTLO_Bruteforce_Challenge.txt
  -rw-r--r-- 1 arhoc arhoc     360 Feb 12  2022 'READ ME.txt'`

    const less_txt = `<EF><BB><BF>Keywords    Date and Time   Source  Event ID        Task Category
  Audit Failure   2/12/2022 7:22:00 AM    Microsoft-Windows-Security-Auditing     4625    Logon   "An account failed to log on.
  
  Subject:
          Security ID:            NULL SID
          Account Name:           -
          Account Domain:         -
          Logon ID:               0x0
  
  Logon Type:                     3
  
  Account For Which Logon Failed:
          Security ID:            NULL SID
          Account Name:           administrator
          Account Domain:
  
  Failure Information:
          Failure Reason:         Unknown user name or bad password.
          Status:                 0xC000006D
          Sub Status:             0xC000006A
  
  Process Information:
          Caller Process ID:      0x0
          Caller Process Name:    -
  
  Network Information:
          Workstation Name:       -
          Source Network Address: 113.161.192.227
          Source Port:            59545
  
  Detailed Authentication Information:
          Logon Process:          NtLmSsp
          Authentication Package: NTLM
  BTLO_Bruteforce_Challenge.txt`

    const whois_json = `[arhoc@ArchLinux Bruteforce ]$ whois 113.161.192.227
  % [whois.apnic.net]
  % Whois data copyright terms    http://www.apnic.net/db/dbcopyright.html
  
  % Information related to '113.160.0.0 - 113.191.255.255'
  
  % Abuse contact for '113.160.0.0 - 113.191.255.255' is 'hm-changed@vnnic.vn'
  
  inetnum:        113.160.0.0 - 113.191.255.255
  netname:        VNPT-VN
  descr:          Vietnam Posts and Telecommunications Group
  descr:          No 57, Huynh Thuc Khang Street, Lang Ha ward, Dong Da district, Ha Noi City
  country:        VN
  admin-c:        PTH13-AP
  tech-c:         PTH13-AP
  remarks:        for admin contact mail to Nguyen Xuan Cuong NXC1-AP
  remarks:        for Tech contact mail to Nguyen Hien Khanh KNH1-AP
  status:         ALLOCATED PORTABLE
  mnt-by:         MAINT-VN-VNNIC
  mnt-lower:      MAINT-VN-VNPT
  mnt-routes:     MAINT-VN-VNPT
  last-modified:  2018-01-25T03:55:17Z
  mnt-irt:        IRT-VNNIC-AP
  source:         APNIC
  
  irt:            IRT-VNNIC-AP
  address:        Ha Noi, VietNam
  phone:          +84-24-35564944
  fax-no:         +84-24-37821462
  e-mail:         hm-changed@vnnic.vn
  abuse-mailbox:  hm-changed@vnnic.vn
  admin-c:        NTTT1-AP
  tech-c:         NTTT1-AP
  auth:           # Filtered
  mnt-by:         MAINT-VN-VNNIC
  last-modified:  2017-11-08T09:40:06Z
  source:         APNIC
  
  person:         Pham Tien Huy
  address:        VNPT-VN
  country:        VN
  phone:          +84-24-37741604
  e-mail:         huypt@vnpt.vn
  nic-hdl:        PTH13-AP
  mnt-by:         MAINT-VN-VNPT
  last-modified:  2017-11-19T07:06:20Z
  source:         APNIC
  
  % Information related to '113.161.192.0/19AS45899'
  
  route:          113.161.192.0/19
  descr:          VietNam Post and Telecom Corporation (VNPT)
  descr:          VNPT-AS-AP
  country:        VN
  origin:         AS45899
  remarks:        mailto: nmc.cmip@vnpt.vn
  notify:         hm-changed@vnnic.net.vn
  mnt-by:         MAINT-VN-VNPT
  last-modified:  2018-08-08T09:24:53Z
  source:         APNIC
  
  % This query was served by the APNIC Whois Service version 1.88.25 (WHOIS-US4)`

    const ports_range = `[arhoc@ArchLinux Bruteforce ]$ cat BTLO_Bruteforce_Challenge.txt | grep "Source Port" | awk "{ print \$3 }" | sort -n | head
  -
  -
  -
  -
  49162
  49170
  49177
  49184
  49192
  49194
  [arhoc@ArchLinux Bruteforce ]$ cat BTLO_Bruteforce_Challenge.txt | grep "Source Port" | awk "{ print \$3 }" | sort -n | tail
  65483
  65488
  65496
  65497
  65508
  65515
  65516
  65526
  65529
  65534
  [arhoc@ArchLinux Bruteforce ]$`



    return (
        <>

            <section className="hero is-info is-large banner">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <a className="navbar-item" href="/home">
                                    <h1 className="title has-text-light" style="font-family: 'Share Tech Mono';">FORENSE EN POTENCIA
                                    </h1>
                                </a>
                                <span className="navbar-burger" data-target="navbarMenuHeroB">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroB" className="navbar-menu">
                                <div className="navbar-end">
                                    <a className="navbar-item" href="/home">
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
                            Bruteforce: Blue Team Labs
                        </p>
                        <p className="subtitle">
                            WriteUp Detallado
                        </p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <h1 className="title has-text-light">Primeras nociones</h1>

                    <div className="content">
                        <p><span className="has-text-weight-bold">"Can you analyze logs from an attempted RDP bruteforce attack?</span>
                            One of our system administrators identified a large number of Audit Failure events in the Windows
                            Security Event log.
                            There are a number of different ways to approach the analysis of these logs! Consider the suggested
                            tools, but there are many others out there!"</p>

                        <p>Si no nos falla el inglés, habremos visto que se nos está proporcionando un registro (log) de un ataque
                            de fuerza bruta vía RDP, pero sabemos que es lo que esto significa?</p>

                        <h2 className="subtitle has-text-light">¿Qué es RDP?</h2>
                        <img src="https://i.pinimg.com/736x/b7/4e/e4/b74ee442c718ef42d990310f01475e4f.jpg"></img>
                        <p>RDP son las siglas de Remote Desktop Protocol, o Protocolo de Escritorio Remoto en español.</p>
                        <p>Es un protocolo desarrollado por Microsoft que permite a un usuario conectarse a un ordenador remoto y
                            controlarlo como si estuviera sentado frente a él.</p>
                        <p>RDP es una herramienta muy útil para tareas como la asistencia remota, la administración de sistemas y el
                            trabajo colaborativo.</p>
                        <ul>
                            <li>Un técnico de soporte utiliza RDP para conectarse a un ordenador de un cliente para solucionar un
                                problema.</li>
                            <li>Un administrador de sistemas utiliza RDP para conectarse a un servidor para realizar tareas de
                                mantenimiento.</li>
                            <li>Dos personas utilizan RDP para trabajar juntas en un proyecto.</li>
                        </ul>

                        <h2 className="subtitle has-text-light">¿Qué es un ataque de fuerza bruta?</h2>
                        <img src="https://themerkle.com/wp-content/uploads-new/2017/01/shutterstock_352183106.jpg"></img>
                        <p>Los ataques de fuerza bruta son un tipo de ataque en el que un atacante intenta adivinar la contraseña de un usuario mediante la repetición de combinaciones de caracteres hasta que encuentra la correcta. Este tipo de ataque es particularmente efectivo contra el acceso RDP, ya que los atacantes pueden automatizar el proceso de adivinación de contraseñas, similar a los ataques de diccionario, donde se usa un conjunto masivo de contraseñas comunes.</p>
                        <p>Para protegerte de este tipo de ataques, es necesario atenerte a una serie de principios:</p>
                        <ul>
                            <li><span className="has-text-weight-bold has-text-warning">Utiliza contraseñas seguras</span>: Las contraseñas seguras son aquellas que son largas, complejas y únicas. Una buena contraseña debe tener al menos 12 caracteres y combinar letras, números y símbolos.</li>
                            <li><span className="has-text-weight-bold has-text-warning">No utilices la misma contraseña para todos tus servicios</span>: Si un atacante obtiene una de tus contraseñas, podrá utilizarla para acceder a todos tus servicios si las contraseñas son las mismas.</li>
                            <li><span className="has-text-weight-bold has-text-warning">Cambia tus contraseñas con regularidad</span>: Esto ayudará a protegerte de ataques de fuerza bruta que se basan en contraseñas antiguas</li>
                            <li><span className="has-text-weight-bold has-text-warning">Evita utilizar contraseñas que se puedan adivinar fácilmente</span>: Esto incluye contraseñas que contengan tu nombre, fecha de nacimiento o información personal similar.</li>
                        </ul>

                        <p>Una vez sabido esto, ¿por qué no resolvemos el challenge?</p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <h1 className="title has-text-light">Resolución del challenge</h1>

                    <div className="content">
                        <pre><code className="language-bash">{{ first_ls }}</code></pre>

                        <p>Según vemos, el zip contenía tres archivos, así que damos un primer vistazo al contenido con 'less', para evitar cualquier carácter no deseado o no imprimible que nos arruine la terminal.</p>

                        <pre><code className="language-ruby">{{ less_txt }}</code></pre>

                        <p>Observamos la estructura general del registro, además, vemos que la dirección ip <span className="has-text-danger">113.161.192.227</span> está realizando el ataque, intentando forzar el usuario <span className="has-text-danger">administrator</span>, además, vemos que el evento del ID fué <span className="has-text-danger">4625</span>, entonces, usando expresiones regulares con la utilidad grep, y wc obtenemos cuantos ataques de fuerza bruta fueron realizados.</p>
                        <pre><code className="language-bash">[arhoc@ArchLinux Bruteforce ]$ cat BTLO_Bruteforce_Challenge.txt | grep "Unknown user" | wc -l
                            3103</code></pre>

                        <p>Haciendo una simple consulta WHOIS, nos daremos cuenta de que la dirección IP que intentó el ataque se encontraba en <span className="has-text-danger">Vietnam</span>.</p>
                        <p>Entonces, obtenemos los primeros y últimos puertos que nos muestra el registro, esto lo realizamos de manera sencilla haciendo uso de grep, awk, sort, head y tail.</p>
                        <pre><code className="language-bash">{{ ports_range }}</code></pre>

                        <p>Por lo tanto, el rango de puertos analizado se encuentra en <span className="has-text-danger">49162-65534</span>, y con esto concluímos el challenge.</p>
                    </div>
                </div>
            </section>

        </>
    )
}