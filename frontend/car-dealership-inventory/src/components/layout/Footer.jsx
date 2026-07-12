function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">
          <span>🚗</span> AutoDealer Inventory
        </p>
        <p className="footer__text">
          &copy; {new Date().getFullYear()} Car Dealership Inventory System. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
