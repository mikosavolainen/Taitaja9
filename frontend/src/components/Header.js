import { useState } from 'react'
import '../styles/Header.css'
function Header({token,logout}) {
  if (token === null || token === "") {
    return (
      <header>
        <h1 class="logo">TAITAJA TIETOTESTI</h1>
        <a class="link" href='/#/login'>Kirjaudu sisään</a>
      </header>
    )

  } else {
    return (
      <header>
        <h1 class="logo">TAITAJA TIETOTESTI</h1>
        <a class="link" onClick={logout} href='/'>Kirjaudu ulos</a>
      </header>
    )
  }
}

export default Header
