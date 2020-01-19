function showLoading() {
    document.getElementById("bodyStanding").innerHTML =
        `<div class="progress" >
            <div class="indeterminate"></div>
        </div >`;
}

const config = {
    BASE_URL: 'https://api.football-data.org/v2/',
    API_KEY: 'ea19db236c86401baef8b8772f45158c',
    LEAGUE_ID: 2001,
    get endPoint() {
        return {
            STANDING: `${this.BASE_URL}competitions/${this.LEAGUE_ID}/standings/`,
            TEAMS: `${this.BASE_URL}competitions/${this.LEAGUE_ID}/teams/`,
        }
    }
}

const {
    API_KEY,
    endPoint,
} = config

const fetchAPI = url => {
    return fetch(url, {
            method: "GET",
            headers: {
                'X-Auth-Token': API_KEY
            }
        }).then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
}

//get Standings
async function getStd() {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.STANDING)
            return await res.json()
        }
    } catch (error) {
        try {
            showLoading();
            const res = await fetchAPI(endPoint.STANDING)
            return await res
        } catch (error) {
            console.log(error);
        }
    }
}

//get Teams
async function getTms() {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.TEAMS)
            return await res.json()
        }
    } catch (error) {
        try {
            const res = await fetchAPI(endPoint.TEAMS)
            return await res
        } catch (error) {
            console.log(error);
        }
    }
}