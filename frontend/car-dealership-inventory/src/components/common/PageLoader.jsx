import Loader from './Loader'

function PageLoader({ label = 'Loading...' }) {
  return (
    <div className="page-loader">
      <Loader label={label} />
    </div>
  )
}

export default PageLoader
