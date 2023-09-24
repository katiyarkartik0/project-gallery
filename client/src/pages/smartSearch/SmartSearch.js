import { useEffect, useState } from "react";
import "./SmartSearch.css";
import vikramLander from "utils/vikramLander.jpg";
import { smartSearch, getSmartSearchHistory } from "api/smartSearch";
import Card from "components/card/Card";
import HistoryCard from "components/historyCard/HistoryCard";
const SmartSearch = () => {
  const [smartSearchQuery, setSmartSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [smartSearchResponse, setSmartSearchResponse] = useState([]);
  const [smartSearchHistory, setSmartSearchHistory] = useState([]);

  useEffect(() => {
    try {
      const fetchSmartSearchHistory = async () => {
        const response = await getSmartSearchHistory({ accessToken: "" });
        const { history } = await response.json();
        setSmartSearchHistory(history);
        return history;
      };
      fetchSmartSearchHistory();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSmartSearch = (e) => setSmartSearchQuery(e.target.value);
  const handleSmartSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await smartSearch({
        accessToken: "",
        query: smartSearchQuery,
      });
      const { queryResponse } = await response.json();
      setSmartSearchResponse(queryResponse);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="smartSearchPage">
      <form className="search-box" onSubmit={handleSmartSearchSubmit}>
        <input
          type="text"
          placeholder="find me projects where ReactJS is used in front-end, and Python is used in backend..."
          className="search-input"
          value={smartSearchQuery}
          onChange={handleSmartSearch}
        ></input>
        <button type="submit" className="search-button">
          Smart Search
        </button>
      </form>
      <img src={vikramLander} className="placeHolderImg"></img>
      {smartSearchHistory.map(({ query, smartSearchResponse }) => {
        // debugger
        return (
          <>
            <HistoryCard
              query={query}
              smartSearchResponse={smartSearchResponse}
            />
          </>
        );
      })}
    </div>
  );
};

export default SmartSearch;
