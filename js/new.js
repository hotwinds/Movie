//Ajax request for list of Movies 
let str3, str2, pages1, html2, pag;
$("#search").click(function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            str2 = this.responseText;
            // console.log(str2);
            str3 = JSON.parse(str2);
            // console.log(str3)
            $('.list').html('');
            $('.pagin').empty();
            $('.details').empty();
            if (str3.Response == 'True') {
                pages1 = Math.ceil(str3.totalResults / 10);
                let start = '<h3>Total Results: ' + str3.totalResults + ' Pages: ' + pages1 + '</h3>';
                $('.list').append(start);
                let txt01 = '';
                for (let i = 0; i < str3.Search.length; i++) {
                    txt01 += '<div class = "ndiv" >' + '<img class="img"; src = "' + str3.Search[i].Poster + '">' +
                        '<table class="tbl";><tr><td height="20">' + document.querySelector('#sel').value + '</td></tr><tr><td height="80" style="font-size:18px;"><b>' + str3.Search[i].Title +
                        '</b></td></tr><tr><td height="50" style="font-size:18px;">' + str3.Search[i].Year + '</td></tr><tr><td height="50">' +
                        '<button class = "button12" id = "' + str3.Search[i].imdbID + '">More details</button></td></tr></table></div>';
                }
                $('.list').append(txt01);

                pag = '';
                let pages2 = pages1;
                if (pages1 > 10) {
                    pages2 = 10;
                    // pag += '<div class="pagleft1" id="001">' + '&#124' + '&lt' + '</div>';
                    // pag += '<div class="pagleft" id="01">' + '&laquo' + '</div>';
                }
                for (let i = 1; i <= pages2; i++) {
                    pag += '<div class="pagnum" id ="' + i + '">' + i + '</div>';
                }
                if (pages1 > 10) {
                    pag += '<div class="pagright" id="02">' + '&raquo' + '</div>';
                    pag += '<div class="pagright1" id="002">' + '&gt' + '&#124' + '</div>';
                }
                $('.pagin').append(pag);
            }
            else {
                nDiv = "<h2 style='text-align: center;'>Movie not found!</h2>";
                $('.list').append(nDiv);
            }
        }
    }
    html2 = "http://www.omdbapi.com/?s=" + $('#inp').val() + "&type=" + $('#sel').val() + "&apikey=" + $('#apk').val();
    console.log(html2);
    xhttp.open("GET", html2, true)
    xhttp.send();
});

//Ajax request for list of movies at exact page (pagination)
$('.pagin').on('click', '.pagnum', function (e) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            str2 = this.responseText;
            str3 = JSON.parse(str2);
            if (str3.Response == 'True') {
                $('.list').html('');
                pages1 = Math.ceil(str3.totalResults / 10);
                let start = '<h3>Total Results: ' + str3.totalResults + ' Pages: ' + pages1 + '</h3>';
                $('.list').append(start);
                let txt01 = '';
                for (let i = 0; i < str3.Search.length; i++) {
                    if (str3.Search[i].Poster == 'N/A') {// Yes/no Poster available
                        txt01 += '<div class = "ndiv" >' + '<img class="img"; src="noposter.jpg">' +
                            '<table class="tbl";><tr><td height="20">' + document.querySelector('#sel').value + '</td></tr><tr><td height="80" style="font-size:18px;"><b>' + str3.Search[i].Title +
                            '</b></td></tr><tr><td height="50" style="font-size:18px;">' + str3.Search[i].Year + '</td></tr><tr><td height="50">' +
                            '<button class = "button12" id = "' + str3.Search[i].imdbID + '">More details</button></td></tr></table></div>';
                    }
                    else {
                        txt01 += '<div class = "ndiv" >' + '<img class="img"; src = "' + str3.Search[i].Poster + '">' +
                            '<table class="tbl";><tr><td height="20">' + document.querySelector('#sel').value + '</td></tr><tr><td height="80" style="font-size:18px;"><b>' + str3.Search[i].Title +
                            '</b></td></tr><tr><td height="50" style="font-size:18px;">' + str3.Search[i].Year + '</td></tr><tr><td height="50">' +
                            '<button class = "button12" id = "' + str3.Search[i].imdbID + '">More details</button></td></tr></table></div>';
                    }
                }
                // console.log(e.target.id);
                let arr = $('.pagnum').css("background-color", "lightgrey");
                e.target.style.backgroundColor = "green";
                $('.list').append(txt01);
            }
            else {
                $('.list').html('');
                nDiv = "<h2 style='text-align: center;'>Movie not found!</h2>";
                $('.list').append(nDiv);
            }
        }
    }
    html2 = "http://www.omdbapi.com/?s=" + $('#inp').val() + "&type=" + $('#sel').val() + "&apikey=" + $('#apk').val() + "&page=" + $(this).attr('id');
    console.log(html2);
    xhttp.open("GET", html2, true)
    xhttp.send();
});

//operations with next 10 pages button in pagination
let qty = 1, qtyFullPages, qtyTotalPages, qtyLastPage, pag1;
$('.pagin').on('click', '.pagright', function (e) {
    $('.pagin').ready(function (event) {
        let x = $('.pagnum')[0].textContent; //value of first page button
        qty1 = pages1 / 10; //example for 221 pages: 221/10=22,1
        qtyFullPages = Math.floor(qty1);   //10 buttons -> 22
        qtyTotalPages = Math.ceil(qty1);   //total pages -> 23
        qtyLastPage = pages1 % 10;  // 1
        // console.log(qty1, qtyFullPages, qtyTotalPages, qtyLastPage);
        $('.pagin').empty();
        pag1 = '';
        // let firstButton = qty * 10 + 1;
        qty++;
        let z = (x == 1) ? (x = +x * 10 + 1) : (+x + 10);
        let y = (qty < qtyTotalPages) ? +z + 9 : pages1;
        // let lastButton = (qty < qtyTotalPages) ? qty * 10 : (qty - 1) * 10 + qtyLastPage;
        pag1 += '<div class="pagleft1" id="001">' + '&#124' + '&lt' + '</div>';
        pag1 += '<div class="pagleft" id="01">' + '&laquo' + '</div>';
        for (let i = z; i <= y; i++) {
            pag1 += '<div class="pagnum" id ="' + i + '">' + i + '</div>';
        }
        if (qty < qtyTotalPages) {
            pag1 += '<div class="pagright" id="02">' + '&raquo' + '</div>';
            pag1 += '<div class="pagright1" id="002">' + '&gt' + '&#124' + '</div>';
        }
        /* else if (qty == pages1) {
             $('.pagin').off('click', '.pagright');
        }*/
        $('.pagin').append(pag1);
    });
});

//operations with first pages button of pagination
$('.pagin').on('click', '.pagleft1', function () {
    qty1 = pages1 / 10; //example for 221 pages: 221/10=22,1
    // qtyFullPages = Math.floor(qty1);   //10 buttons -> 22
    qtyTotalPages = Math.ceil(qty1);   //total pages -> 23
    // qtyLastPage = pages1 % 10;  // 1
    // console.log(qty1, qtyFullPages, qtyTotalPages, qtyLastPage);
    $('.pagin').empty();
    pag1 = '';
    /*let firstButton = qty * 10 + 1;
    qty++;
    let lastButton = (qty < qtyTotalPages) ? qty * 10 : (qty - 1) * 10 + qtyLastPage;
    pag1 += '<div class="pagleft1" id="001">' + '&#124' + '&lt' + '</div>';
    pag1 += '<div class="pagleft" id="01">' + '&laquo' + '</div>';*/
    for (let i = 1; i <= 10; i++) {
        pag1 += '<div class="pagnum" id ="' + i + '">' + i + '</div>';
    }
    if (qty < qtyTotalPages) {
        pag1 += '<div class="pagright" id="02">' + '&raquo' + '</div>';
        pag1 += '<div class="pagright1" id="002">' + '&gt' + '&#124' + '</div>';
    }
    /*else if (qty == pages1) {
        $('.pagin').off('click', '.pagright');
    }*/
    $('.pagin').append(pag1);
});

//operations with last pages button of pagination
$('.pagin').on('click', '.pagright1', function (e) {
    qty1 = pages1 / 10; //example for 221 pages: 221/10=22,1
    qtyFullPages = Math.floor(qty1);   //10 buttons -> 22
    qtyTotalPages = Math.ceil(qty1);   //total pages -> 23
    qtyLastPage = pages1 % 10;  // 1
    // console.log(qty1, qtyFullPages, qtyTotalPages, qtyLastPage);
    $('.pagin').empty();
    pag1 = '';
    // let firstButton = qty * 10 + 1;
    let firstButton = qtyFullPages * 10 + 1;
    // qty++;
    // let lastButton = (qty < qtyTotalPages) ? qty * 10 : (qty - 1) * 10 + qtyLastPage;
    pag1 += '<div class="pagleft1" id="001">' + '&#124' + '&lt' + '</div>';
    pag1 += '<div class="pagleft" id="01">' + '&laquo' + '</div>';
    for (let i = firstButton; i <= pages1; i++) {
        pag1 += '<div class="pagnum" id ="' + i + '">' + i + '</div>';
    }
    /*if (qty < qtyTotalPages) {
        pag1 += '<div class="pagright" id="02">' + '&raquo' + '</div>';
        pag1 += '<div class="pagright1" id="002">' + '&gt' + '&#124' + '</div>';
    }
    else if (qty == pages1) {
        $('.pagin').off('click', '.pagright');
    }*/
    $('.pagin').append(pag1);
});

//operations with previous button of pagination
$('.pagin').on('click', '.pagleft', function (e) {
    $('.pagin').ready(function (event) {
        let a = $('.pagnum')[0].textContent;//value of first button in pagination
        /* console.log(a);
        qty1 = pages1 / 10; //example for 221 pages: 221/10=22,1
        qtyFullPages = Math.floor(qty1);   //10 buttons -> 22
        qtyTotalPages = Math.ceil(qty1);   //total pages -> 23
        qtyLastPage = pages1 % 10;  // 1
        qty = 1;*/
        $('.pagin').empty();
        pag1 = '';
        // let fBtn = qty * 10 + 1;
        // qty++;
        // let lBtn = (qty < qtyTotalPages) ? qty * 10 : (qty - 1) * 10 + qtyLastPage;
        a = (+a - 10);
        let b = (+a + 9);
        if (a <= 1) {
            e.target.style.display = "none";//hidden left button in pagination
        }
        else {
            pag1 += '<div class="pagleft1" id="001">' + '&#124' + '&lt' + '</div>';
            pag1 += '<div class="pagleft" id="01">' + '&laquo' + '</div>';
        };
        for (let i = a; i <= b; i++) {
            pag1 += '<div class="pagnum" id ="' + i + '">' + i + '</div>';
        }
        // if (a >= 1) {
        // if (qty < qtyTotalPages) {
        pag1 += '<div class="pagright" id="02">' + '&raquo' + '</div>';
        pag1 += '<div class="pagright1" id="002">' + '&gt' + '&#124' + '</div>';
        /* }
        if (a == 1) {
             $('.pagin').off('click', '.pagleft');
        }*/
        $('.pagin').append(pag1);
    });
});

//Ajax request for exact film details
let str, str1;
$('.list').on('click', '.button12', function () {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            str = this.responseText;
            str1 = JSON.parse(str);
            if (str1.Response == 'True') {
                $('.details').html('');
                let txt0 = '<h3>Film Info:</h3><table class="tableinfo">';
                let txt1 = '</tr><tr><th> Title: </th><td>';
                let txt6 = '</tr><tr><th> Released:</th><td>';
                let txt8 = '</tr><tr><th> Genre:</th><td>';
                let txt15 = '</tr><tr><th> Country:</th><td>';
                let txt17 = '<tr><td rowspan="20"> <img class=photo; src=' + str1.Poster + ';></td></tr>';
                let txt10 = '</tr><tr><th> Director:</th><td>';
                let txt11 = '</tr><tr><th> Writer:</th><td>';
                let txt12 = '</tr><tr><th> Actors:</th><td>';
                let txt16 = '</tr><tr><th> Awards:</th><td>';
                let txtend1 = '</td></tr>';
                let txtend2 = '</table>';
                let nDiv = txt0 + txt17 + txt1 + str1.Title + txt6 + str1.Released + txt8 + str1.Genre + txt15 + str1.Country + txt10 + str1.Director + txt11 + str1.Writer + txt12 + str1.Actors + txt16 + str1.Awards;
                console.log(str1.Poster);
                $('.details').append(nDiv);
            }
            else {
                $('.list').html('');
                nDiv = "<h2 style='text-align: center;'>Movie not found!</h2>";
                $('.details').append(nDiv);
            }
        }
    }
    let html1 = "http://www.omdbapi.com/?i=" + $(this).attr('id') + "&apikey=" + $('#apk').val();
    console.log(html1);
    xhttp.open("GET", html1, true)
    xhttp.send();
});
// http://www.omdbapi.com/?t=value&type=value&apikey=a6e25b95

// http://www.omdbapi.com/?i=tt3896198&apikey=5c5c94ec
