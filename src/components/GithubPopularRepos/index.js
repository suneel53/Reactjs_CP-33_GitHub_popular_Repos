import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const typeView = {
  initail: 'Initial',
  loading: 'Loading',
  success: 'Success',
  fail: 'Fail',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    selectedLanguage: 'ALL',
    view: typeView.initail,
    list: [],
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    this.setState({view: typeView.loading})
    const {selectedLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        startsCount: each.stars_count,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        avatarUrl: each.avatar_url,
      }))
      console.log(updatedData)
      this.setState({view: typeView.success, list: updatedData})
    } else {
      this.setState({view: typeView.fail})
    }
  }

  changeLanguage = id => {
    this.setState({selectedLanguage: id}, this.getItems)
  }

  renderloadingView = () => {
    console.log('loading-view')
    return (
      <div data-testid="loader" className="loading-cont">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderFailureView = () => {
    console.log('fail')
    return (
      <div className="fail-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="fail-image"
        />
        <h1>Something Went Wrong</h1>
      </div>
    )
  }

  renderheaderSection = () => {
    const {selectedLanguage} = this.state
    return (
      <ul className="header-list-cont">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            changeLanguage={this.changeLanguage}
            details={each}
            isSelected={each.id === selectedLanguage}
          />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    console.log('success')
    const {list} = this.state
    return (
      <ul className="success-view">
        {list.map(each => (
          <RepositoryItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  getItemsView = () => {
    const {view} = this.state
    console.log('view')

    switch (view) {
      case typeView.loading:
        return this.renderloadingView()
      case typeView.fail:
        return this.renderFailureView()
      case typeView.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {selectedLanguage} = this.state
    console.log(selectedLanguage)
    return (
      <div className="main-cont">
        <h1 className="main-head">Popular</h1>
        {this.renderheaderSection()}
        {this.getItemsView()}
      </div>
    )
  }
}

export default GithubPopularRepos
