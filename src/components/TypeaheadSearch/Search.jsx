import Autocomplete from "./Autocomplete";
import "./autocomplete.css"

const Search = () => {

  const staticData = [
    "apple",
    "banana",
    "berry",
    "orange",
    "grapes",
    "melon",
    "plum",
    "cherry",
    "mango",
    "peach",
    "guava"
  ]

  const fetchSuggestion = async(query) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    if(!response.ok) {
      throw new Error("Network Error!");
    }
    const result = await response.json();
    return result.recipes;
  };

  return(
    <div>
      <h1 style={{margin: "20px"}}>Autocomplete/Typeahead</h1>

      <Autocomplete
        placeHolder = {"Enter recipe ..."}
        // staticData = {}
        fetchSuggestion = {fetchSuggestion}
        dataKey = {"name"}
        customLoading = {<>Loading Recipes ...</>}
        onSelect = {(res) => console.log(res)}
        onChange = {(input) => {}}
        onBlur = {(e) => {}}
        onFocus = {(e) => {}}
        customStyles = {{}}
      />
    </div>
  )
}

export default Search;