const upBtn = document.getElementById('up');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        upBtn.classList.add('show');
    } else {
        upBtn.classList.remove('show');
    }
});

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsBox = document.getElementById('search-results');

let allWords = new Set();

document.querySelectorAll('.block, .main-item').forEach(block => {
    const words = block.innerText
        .replace(/[.,“”"]/g, "")
        .toLowerCase()
        .split(/\s+/);

    words.forEach(word => {
        if (word.length > 2) {
            allWords.add(word);
        }
    });
});

searchBtn.addEventListener('click', search);

function search(queryParam) {
    const query = (queryParam || searchInput.value).toLowerCase().trim();
    resultsBox.innerHTML = "";

    if (!query) return;

    const blocks = document.querySelectorAll('.block, .main-item');
    let found = false;

    blocks.forEach(block => {
        const text = block.innerText.toLowerCase();

        if (text.includes(query)) {
            found = true;

            const item = document.createElement('div');
            item.classList.add('search-result-item');

            item.textContent = block.querySelector('h1, .title-main')?.innerText || "Section";

            item.addEventListener('click', () => {
                block.scrollIntoView({ behavior: 'smooth' });
                resultsBox.style.display = 'none';
            });

            resultsBox.appendChild(item);
        }
    });

    if (!found) {
        resultsBox.innerHTML = `<div class="no-results">Nothing found</div>`;
    }

    resultsBox.style.display = 'block';
}

searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase().trim();
    resultsBox.innerHTML = "";

    if (!value) {
        resultsBox.style.display = 'none';
        return;
    }

    let suggestions = [...allWords]
        .filter(word => word.startsWith(value))
        .slice(0, 6);

    if (suggestions.length === 0) {
        resultsBox.innerHTML = `<div class="no-results">No suggestions</div>`;
    } else {
        suggestions.forEach(word => {
            const item = document.createElement('div');
            item.classList.add('search-result-item');
            item.textContent = word;

            item.addEventListener('click', () => {
                searchInput.value = word;
                search(word);
            });

            resultsBox.appendChild(item);
        });
    }

    resultsBox.style.display = 'block';
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search();
    }
});

const timeBtn = document.getElementById('time-btn');
const timeList = document.querySelector('.time-list');

timeBtn.addEventListener('click', () => {
    timeList.classList.toggle('show');
});