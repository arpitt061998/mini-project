import { useEffect, useState,useCallback } from "react"
import SuggestionList from "./SuggestionList";
import useDebounce from "./hooks/useDebounce";

const Autocomplete = ({
  staticData, 
  fetchSuggestion,
  placeHolder,
  customLoading = "loading ...",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = () => {},
  dataKey = ""
}) => {

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isProgrammaticChange, setIsProgrammaticChange] = useState(false);

  const handleInputChange = (event) => {
    setIsProgrammaticChange(false);
    setInputValue(event.target.value);
    onChange(event.target.value)
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey? suggestion[dataKey]: dataKey);
    onSelect(suggestion);
    setSuggestions([]);
    setLoading(false);
    setIsProgrammaticChange(true);
    setActiveSuggestionIndex(-1);
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    } else if (event.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) => (prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1));
    }
  };

  const getSuggestion = async(query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if(staticData){
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase())
        })
      }
      else if(fetchSuggestion) {
        result = await fetchSuggestion(query);
      }
      setSuggestions(result);
    } catch(err) {
      setError("failed to get suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  //used useCallback so that my function is not created on every single render
  // const getSuggestionDebounced = useCallback(debounce(getSuggestion, 300),[]); (if loadash used)

  const getSuggestionDebounced = useDebounce(getSuggestion, 300);

  useEffect(()=> {
    if (!isProgrammaticChange) {
      if(inputValue.length > 1){
        getSuggestionDebounced(inputValue);
      } else {
        setSuggestions([])
      }
    }
  },[inputValue])

  return(
    <div className="container">
      <input
        type = "text"
        value = {inputValue}
        placeholder= {placeHolder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        style = {customStyles}
        onKeyUp={handleKeyUp}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            activeSuggestionIndex={activeSuggestionIndex}
          />
        </ul>
      )}
    </div>
  )
}

export default Autocomplete;