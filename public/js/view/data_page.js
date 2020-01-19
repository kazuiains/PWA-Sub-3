async function pageStand() {
    const ielemen = document.getElementById("bodyStanding")
    let table = ""

    const data = await getStd()

    for (i = 0; i < data.standings.length; i++) {
        let dataTable = ""
        await data.standings[i].table.forEach(mdata => {
            dataTable += `
                <tr>
                    <td>${mdata.position}</td>
                    <td class="kiri"><img src="${mdata.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="image-with-name" alt=""/>${mdata.team.name}</td>
                    <td>${mdata.won}</td>
                    <td>${mdata.draw}</td>
                    <td>${mdata.lost}</td>
                    <td>${mdata.goalsFor}</td>
                    <td>${mdata.goalsAgainst}</td>
                    <td>${mdata.goalDifference}</td>
                    <td>${mdata.points}</td>
                </tr>
        `
        })
        table += `
            <div class="card" style="padding:12px; margin-top: 30px;">
            <h5 class="header center orange-text">Group ${data.standings[i].group.substr(6)} (${data.standings[i].type})</h5>
            <table class="striped responsive-table tengah" id="tableStanding">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th class="kiri">Team Name</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Goal For</th>
                        <th>Goal Against</th>
                        <th>Goal Difference</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataTable}
                </tbody>
            </table>
            </div>
        `
    };
    ielemen.innerHTML = table;
}

async function pageTeams() {

    let dataTable = ""
    let no
    const data = await getTms()
    const vCheck = await getTeam()

    await data.teams.forEach(function(mdata, i) {
        let dCheck, btnText, checkedClass
        btnText = "Favorite"
        dCheck = "false"
        checkedClass = ""
        for (let i in vCheck) {
            if (vCheck[i].teamId == mdata.id) {
                btnText = "UnFavorite"
                dCheck = "true"
                checkedClass = "checked"
                break
            }
        }

        no = i + 1
        dataTable += `
                <tr>
                    <td>${no}</td>
                    <td><img src="${mdata.crestUrl}" class="image-with-name" alt=""/></td>
                    <td class="kiri">${mdata.name}</td>
                    <td>${mdata.shortName}</td>
                    <td>${mdata.clubColors}</td>
                    <td>${mdata.area.name}</td>
                    <td><button data-id="${mdata.id}" data-name="${mdata.name}" data-logo="${mdata.crestUrl}" data-check="${dCheck}" class="waves-effect waves-light btn ${checkedClass}" id="favorite">${btnText}</button></td>
                </tr>
        `
    })

    loadPage('teams').then(page => {
        document.getElementById("dataTeams").innerHTML = dataTable;

        let addFav = document.querySelectorAll("#favorite");
        for (let button of addFav) {
            button.addEventListener("click", function(event) {
                let fav, idTeam
                fav = event.target.dataset.check;
                idTeam = event.target.dataset.id;

                if (fav == "true") {
                    dbdelFav(idTeam).then(() => {
                        this.classList.remove("checked")
                        this.innerHTML = 'Favorite'
                        this.dataset.check = "false"
                        M.toast({ html: 'Favorite successfully deleted' })
                    })
                } else {

                    const dTm = {
                        teamId: idTeam,
                        teamLogo: event.target.dataset.logo,
                        teamName: event.target.dataset.name,
                    }

                    dbaddFav(dTm).then(() => {
                        this.classList.add("checked")
                        this.innerHTML = 'UnFavorite'
                        this.dataset.check = "true"
                        M.toast({ html: 'Favorite successfully added' })
                    })
                }

            })
        }
    })
}

async function pageFav() {
    loadPage('favorite-teams').then(page => {
        function showFav() {
            getTeam().then(team => {

                let dataTable = "";
                let tableView = "";
                let no, noData

                if (team.length == 0) {
                    noData = "true"
                }

                team.forEach(function(mdata, i) {

                    no = i + 1;
                    dataTable += `
                            <tr>
                                <td>${no}</td>
                                <td><img src="${mdata.teamLogo}" class="image-with-name" alt=""/></td>
                                <td>${mdata.teamName}</td>
                                <td><button data-id="${mdata.teamId}" class="waves-effect waves-light btn checked" id="favorite">UnFavorite</button></td>
                            </tr>
                        `;

                });
                if (noData == "true") {
                    tableView = "<p>Tidak Ada Data yang ditampilkan</p>"
                } else {
                    tableView = `         
                        <table class="striped responsive-table tengah" id="tableStanding">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Logo</th>
                                    <th>Team Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataTable}
                            </tbody>
                        </table>
                    `;
                }
                document.getElementById("dataFav").innerHTML = tableView;
                let favBtn = document.querySelectorAll("#favorite");
                for (let button of favBtn) {
                    button.addEventListener("click", function(event) {
                        let teamId = event.target.dataset.id;
                        dbdelFav(teamId).then(() => {
                            showFav()
                            M.toast({ html: 'Favorite successfully deleted' })
                        })
                    })
                }

            })
        }

        showFav()
    })

}