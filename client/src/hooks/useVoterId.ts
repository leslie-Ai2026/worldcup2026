const VOTER_ID_KEY = "wc2026_voter_id";

function generateId(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Returns a stable anonymous voter ID, persisted in localStorage.
 * Initialised synchronously so the first render already has a non-empty value,
 * which prevents the tRPC "voterId too_small" validation error.
 */
function getOrCreateVoterId(): string {
  try {
    let id = localStorage.getItem(VOTER_ID_KEY);
    if (!id || id.length === 0) {
      id = generateId();
      localStorage.setItem(VOTER_ID_KEY, id);
    }
    return id;
  } catch {
    // localStorage unavailable (e.g. SSR / private browsing edge case)
    return generateId();
  }
}

// Singleton — computed once per page load, stable across re-renders
let _cachedVoterId: string | null = null;

export function useVoterId(): string {
  if (!_cachedVoterId) {
    _cachedVoterId = getOrCreateVoterId();
  }
  return _cachedVoterId;
}
