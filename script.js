'use strict';
let btn = document.querySelector('.repos-button');
let inputField = document.querySelector('.repos-input input');
let dataFound = document.querySelector('.data-found');

btn.onclick = function () {
    getData();
}

function getData() {
    if (inputField.value == '') {
        dataFound.innerHTML = `<span style= "color:red;"> Please: enter correct repo name</span>`;
    } else {
        fetch(`https://api.github.com/users/${inputField.value}/repos`)
            .then((response) => {
                return response.json();
            }).then((repos) => {
                dataFound.innerHTML = '';
                repos.forEach(repos => {
                    const div = document.createElement('div');
                    // add repos name in div
                    const repoName = document.createTextNode(repos.name);
                    div.className = 'data-items';
                    div.appendChild(repoName);
                    // add span link into div
                    const link = document.createElement('a');
                    const url = document.createTextNode("Visit");
                    link.setAttribute("target", "_blank");
                    link.href = repos.html_url;
                    console.log(repos.html_url);
                    
                    link.className = "links";
                    link.appendChild(url);
                    div.appendChild(link);
                    // add stars into div
                    //stargazers_count
                    const stars = document.createElement('span');
                    const starsText = document.createTextNode(`Stars: ${repos.stargazers_count}`);
                    stars.className = "stars";
                    stars.appendChild(starsText);
                    div.appendChild(stars);
                    dataFound.appendChild(div);
                });
            });
    }

}