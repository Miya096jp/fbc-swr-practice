import useSWR from "swr";
import "./App.css";

const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("Failed to load");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function App() {
  const url = "https://httpstat.us/404";
  const headers = { Accept: "application/json" };
  const { data, error, isLoading } = useSWR(
    [url, { headers }],
    ([url, headers]) => fetcher(url, headers)
  );

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return <p>Status : {data.description}</p>;
}

export default App;
