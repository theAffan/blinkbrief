let youtubeSubmitBtn = document.getElementById("youtube-submit-btn");
let textSubmitBtn = document.getElementById("text-submit-btn");
let newsSubmitBtn = document.getElementById("news-submit-btn");
let wikiSubmitBtn = document.getElementById("wiki-submit-btn");

const BASE_URL = "http://127.0.0.1:8000/api/summarizer/";


const makeRequest = async function(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    })
}


youtubeSubmitBtn.onclick = async function() {
    const link = document.getElementById("youtube-link-input").value
    const percentage = document.getElementById("youtube-percentage-input").value
    const spinner = document.getElementById("youtube-spinner")

    spinner.classList.remove('d-none');
    youtubeSubmitBtn.disabled = true;

    data = {
        'link': link,
        'percentage': parseInt(percentage),
    }

    url = BASE_URL + "summarize-youtube"
    let resultArea = document.getElementById('youtubeSummaryTextarea');
    let result = await makeRequest(url, data);
    resultArea.innerHTML = result["summary"];

    spinner.classList.add('d-none');
    youtubeSubmitBtn.disabled = false;
}

textSubmitBtn.onclick = async function() {
    const link = document.getElementById("text-input").value
    const percentage = document.getElementById("text-percentage-input").value
    const spinner = document.getElementById("text-spinner")

    spinner.classList.remove('d-none');
    textSubmitBtn.disabled = true;

    data = {
        'text': link,
        'percentage': parseInt(percentage),
    }

    url = BASE_URL + "summarize-text"
    let resultArea = document.getElementById('textSummaryTextarea');
    let result = await makeRequest(url, data);
    resultArea.innerHTML = result["summary"];

    spinner.classList.add('d-none');
    textSubmitBtn.disabled = false;
}

newsSubmitBtn.onclick = async function() {
    const link = document.getElementById("news-link-input").value
    const spinner = document.getElementById("news-spinner")

    spinner.classList.remove('d-none');
    newsSubmitBtn.disabled = true;

    data = {
        'link': link
    }

    url = BASE_URL + "summarize-news-articles"
    let resultArea = document.getElementById('newsArticleSummaryTextarea');
    let result = await makeRequest(url, data);
    resultArea.innerHTML = result["summary"];

    spinner.classList.add('d-none');
    newsSubmitBtn.disabled = false;
}

wikiSubmitBtn.onclick = async function() {
    const query = document.getElementById("wiki-input").value
    const spinner = document.getElementById("wiki-spinner")

    spinner.classList.remove('d-none');
    wikiSubmitBtn.disabled = true;

    data = {
        'query': query
    }

    url = BASE_URL + "summarize-wikipedia"
    let resultArea = document.getElementById('wikipediaSummaryTextarea');
    let result = await makeRequest(url, data);
    resultArea.innerHTML = result["summary"];

    spinner.classList.add('d-none');
    wikiSubmitBtn.disabled = false;
}
