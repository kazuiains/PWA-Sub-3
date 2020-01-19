//fungsi yang akan dijalankan ketika selesai di load
document.addEventListener('DOMContentLoaded', function() {

    // SIDEBAR NAVIGATION
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);

    loadNav()
    route()
});

//meload navigation
function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav")
                .forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll('.sidenav a, .topnav a')
                .forEach(function(elm) {
                    elm.addEventListener('click', function(event) {
                        // Tutup sidenav
                        let sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil 
                        let page = event.target.getAttribute('href').substr(1);
                        route(page);
                    });
                });
        }
    };
    xhttp.open("GET", 'nav.html', true);
    xhttp.send();
}

//meload page
function loadPage(page) {
    var xhttp = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector(".body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    resolve(page)
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        }
        xhttp.open("GET", 'pages/' + page + '.html', true);
        xhttp.send();
    });
}

//memecahkan url
async function parser(url) {
    var pagePath, dataUrl, paramValueObj = {},
        paramValueArr

    // cek apakah melalui navigasi atau lewat search engine
    if (url != null) {
        dataUrl = url
    } else {
        // chek apakah di search engine seperti ini "localhost/sub2MuhammadAdiYusuf/" ? kalo iya masukkan nilai DEFAULT_PAGE. 
        // Kalo tidak, maka ya ambil data setelah "/" dari "sub2MuhammadAdiYusuf/"
        dataUrl = window.location.hash != '' ? window.location.hash.substr(1) : DEFAULT_PAGE
    }

    // dapet deh data pagenya
    pagePath = dataUrl

    //chek apakah ada '?' dalam url
    if (dataUrl.indexOf('?') > -1) {
        //pisahkan tanda tanya. nanti bentuknya array. misal "standings?id=2019" berubah menjadi "standings,id=2019"
        dataUrl = dataUrl.split('?')

        // data pagenya diupdate dulu. kalo kaga nanti bakal menjadi "standings,id=2019". diubah biar biar jadi "standings"
        pagePath = dataUrl[0]

        //check apa ada "&" ?
        if (dataUrl[1].indexOf('&') > -1) {
            //hilangkan "&" agar jadi array
            paramValueArr = dataUrl[1].split('&')

            //buat perulangan
            paramValueArr.forEach(data => {
                //pisahkan datanya lagi
                let subData = data.split('=')

                //check apakah valuenya ada? maksudnya "id=2019" kan ada tuh valuenya yaitu 2019
                if (subData[1]) {
                    paramValueObj[subData[0]] = subData[1]
                } else {
                    paramValueObj[subData[0]] = null
                }
            });
        } else { //posisinya ini kita gak ketemu sama &

            //samalah kek diatas
            let subData = dataUrl[1].indexOf('=') > -1 ? dataUrl[1].split('=') : dataUrl[1]
            if (Array.isArray(subData) && subData[1] != undefined) {
                paramValueObj[subQuery[0]] = subData[1]
            } else {
                paramValueObj[subData] = null
            }
        }
    }
    paramValueObj['noData'] = null

    return new Promise((resolve, reject) => {
        if (pagePath != undefined && Object.keys(paramValueObj).length != 0) {
            resolve({
                pagePath,
                query: paramValueObj
            })
        } else {
            reject("URL Tidak Sesuai Dengan Syarat");
        }
    })
}