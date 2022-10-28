const overview = document.querySelector (".overview"); //Target the div where profile information will appear
const username = "Jam-CS";
const repoList = document.querySelector (".repo-list"); //Select the unordered list to display the repos list
const reposSection = document.querySelector (".repos"); //Select where all the repo information appears
const eachRepoData = document.querySelector (".repo-data"); //individual repo data will appear

const githubProfile = async function (){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo (data);
};
githubProfile ();

const displayUserInfo = function (data){
    const div = document.createElement ("div");
    div.classList.add ("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overview.append(div);
  myRepos();
};



const myRepos = async function(){
  const listOfRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const reposData = await listOfRepos.json();
  fetchRepos(reposData);
};

const fetchRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener ("click", function(e){
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
  getRepoInfo (repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);

  //create an Array languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);

  const languages = [];
  for (const language in languageData) {
   //console.log (languages);
   languages.push(language);
  }
  displayRepoInfo (repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages){
  eachRepoData.innerHTML = "";
  eachRepoData.classList.remove ("hide");
  reposSection.classList.add("hide");

  const div = document.createElement ("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  eachRepoData.append(div);
};


