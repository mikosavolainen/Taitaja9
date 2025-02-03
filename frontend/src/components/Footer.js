import { useState } from 'react'
import '../styles/Footer.css'
function Footer() {


  return (
    <footer>
      <div className="links">
        <li><a href='https://taitaja2024.fi/fi/tietoa-sivustosta/'>Tietoa sivustosta</a></li>
        <li><a href='https://taitaja2024.fi/fi/tietosuojakaytanto/'>Tietosuojakäytäntö</a></li>
        <li><a href='https://taitaja2024.fi/fi/saavutettavuusseloste/'>Saavutettavuusseloste</a></li>
        <li><a href='https://taitaja2024.fi/fi/lajivastaaville/'>Lajivastaaville</a></li>
      </div>
      <div className="copyright">
        <p>© Salpaus 2025</p>
      </div>
    </footer>
  )
}

export default Footer
