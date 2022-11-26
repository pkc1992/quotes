import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import NoQuotesFound from "./components/quotes/NoQuotesFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AddQuote from "./pages/AddQuote";
import Highlight from "./pages/Highlight";
import Quotes from "./pages/Quotes";

const NewQuote = React.lazy(() => import("./pages/AddQuote"));
const QuoteDetail = React.lazy(() => import("./pages/Highlight"));
const AllQuotes = React.lazy(() => import("./pages/Quotes"));
const NotFound = React.lazy(() => import("./components/quotes/NoQuotesFound"));

function App() {
  // const [quotes, setQuotes] = useState(data);
  // const findQuote = (id) => quotes.find((quote) => quote.id === id);

  // const addQuoteHandler = (quote) => {
  //   setQuotes((prev) => [...prev, { id: `q${prev.length + 1}`, ...quote }]);
  // };

  return (
    <div>
      <MainNavigation />
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              {/* <Quotes /> */}
              <AllQuotes />
            </Route>
            <Route path="/quotes/:qId">
              {/* <Highlight /> */}
              <QuoteDetail />
            </Route>
            <Route>
              {/* <AddQuote onAddQuote={addQuoteHandler} /> */}
              <NewQuote />
            </Route>
            <Route path="*">
              {/* <NoQuotesFound /> */}
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
