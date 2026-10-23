const defaultActivities = [
  {time:"11:00",icon:"☼",title:"Våkne opp og gjøre oss klare",short:"Avslappa start på dagen! Ingen stress ♡",description:"Vi tar alt i vårt eget tempo! Kose oss med latter og prat, før vi skal ha frokost sammen",reminder:"Ingen stress i dag – vi har all tid i verden.",color:"pink",image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80"},
  {time:"12:00",icon:"🥞",title:"Frokost og FILM! (Les mer)",short:"God og deilig frokost, mens vi koser oss med en spesiell filmserie. ♡",description:"Vi skal lage oss en skikkelig god og koselig frokost, som vi så skal spise til din favoritt film!",reminder:"SHREK TIME! DU VELGER HVILKEN FILM!.",color:"peach",image:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80"},
  {time:"14:00",icon:"🎮",title:"Spill og kos med BABE!",short:"Barfender eller COD? Vi velger sammen etterpå! ♡",description:"Vi skal spille et nytt og artig spill sammen! Valgene står mellom Barfender og COD - vi bestemmer sammen.",reminder:"Æ elske dæ så ufattelig høyt. Tenk at du faktisk er min.",color:"lilac",image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80"},
  {time:"16:30–17:00",icon:"🍝",title:"Middag og serie!",short:"God middag og en episode (eller tre) av en koselig serie. ♡",description:"Nå skal vi spise middag og kose oss sammen! Vi kan se på hva enn du vil, men valgene står mellom Spillet - HIMYM - Eller noe annet gøy!.",reminder:"Det beste æ veit e å spise middag og kose med dæ. Glede mæ sånn til det blir hverdag, mitt alt du.",color:"mint",image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"},
  {time:"18:30–19:00",icon:"🕹",title:"Spill og kos ut kvelden",short:"Mer spilling, snacks og kos utover kvelden. ♡",description:"Kvelden e lang! No skal vi finn frem spillene igjen, spise snacks, og kose oss så lenge vi orke.",reminder:"Æ e verdens heldigste mann som får dele livet mitt med dæ. Den beste 'partner in crime' jeg kunne hatt!",color:"blue",image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80"},
  {time:"Når vi blir slitne",icon:"☾",title:"Senga, kos og serie",short:"Når vi begynne å bli litt sliten: rett i senga med kos og serie. ♡",description:"Når vi begynne å bli litt sliten, legg vi oss i senga med dyner, kos og en serie til vi sovner. En perfekt avslutning på en superfin dag med dæ.",reminder:"Ho æ for evig og alltid bare blir å velge ♡",color:"lilac",image:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80"}
];
const defaultSettings = {
  title:"Date Dagen!", welcome:"I dag skal vi ha en helt fantastisk dag, med masse kos, latter og kjærlighet! Æ elske dæ ♡",
  date:new Date().toLocaleDateString("en-CA"), note:"Ho som æ glede mæ til å dele hele livet med.\nÆ e verdens heldigste mann ♡",
  welcomeMessage:"Hei verdens beste kjæreste! Æ har gleda mæ sånn for dagen i dag!!! Idag skal vi kose oss masse, og ikke stresse om en eneste ting ♡",
  letter:"Jeg ville bare minne deg på hvor utrolig glad jeg er for at akkurat du er en del av livet mitt.\n\nTakk for alle de små tingene du gjør, for latteren, tryggheten og alle minnene vi allerede har laget. Jeg gleder meg til alt vi fortsatt har foran oss.\n\nI dag handler om oss. ♡"
};
const palettes = {
  pink:{bg:"linear-gradient(145deg,#ffe5ec,#ffedf0)",border:"#f8c9d7",accent:"#e85e92"},
  peach:{bg:"linear-gradient(145deg,#ffeadb,#fff0e5)",border:"#f8d4bd",accent:"#d9672c"},
  lilac:{bg:"linear-gradient(145deg,#f0e6ff,#f7edff)",border:"#e0d0f7",accent:"#8660bc"},
  mint:{bg:"linear-gradient(145deg,#e2f5ed,#edf9f3)",border:"#cce9dc",accent:"#5b9e86"},
  blue:{bg:"linear-gradient(145deg,#e4f2ff,#eff7ff)",border:"#d0e5f7",accent:"#5688c7"}
};
try { ["dateDayMemory","dateDayActivities","dateDayCompleted"].forEach(k=>localStorage.removeItem(k)); } catch {}
function readJSON(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
let activities = readJSON("dateDayActivitiesV3", JSON.parse(JSON.stringify(defaultActivities)));
let settings = {...defaultSettings, ...readJSON("dateDaySettings", {})};
const completed = new Set(readJSON("dateDayCompletedV3", []));
const grid = document.getElementById("agendaGrid");
const backdrop = document.getElementById("modalBackdrop");
const editBackdrop = document.getElementById("editBackdrop");
const letterBackdrop = document.getElementById("letterBackdrop");
let currentIndex = 0, toastTimer;

function saveActivities() { localStorage.setItem("dateDayActivitiesV3", JSON.stringify(activities)); }
function saveSettings() { localStorage.setItem("dateDaySettings", JSON.stringify(settings)); }
function applySettings() {
  document.title = `Date dag med Babe! ♡`;
  document.getElementById("heroTitle").innerHTML = `${escapeHTML(settings.title || "Date Day")}<span class="title-heart">♡</span>`;
  document.getElementById("heroCopy").textContent = settings.welcome;
  document.getElementById("heroNote").innerHTML = escapeHTML(settings.note || "").replace(/\n/g,"<br>");
  document.getElementById("welcomeHeading").textContent = `Er du klar for vår Date Dag?!`;
  document.getElementById("welcomeMessage").textContent = settings.welcomeMessage;
  document.getElementById("dateLabel").textContent = settings.date ? new Date(`${settings.date}T12:00:00`).toLocaleDateString("no-NO",{day:"numeric",month:"long",year:"numeric"}) : "Vår spesielle dag";
  document.getElementById("letterBody").textContent = settings.letter || "Et lite brev fra hjertet – bare til deg. ♡";
}
function escapeHTML(str) { return String(str).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function renderCards() {
  grid.innerHTML = "";
  activities.forEach((item,index) => {
    const palette = palettes[item.color] || palettes.pink;
    const card = document.createElement("button");
    card.type = "button"; card.className = "activity-card" + (completed.has(index) ? " completed" : "");
    card.style.setProperty("--card-bg",palette.bg); card.style.setProperty("--card-border",palette.border); card.style.setProperty("--accent",palette.accent);
    card.setAttribute("aria-label",`${item.time} ${item.title}. Åpne detaljer.`);
    card.innerHTML = `<div class="card-top"><span class="activity-icon">${escapeHTML(item.icon)}</span><span>${escapeHTML(item.time)}</span><span class="status-dot"></span></div>
      <div class="card-image" style="background-image:url('${escapeHTML(item.image)}')"></div><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.short)}</p>
      <div class="card-bottom"><span class="card-heart">${completed.has(index)?"♥":"♡"}</span><span class="arrow-circle">→</span></div>`;
    card.addEventListener("click",()=>openActivity(index)); grid.appendChild(card);
  });
  updateProgress();
}
function updateProgress() {
  const count=completed.size, percent=activities.length ? Math.round(count/activities.length*100) : 0;
  document.getElementById("progressText").textContent=`${count} av ${activities.length} aktiviteter gjennomført`;
  document.getElementById("progressPercent").textContent=`${percent}%`;
  document.getElementById("progressFill").style.width=`${percent}%`;
}
function openActivity(index) {
  currentIndex=index; const item=activities[index];
  document.getElementById("modalImage").style.backgroundImage=`url('${item.image}')`;
  document.getElementById("modalTime").textContent=`${item.icon}  ${item.time}`;
  document.getElementById("modalTitle").textContent=item.title;
  document.getElementById("modalDescription").textContent=item.description;
  document.getElementById("modalReminder").textContent=item.reminder;
  const btn=document.getElementById("completeButton"); btn.classList.toggle("done",completed.has(index));
  btn.textContent=completed.has(index)?"✓ Gjennomført – marker på nytt":"♡ Marker som gjennomført";
  backdrop.hidden=false; document.body.style.overflow="hidden"; document.getElementById("modalClose").focus();
}
function closeModal() { backdrop.hidden=true; restoreScroll(); }
function restoreScroll() { if (backdrop.hidden && editBackdrop.hidden && letterBackdrop.hidden) document.body.style.overflow=""; }
function toggleCompleted() {
  if(completed.has(currentIndex)){completed.delete(currentIndex);showToast("Aktiviteten ble fjernet fra gjennomført-listen ♡");}
  else {completed.add(currentIndex);showToast("Hurra! Enda et fint øyeblikk i boks ♡");}
  localStorage.setItem("dateDayCompletedV3",JSON.stringify([...completed])); renderCards(); openActivity(currentIndex);
}
function showToast(message) {
  const toast=document.getElementById("toast"); toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}
function openEditor(tab="day", activityIndex=currentIndex) {
  closeModal(); editBackdrop.hidden=false; document.body.style.overflow="hidden";
  document.querySelectorAll(".editor-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
  document.getElementById("dayEditor").hidden=tab!=="day"; document.getElementById("activitiesEditor").hidden=tab!=="activities";
  fillSettingsForm(); fillActivitySelector(activityIndex); document.getElementById("editorTitle").textContent=tab==="activities"?"Rediger agenda":"Tilpass Date Day";
}
function closeEditor() { editBackdrop.hidden=true; restoreScroll(); }
function fillSettingsForm() {
  document.getElementById("settingTitle").value=settings.title;
  document.getElementById("settingWelcome").value=settings.welcome;
  document.getElementById("settingDate").value=settings.date || "";
  document.getElementById("settingNote").value=settings.note;
  document.getElementById("settingWelcomeMessage").value=settings.welcomeMessage;
  document.getElementById("settingLetter").value=settings.letter;
}
function fillActivitySelector(index=0) {
  const select=document.getElementById("activitySelector");
  select.innerHTML=activities.map((a,i)=>`<option value="${i}">${escapeHTML(a.time)} – ${escapeHTML(a.title)}</option>`).join("");
  select.value=String(index); loadActivityForm(Number(select.value));
}
function loadActivityForm(index) {
  const a=activities[index]; if(!a)return;
  document.getElementById("activityTimeInput").value=a.time;
  document.getElementById("activityTitleInput").value=a.title;
  document.getElementById("activityShortInput").value=a.short;
  document.getElementById("activityDescriptionInput").value=a.description;
  document.getElementById("activityReminderInput").value=a.reminder;
  document.getElementById("activityImageInput").value=a.image;
}
function saveActivityForm() {
  const index=Number(document.getElementById("activitySelector").value), old=activities[index]; if(!old)return;
  const image=document.getElementById("activityImageInput").value.trim();
  activities[index]={...old,time:document.getElementById("activityTimeInput").value.trim()||old.time,title:document.getElementById("activityTitleInput").value.trim()||old.title,
    short:document.getElementById("activityShortInput").value.trim(),description:document.getElementById("activityDescriptionInput").value.trim(),reminder:document.getElementById("activityReminderInput").value.trim(),image:image||old.image};
  saveActivities(); renderCards(); fillActivitySelector(index); showToast("Aktiviteten er oppdatert ♡");
}
function saveDaySettings() {
  settings.title=document.getElementById("settingTitle").value.trim()||"Date Day";
  settings.welcome=document.getElementById("settingWelcome").value.trim();
  settings.date=document.getElementById("settingDate").value;
  settings.note=document.getElementById("settingNote").value.trim();
  settings.welcomeMessage=document.getElementById("settingWelcomeMessage").value.trim();
  settings.letter=document.getElementById("settingLetter").value.trim();
  saveSettings(); applySettings(); showToast("Deres Date Day er oppdatert ♡"); closeEditor();
}
function openLetter() {
  document.getElementById("letterBody").textContent=settings.letter || "Et lite brev fra hjertet – bare til deg. ♡";
  letterBackdrop.hidden=false; document.body.style.overflow="hidden";
}
function closeLetter() { letterBackdrop.hidden=true; restoreScroll(); }

document.getElementById("modalClose").addEventListener("click",closeModal);
backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal();});
document.getElementById("completeButton").addEventListener("click",toggleCompleted);
document.getElementById("nextButton").addEventListener("click",()=>openActivity((currentIndex+1)%activities.length));
document.getElementById("editThisActivity").addEventListener("click",()=>openEditor("activities",currentIndex));
document.getElementById("editOpenTop").addEventListener("click",()=>openEditor("day"));
document.getElementById("editOpenHero").addEventListener("click",()=>openEditor("day"));
document.getElementById("editOpenAgenda").addEventListener("click",()=>openEditor("activities"));
document.getElementById("editClose").addEventListener("click",closeEditor);
editBackdrop.addEventListener("click",e=>{if(e.target===editBackdrop)closeEditor();});
document.getElementById("saveSettings").addEventListener("click",saveDaySettings);
document.getElementById("saveActivityEdit").addEventListener("click",saveActivityForm);
document.getElementById("activitySelector").addEventListener("change",e=>loadActivityForm(Number(e.target.value)));
document.querySelectorAll(".editor-tab").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".editor-tab").forEach(b=>b.classList.toggle("active",b===button));
  const day=button.dataset.tab==="day"; document.getElementById("dayEditor").hidden=!day; document.getElementById("activitiesEditor").hidden=day;
  document.getElementById("editorTitle").textContent=day?"Tilpass Date Day":"Rediger agenda";
}));
document.getElementById("resetSettings").addEventListener("click",()=>{
  if(!confirm("Vil du tilbakestille teksten, datoen og alle aktivitetene til standard? Dette fjerner også avkrysningene."))return;
  settings={...defaultSettings}; activities=JSON.parse(JSON.stringify(defaultActivities)); completed.clear();
  ["dateDaySettings","dateDayActivitiesV3","dateDayCompletedV3","dateDayMemory","dateDayActivities","dateDayCompleted"].forEach(k=>localStorage.removeItem(k));
  applySettings(); renderCards(); fillSettingsForm(); fillActivitySelector(0); showToast("Standardinnstillingene er gjenopprettet ♡");
});
document.getElementById("startDay").addEventListener("click",()=>{
  const intro=document.getElementById("intro");
  document.body.classList.remove("intro-active");
  window.scrollTo(0,0);
  intro.classList.add("leaving");
  setTimeout(()=>{intro.hidden=true;},650);
  showToast("Da starter eventyret deres ♡");
});
document.getElementById("letterClose").addEventListener("click",closeLetter);
document.getElementById("letterDone").addEventListener("click",closeLetter);
letterBackdrop.addEventListener("click",e=>{if(e.target===letterBackdrop)closeLetter();});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(!backdrop.hidden)closeModal();if(!editBackdrop.hidden)closeEditor();if(!letterBackdrop.hidden)closeLetter();}
  if(e.ctrlKey&&e.key==="Enter"&&!editBackdrop.hidden)saveDaySettings();
});
// The love-note area opens the personalized letter when tapped/clicked.
document.querySelector(".love-note").style.cursor="pointer";
document.querySelector(".love-note").setAttribute("role","button");
document.querySelector(".love-note").setAttribute("tabindex","0");
document.querySelector(".love-note").setAttribute("aria-label","Åpne et hemmelig kjærlighetsbrev");
document.querySelector(".love-note").addEventListener("click",openLetter);
document.querySelector(".love-note").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLetter();}});
document.querySelectorAll(".nav-link").forEach(link=>link.addEventListener("click",()=>{
  document.querySelectorAll(".nav-link").forEach(other=>other.classList.remove("active"));link.classList.add("active");
}));
applySettings(); renderCards();
