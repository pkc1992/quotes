import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

// const sortQuotes = (items, ascending) => {
//   if (ascending) return items.((a, b) => a.id - b.id);
//   else return items.sort((a, b) => b.id - a.id);
// }; Doesn't work

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  // console.log(params.toString());

  const isAscending = params.get("sort") === "asc";
  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  const changeSortingHandler = () => {
    history.push(location.pathname + "?sort=" + (isAscending ? "des" : "asc"));

    // setQuotes(sortQuotes(props.quotes, isAscending));
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
