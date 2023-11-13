// Write your code here
import './index.css'

const renderSuccessView = props => {
  const {details} = props
  const {avatarUrl, name, id, startsCount, issuesCount, forksCount} = details
  return (
    <li className="item-cont">
      <img src={avatarUrl} alt={name} className="item-image" />
      <h1 className="item-head">{name}</h1>
      <div className="count-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo"
        />
        <p>{startsCount} stars</p>
      </div>
      <div className="count-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="count-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open"
          className="logo"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default renderSuccessView
