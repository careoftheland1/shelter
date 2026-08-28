function SiteFooter() {
  return <footer className="site-footer" id="about">
    <a className="wordmark" href="/">Shelter on the Land</a>
    <p className="footer-bio">Shelter on the Land is a small independent studio designing small independent structures and simple spaces in care of the land, and those building on it.</p>
    <nav className="footer-directory" aria-label="Site directory">
      <a href="/#shelters"><span>Plans</span><b>↗</b></a>
      <a href="/school/"><span>School</span><b>↗</b></a>
      <a href="/tools/"><span>Tools</span><b>↗</b></a>
      <a href="/packages/"><span>Support</span><b>↗</b></a>
    </nav>
    <a className="footer-email" href="mailto:build@onthe.land">build@onthe.land</a>
    <p className="footer-copy">© 2026 Shelter on the Land</p>
  </footer>;
}

export default SiteFooter;
