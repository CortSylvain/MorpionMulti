const jeu2 = document.querySelector(".jeu");
let html2 = '';
// alert("test")
for (let i = 1; i <= 3; i++) {
    html2 += "<div class='row'>";
    for (let j = 1; j <= 3; j++) {
        html2 += "<div class='col bloc' data-ij= " + i + '-' + j + " data-i = " + i + " data-j = " + j + "></div>";
    }
    html2 += "</div>";
}
jeu2.innerHTML = html2;
let firstClick2 = true;
jeu2.addEventListener('click', function (e) {
    if (e.target.innerText == '') {
        if (firstClick2) {
            e.target.innerText = "X";

        }
        else {
            e.target.innerText = "O";
        }
        firstClick2 = !firstClick2;
        let x = e.target.getAttribute("data-i");
        let y = e.target.getAttribute("data-j");
        let win = true;
        let cases = document.querySelectorAll(".bloc[data-i='" + x + "']");
        for (let c of cases) {
            if (c.innerText != e.target.innerText) {
                win = false;
                break;
            }
        }
        if (!win) {
            //test sur col
            win = true;
            cases = document.querySelectorAll(".bloc[data-j='" + y + "']");
            for (let c of cases) {
                if (c.innerText != e.target.innerText) {
                    win = false;
                    break;
                }
            }
            if (!win) {
                //test 1 diag
                for (let i = 1; i <= 3; i++) {
                    for (let j = 1; j <= 3; j++) {
                        if (i - j == x - y && x - y == 0) {
                            win = true;
                            let element = document.querySelector(".bloc[data-ij='" + i + "-" + j + "']");
                            if (element.innerText != e.target.innerText) {
                                win = false;
                            }
                        }
                    }
                }
                if (!win) {
                    for (let i = 1; i <= 3; i++) {
                        for (let j = 1; j <= 3; j++) {
                            if (i + j == parseInt(x) + parseInt(y) && i + j == 4) {
                                win = true;
                                let element = document.querySelector(".bloc[data-ij='" + i + "-" + j + "']");
                                if (element.innerText != e.target.innerText) {
                                    win = false;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (win) {
            alert("Bravo");
        }
    }

});