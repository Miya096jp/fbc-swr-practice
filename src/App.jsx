import useSWR from "swr";
import "./App.css";

const fetcher = async ([url, headers]) => {
  const res = await fetch(url, headers);

  if (!res.ok) {
    const error = new Error("Failed to load");
    throw error;
  }
  return res.json();
};


function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const headers = { Accept: "application/json" };
  const { data, error, isLoading } = useSWR([url, { headers }], fetcher);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return <p>Status : {data.description}</p>;
}

export default App;
