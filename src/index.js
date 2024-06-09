import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getBackendHost } from './config/hostConfig';

const httpLink = createHttpLink({
  uri: getBackendHost,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = sessionStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  addTypename: false
});

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache()
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// ReactDOM.render(
//   <BrowserRouter>
  
    
//     <React.StrictMode>
//       {/* <Button1 /> */}
//       {/* <Sidebar/> */}
//       {/* <Main/> */}
//       <App/>
//     </React.StrictMode>
//   </BrowserRouter>,
//   document.getElementById('root')
// );
