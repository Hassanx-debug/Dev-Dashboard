import { useState, useEffect } from "react";

const CACHE_KEY = "github_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const REQUEST_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;

function getCachedData(username) {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${username}`);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(`${CACHE_KEY}_${username}`);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCachedData(username, data) {
  try {
    localStorage.setItem(
      `${CACHE_KEY}_${username}`,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // Storage full or unavailable
  }
}

async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export function useGitHub(username) {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async (retries = MAX_RETRIES) => {
      // Check cache first
      const cached = getCachedData(username);
      if (cached) {
        setUser(cached.user);
        setRepos(cached.repos);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [userRes, reposRes] = await Promise.all([
          fetchWithTimeout(`https://api.github.com/users/${username}`, REQUEST_TIMEOUT),
          fetchWithTimeout(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
            REQUEST_TIMEOUT
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        const filteredRepos = reposData.filter((r) => !r.fork);

        setUser(userData);
        setRepos(filteredRepos);

        // Cache the results
        setCachedData(username, { user: userData, repos: filteredRepos });
      } catch (err) {
        // Retry on failure
        if (retries > 0 && err.name !== "AbortError") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return fetchData(retries - 1);
        }
        setError(err.message || "Failed to fetch GitHub data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { repos, user, loading, error };
}
