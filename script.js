const sudoku = document.querySelector("#sudoku");
const startBox = document.querySelector("#start_box");
const time = document.querySelector("#time");
const rules_box = document.querySelector("#rules");
const back_btn = document.querySelector("#back");
const block = document.querySelectorAll(".block");
const result_box = document.querySelector("#result");
const sec = document.querySelector("#sec");
const min = document.querySelector("#min");

function start() {
    let random = Math.floor(Math.random() * 11);
    startBox.style.display = "none";
    sudoku.style.display = "flex";
    time.style.display = "block";
    back_btn.style.display = "block";

    window.addEventListener("click", body => {
        if (body.target.getAttribute("class") == null) {
            block.forEach(e => { e.style.backgroundColor = "white"; if (e.classList.contains("default")) { e.style.color = "#999999" } else { e.style.color = "black" } });
        }
    });

    block.forEach(item => {
        item.setAttribute("maxlength", 1);
        item.addEventListener("click", () => {
            block.forEach(e => { e.style.backgroundColor = "white"; if (e.classList.contains("default")) { e.style.color = "#999999" } else { e.style.color = "black" } });
            block.forEach(e => { if (e.value == item.value) { e.style.color = "blue" } });
            document.querySelectorAll(`.${item.classList[1]},.${item.classList[2]}`).forEach(e => { e.style.backgroundColor = "#e6f7ff" });
            let arr = [];
            for (let i = 0; i < 81; i++) {
                if (document.querySelectorAll(".block")[i].value) {
                    arr.push(document.querySelectorAll(".block")[i].value);
                }
            }
            if (arr.length == 81) { win() }
        });
    });
    const puzzle = [
        [0, 0, 3, 9, 0, 0, 0, 0, 1, 0, 2, 0, 3, 0, 5, 8, 0, 6, 6, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 8, 7, 0, 0, 0, 0, 6, 1, 0, 2, 0, 0, 0, 7, 0, 8, 9, 0, 0, 0, 0, 8, 2, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 5, 6, 0, 9, 2, 0, 3, 0, 1, 0, 5, 0, 0, 0, 0, 9, 3, 0, 0],
        [0, 3, 0, 0, 0, 8, 4, 6, 0, 0, 5, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 5, 0, 0, 0, 1, 2, 0, 7, 0, 0, 0, 0, 0, 4, 0, 5, 0, 2, 6, 0, 3, 1, 0, 9, 0, 8, 0, 0, 0, 0, 0, 3, 0, 2, 5, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 9, 8, 6, 0, 0, 0, 2, 0],
        [0, 2, 0, 7, 0, 0, 0, 9, 0, 8, 1, 0, 0, 0, 3, 0, 0, 2, 7, 4, 0, 1, 0, 0, 8, 0, 5, 0, 0, 9, 4, 0, 0, 1, 6, 0, 0, 4, 0, 2, 0, 8, 0, 3, 0, 0, 8, 7, 0, 0, 3, 2, 0, 0, 3, 0, 2, 0, 0, 5, 0, 7, 6, 7, 0, 0, 6, 0, 0, 0, 5, 1, 0, 6, 0, 0, 0, 8, 0, 9, 0],
        [1, 0, 0, 5, 2, 4, 0, 0, 0, 9, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 5, 0, 0, 0, 0, 4, 0, 2, 0, 0, 8, 0, 0, 0, 7, 0, 0, 1, 0, 2, 0, 0, 0, 0, 9, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 7, 1, 0, 0, 0, 9, 4, 5, 0, 0, 6],
        [0, 4, 3, 6, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1, 2, 5, 0, 0, 0, 0, 0, 9, 4, 9, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 4, 6, 0, 8, 2, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 3, 8, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 5, 7, 1, 0],
        [4, 8, 0, 0, 0, 2, 9, 0, 0, 0, 0, 6, 0, 0, 8, 3, 7, 0, 9, 0, 2, 0, 0, 1, 0, 6, 0, 8, 4, 0, 0, 0, 3, 0, 0, 1, 0, 1, 0, 7, 0, 4, 0, 6, 0, 2, 0, 0, 1, 0, 0, 0, 4, 9, 0, 2, 0, 7, 0, 0, 6, 0, 9, 0, 8, 5, 9, 0, 0, 2, 0, 0, 0, 0, 7, 6, 0, 0, 0, 1, 8],
        [0, 0, 0, 0, 0, 8, 4, 2, 0, 1, 2, 5, 4, 0, 0, 8, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 6, 0, 5, 1, 0, 0, 0, 0, 9, 0, 2, 0, 0, 0, 0, 9, 5, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 7, 2, 9, 8, 0, 4, 9, 2, 0, 0, 0, 0, 0],
        [0, 0, 1, 9, 0, 0, 0, 3, 0, 9, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 3, 1, 6, 0, 0, 0, 7, 0, 5, 0, 0, 0, 4, 2, 0, 0, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 9, 6, 0, 0, 0, 7, 0, 6, 0, 0, 0, 4, 2, 5, 0, 0, 1, 0, 0, 0, 0, 7, 0, 0, 6, 0, 3, 0, 0, 0, 6, 8, 0, 0],
        [0, 0, 0, 0, 5, 0, 0, 3, 0, 9, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 2, 4, 0, 0, 1, 6, 0, 9, 0, 8, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 2, 0, 5, 0, 9, 1, 0, 0, 7, 4, 0, 0, 0, 0, 0, 4, 3, 9, 0, 0, 7, 0, 5, 0, 0, 2, 0, 0, 0, 0],
        [0, 6, 2, 1, 0, 0, 5, 7, 0, 3, 4, 0, 0, 0, 5, 0, 0, 0, 7, 5, 0, 6, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 9, 4, 0, 0, 0, 8, 3, 0, 8, 0, 0, 0, 0, 6, 0, 0, 0, 0, 3, 0, 0, 0, 6, 0, 5, 9, 0, 0, 0, 4, 0, 0, 0, 8, 3, 0, 9, 1, 0, 0, 7, 2, 6, 0],
        [3, 0, 0, 0, 0, 5, 2, 0, 0, 0, 0, 0, 0, 0, 9, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 6, 0, 7, 0, 4, 0, 0, 0, 0, 0, 0, 3, 1, 0, 7, 0, 0, 0, 5, 8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0, 0, 6, 7, 0, 0, 5, 1, 0, 0, 0, 8, 0, 4, 3, 7]
    ];
    for (let i = 0; i < 81; i++) {
        if (puzzle[random][i]) { block[i].value = puzzle[random][i]; block[i].classList.add("default"); block[i].style.color = "#999999"; block[i].readOnly = true }
        else { block[i].setAttribute("onkeyup", "this.value=this.value.replace(/[A-Za-z\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\>\\=\\?\\@\\[\\]\\{\\}\\\\\\^\\_\\`\\~]+$/,'')") }
    }
    window.interval = setInterval(tim, 1000);
}

function tim() {
    if (2 > sec.textContent) {
        sec.textContent = 59;
        min.textContent--;
    }
    else { sec.textContent-- }
    if (1 > min.textContent) {
        clearInterval(interval);
        time.style.display = "none";
        sudoku.style.display = "none";
        result_box.style.display = "flex";
        document.querySelector("#text").textContent = "Game Over";
    }
}

function back() {
    try { clearInterval(interval) } catch { };
    time.style.display = "none";
    back_btn.style.display = "none";
    sudoku.style.display = "none";
    result_box.style.display = "none";
    rules_box.style.display = "none";
    startBox.style.display = "block";
    document.querySelectorAll(".btn").forEach(e => e.style.display = "block");
    block.forEach(e => { e.value = ""; e.classList.remove("default"); e.removeAttribute("onkeyup"); e.readOnly = false });
    sec.textContent = 59;
    min.textContent = 59;
}

function rules() {
    document.querySelectorAll(".btn").forEach(e => e.style.display = "none");
    rules_box.style.display = "block";
    back_btn.style.display = "block";
}

function win() {
    let arr = [];
    let result = {};
    let count = 0, rows_c = 0, columns_c = 0, blocks_c = 0;

    for (let i = 1; i < 10; i++) {
        document.querySelectorAll(`.row_${i}`).forEach(e => {
            arr.push(e.value);
            rows_c += +e.value;
            if ((i == 1 && rows_c == 45) ||
                (i == 2 && rows_c == 90) ||
                (i == 3 && rows_c == 135) ||
                (i == 4 && rows_c == 180) ||
                (i == 5 && rows_c == 225) ||
                (i == 6 && rows_c == 270) ||
                (i == 7 && rows_c == 315) ||
                (i == 8 && rows_c == 360) ||
                (i == 9 && rows_c == 405)) { count++ }
        });

        document.querySelectorAll(`.column_${i}`).forEach(e => {
            columns_c += +e.value;
            if ((i == 1 && columns_c == 45) ||
                (i == 2 && columns_c == 90) ||
                (i == 3 && columns_c == 135) ||
                (i == 4 && columns_c == 180) ||
                (i == 5 && columns_c == 225) ||
                (i == 6 && columns_c == 270) ||
                (i == 7 && columns_c == 315) ||
                (i == 8 && columns_c == 360) ||
                (i == 9 && columns_c == 405)) { count++ }
        });
    }
    arr.forEach(a => { result[a] = result[a] + 1 || 1 });
    for (let i = 0; i < 81; i++) {
        blocks_c += +block[i].value;
        if (i < 9) { if (Object.values(result)[i] == 9) { count++ } }
        if ((i == 8 && blocks_c == 45) ||
            (i == 17 && blocks_c == 90) ||
            (i == 26 && blocks_c == 135) ||
            (i == 35 && blocks_c == 180) ||
            (i == 44 && blocks_c == 225) ||
            (i == 53 && blocks_c == 270) ||
            (i == 62 && blocks_c == 315) ||
            (i == 71 && blocks_c == 360) ||
            (i == 80 && blocks_c == 405)) { count++ }
    }
    if (count == 36) {
        clearInterval(interval);
        time.style.display = "none";
        sudoku.style.display = "none";
        result_box.style.display = "flex";
        document.querySelector("#text").textContent = "Win!";
    }
}