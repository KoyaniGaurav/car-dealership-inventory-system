function PageHeader({ title, subtitle, action, badge }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {(badge || action) && (
        <div className="page-header__aside">
          {badge && <span className="page-header__count">{badge}</span>}
          {action}
        </div>
      )}
    </div>
  )
}

export default PageHeader
