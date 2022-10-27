const overview = document.querySelector (".overview"); //Target the div where profile information will appear
const username = "Jam-CS";
const reposList = document.querySelector (".repo-list") //Select the unordered list to display the repos list

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
    reposList.append(repoItem);
  }
};