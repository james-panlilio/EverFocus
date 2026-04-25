const USER_ID_STORAGE_KEY = "sst-user-id";

export function getUserId() {
  try {
    const savedUserId = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (savedUserId) {
      return savedUserId;
    }

    const nextUserId = crypto.randomUUID();
    localStorage.setItem(USER_ID_STORAGE_KEY, nextUserId);
    return nextUserId;
  } catch {
    return "local-user";
  }
}
