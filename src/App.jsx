import Result from "./Components/Result";
import axios from "axios";
import { useState, useEffect } from "react";

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const MOVIES_PER_PAGE = 30;

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };

  const getMovies = (page = 1) => {
    const url = search === "" ? `${APIURL}&page=${page}` : `${SEARCHAPI}${search}&page=${page}`;
    axios.get(url)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(Math.ceil(response.data.total_results / MOVIES_PER_PAGE));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    getMovies(currentPage);
  }, [search, currentPage]);

  return (
    <div className="max-w-full mx-auto p-7 bg-black text-white min-h-screen">
      <div className="flex justify-center mb-6">
        <input
          type="search"
          value={search}
          onChange={changeTheSearch}
          placeholder="Search for a movie..."
          className="w-full max-w-lg border border-gray-700 rounded-lg p-4 text-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
      {movies.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-2xl font-semibold text-gray-500 animate-pulse">Loading...</div>
        </div>
      ) : (
        <>
          <Result movies={movies} />
          <div className="flex justify-between mt-6 text-gray-300">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'}`}
            >
              Previous
            </button>
            <span className="text-lg">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
