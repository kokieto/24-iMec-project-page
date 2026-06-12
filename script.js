const samplesRoot = document.querySelector("#samples");
const colorbarImage = document.querySelector("#colorbarImage");
const colorbarCaption = document.querySelector("#colorbarCaption");
const attributionRows = document.querySelector("#attributionRows");
const dataUrl = "assets/data/project-data.json?v=20260610-project-labels-robots";

function fmtScore(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "N/A";
}

function trackNode(track) {
  const item = document.createElement("div");
  item.className = "track";
  const status =
    typeof track.correct === "boolean"
      ? `<span class="track__status ${track.correct ? "is-correct" : "is-wrong"}">${
          track.correct ? "Correct" : "Wrong"
        }</span>`
      : "";
  const prediction = track.prediction
    ? `<span class="track__prediction">Prediction Top-3: ${track.prediction}</span>`
    : "";
  const scores =
    typeof track.cap_score === "number" || typeof track.saj_score === "number"
      ? `<span class="track__score">CLAP Score↑: ${fmtScore(track.cap_score)} | SAJ Score↑: ${fmtScore(track.saj_score)}</span>`
      : "";
  item.innerHTML = `
    <img class="spectrogram" src="${track.spectrogram}" alt="${track.label} spectrogram" loading="lazy" />
    <div class="track__head">
      <span class="track__label">${track.label}</span>
      ${status}
    </div>
    ${prediction}
    ${scores}
    <audio controls preload="none" src="${track.audio}"></audio>
  `;
  return item;
}

function sampleNode(sample, index) {
  const section = document.createElement("article");
  section.className = "sample";

  const refs = sample.reference_tracks.map(trackNode);
  const methods = sample.method_tracks.map(trackNode);

  const refGrid = document.createElement("div");
  refGrid.className = "tracks tracks--references";
  refGrid.replaceChildren(...refs);

  const methodGrid = document.createElement("div");
  methodGrid.className = "tracks tracks--methods";
  methodGrid.replaceChildren(...methods);

  section.innerHTML = `
    <header class="sample__head">
      <h2>${String(index + 1).padStart(2, "0")}. ${sample.class}</h2>
      <div class="sample__meta">
        <span class="pill">Robot: ${sample.robot}</span>
        <span class="pill">SNR: ${sample.snr_db} dB</span>
        <span class="pill">Ground Truth: ${sample.ground_truth || sample.class}</span>
      </div>
    </header>
    <h3>References</h3>
  `;
  section.append(refGrid);
  section.insertAdjacentHTML("beforeend", "<h3>Methods</h3>");
  section.append(methodGrid);
  return section;
}

function projectPageSectionNode(section) {
  const wrapper = document.createElement("section");
  wrapper.className = "project-page-section";
  const title = document.createElement("h2");
  title.textContent = section.title;
  wrapper.append(title, ...section.samples.map(sampleNode));
  return wrapper;
}

function attributionNode(item) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.sample}</td>
    <td>${item.category}</td>
    <td>${item.dataset}</td>
    <td>${item.license}</td>
  `;
  return row;
}

fetch(dataUrl)
  .then(response => response.json())
  .then(data => {
    colorbarImage.src = data.spectrogram.colorbar;
    colorbarCaption.textContent = `${data.spectrogram.db_min} to ${data.spectrogram.db_max} dBFS`;
    const sections = data.sections || [{ title: "Audio Examples", samples: data.samples || [] }];
    samplesRoot.replaceChildren(...sections.map(projectPageSectionNode));
    attributionRows.replaceChildren(...(data.attributions || []).map(attributionNode));
  });
