chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: "gather-save-page", title: "Save page to Gather queue", contexts: ["page"] });
  chrome.contextMenus.create({ id: "gather-save-link", title: "Save link to Gather queue", contexts: ["link"] });
});
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const url = info.linkUrl || info.pageUrl || tab?.url;
  if (!url) return; try { if (!["http:", "https:"].includes(new URL(url).protocol)) return; } catch { return; }
  const title = info.linkUrl ? info.linkUrl : (tab?.title || url);
  const data = await chrome.storage.local.get({ queue: [] });
  data.queue.unshift({ url, title, created: new Date().toISOString() });
  await chrome.storage.local.set({ queue: data.queue.slice(0, 1000) });
});