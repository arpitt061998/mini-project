const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick = () => {},
  activeSuggestionIndex
}) => {

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={`suggestion-item ${index === activeSuggestionIndex ? 'active' : ''}`}
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
