// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, changeLanguage, isSelected} = props
  const {id, language} = details
  onselect = () => {
    changeLanguage(id)
  }
  const cname = isSelected ? 'selected-but' : 'non-selected'
  return (
    <li>
      <button
        type="button"
        onClick={onselect}
        className={`header-cont ${cname}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
