import { useEffect, useState } from "react";
import "./SmartSearch.css";
import vikramLander from "utils/vikramLander.jpg";
import { smartSearch, getSmartSearchHistory } from "api/smartSearch";
import ResponseCard from "components/responseCard/ResponseCard";
const SmartSearch = () => {
  const [smartSearchQuery, setSmartSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [smartSearchResponses, setSmartSearchResponses] = useState([]);
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
      setSmartSearchResponses((prevQueryResponse) => [
        ...prevQueryResponse,
        { query: smartSearchQuery, smartSearchResponse: queryResponse },
      ]);
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
      <div className="responseBoard"><p>Smart Response!</p></div>
      {smartSearchResponses.length > 0 &&
        smartSearchResponses.map(({ query, smartSearchResponse }) => {
          return (
            <>
              <ResponseCard
                query={query}
                smartSearchResponse={smartSearchResponse}
              />
            </>
          );
        })}
      <img src={vikramLander} className="placeHolderImg"></img>
      <div className="historyBoard"><p>History has been crafted here!</p></div>
      {smartSearchHistory.map(({ query, smartSearchResponse }) => {
        return (
          <>
            <ResponseCard
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
