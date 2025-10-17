// Simple client-side search + detail + per-substance chat saved in localStorage
// Put this file in the same folder as index.html and style.css

// --- sample data (add more items here) ---
const SUBSTANCES = [
  { id: "tianeptine", name: "Tianeptine (gas-station heroin)", short: "An atypical antidepressant; high-dose misuse has opioid-like effects and serious risks.", category: "Other" },
  { id: "cbd", name: "CBD (Cannabidiol)", short: "Non-intoxicating cannabinoid commonly used for wellness; interacts with some meds.", category: "Cannabinoid" },
  { id: "acetaminophen", name: "Acetaminophen (Paracetamol)", short: "Common OTC pain reliever; overdose causes severe liver damage.", category: "OTC" },
  { id: "nicotine", name: "Nicotine", short: "Highly addictive stimulant found in tobacco and many vapes.", category: "Stimulant" },
  { id: "mdma", name: "MDMA (Ecstasy)", short: "Empathogenic drug with risks including overheating, hyponatremia, and adulterants.", category: "Psychedelics/Stimulant" }
];

// DOM elements
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsEl = document.getElementById("results");
const detailPanel = document.getElementById("detailPanel");

// Render initial suggestions (top items)
function renderResults(list){
  resultsEl.innerHTML = "";
  if(!list || list.length === 0){
    resultsEl.innerHTML = `<p style="color:#9bb0c2">No matches. Try different keywords.</p>`;
    return;
  }
  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${escapeHtml(item.name)}</h3>
      <div class="meta">${escapeHtml(item.category)}</div>
      <p>${escapeHtml(item.short)}</p>
      <div class="actions">
        <button class="btn view" data-id="${item.id}">View</button>
        <button class="btn chat" data-id="${item.id}">Chat</button>
      </div>
    `;
    resultsEl.appendChild(card);
  });
}

// Basic search: name, short, category
function doSearch(q){
  q = (q || "").trim().toLowerCase();
  if(!q) {
    // show featured
    renderResults(SUBSTANCES);
    return;
  }
  const out = SUBSTANCES.filter(s => {
    return s.name.toLowerCase().includes(q) ||
           s.short.toLowerCase().includes(q) ||
           s.category.toLowerCase().includes(q) ||
           s.id.toLowerCase().includes(q);
  });
  renderResults(out);
}

// Show detail + chat area
function showDetail(id){
  const sub = SUBSTANCES.find(s => s.id === id);
  if(!sub) return;
  detailPanel.classList.remove("hidden");
  detailPanel.innerHTML = `
    <h2>${escapeHtml(sub.name)}</h2>
    <p style="color:#cfeff6">${escapeHtml(sub.short)}</p>
    <h3 style="color:#aef6ff">Quick facts</h3>
    <ul>
      <li>Category: ${escapeHtml(sub.category)}</li>
      <li>ID: ${escapeHtml(sub.id)}</li>
    </ul>

    <div class="chat">
      <h4 style="margin:8px 0 10px;color:#aef6ff">Chat about ${escapeHtml(sub.name)}</h4>
      <div class="messages" id="messages-${sub.id}"></div>
      <div class="input-row">
        <input id="chatInput-${sub.id}" placeholder="Share a question or observation (be respectful)..." />
        <button class="sendBtn" data-id="${sub.id}">Send</button>
      </div>
      <p style="font-size:12px;color:#9bb0c2;margin-top:8px">Local chat only (stored in your browser). This is for community notes — not medical advice.</p>
    </div>
  `;

  // load messages
  renderMessages(sub.id);

  // attach send handler
  const sendBtn = detailPanel.querySelector(`.sendBtn[data-id="${sub.id}"]`);
  sendBtn.onclick = () => {
    const input = document.getElementById(`chatInput-${sub.id}`);
    const text = input.value.trim();
    if(!text) return;
    addMessage(sub.id, text);
    input.value = "";
    renderMessages(sub.id);
  }
}

// Local chat storage helpers
function storageKey(subId){ return `compoundly_chat_${subId}`; }
function getMessages(subId){
  try {
    const raw = localStorage.getItem(storageKey(subId));
    if(!raw) return [];
    return JSON.parse(raw);
  } catch(e){ return []; }
}
function addMessage(subId, text){
  const arr = getMessages(subId);
  arr.push({ text, time: Date.now() });
  localStorage.setItem(storageKey(subId), JSON.stringify(arr));
}
function renderMessages(subId){
  const el = document.getElementById(`messages-${subId}`);
  if(!el) return;
  el.innerHTML = "";
  const msgs = getMessages(subId);
  if(msgs.length === 0){ el.innerHTML = `<div style="color:#9bb0c2">No messages yet — be the first to ask something useful.</div>`; return; }
  msgs.forEach(m => {
    const div = document.createElement("div");
    div.className = "message";
    const time = new Date(m.time).toLocaleString();
    div.innerHTML = `<div style="font-size:12px;color:#9bb0c2;margin-bottom:6px">${escapeHtml(time)}</div>${escapeHtml(m.text)}`;
    el.appendChild(div);
  });
  el.scrollTop = el.scrollHeight;
}

// small html escaper
function escapeHtml(str){
  return (""+str).replace(/[&<>"']/g, (m) => {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });
}

// event wiring
searchBtn.addEventListener("click", ()=> doSearch(input.value));
input.addEventListener("keydown", (e)=> { if(e.key === "Enter") doSearch(input.value); });

resultsEl.addEventListener("click", (evt)=> {
  const v = evt.target.closest("button");
  if(!v) return;
  const id = v.dataset.id;
  if(v.classList.contains("view")){
    showDetail(id);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  } else if(v.classList.contains("chat")){
    showDetail(id);
    // focus chat input after rendering
    setTimeout(()=> {
      const inputBox = document.getElementById(`chatInput-${id}`);
      if(inputBox) inputBox.focus();
    }, 150);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// initial render
doSearch(""); // shows featured
