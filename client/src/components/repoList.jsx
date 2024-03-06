import Repo from './ui/repo.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Need to add some sort of functionality to the `bounty` to allow it to know if it should say 'Contribute' or 'Dollar Amt' instead of passing it explicit
// Reference 22-State | 12-Stu_Hooks-Review

export default function repoList() {

  const { userId } = useParams()
  const [repos, setRepos] = useState([])

  useEffect(() => {
    getRepos(userId)
  }, [])

  const getRepos = async (username) => {
    //let issuesURL = `https://api.github.com/repos/${repo}/issues?direction=asc`;
    let issuesURL = `https://api.github.com/users/${username}/repos?type=public`;
    const response = await fetch(issuesURL);
    const data = await response.json();
    const repoList = data.filter((repo) => repo.open_issues > 0)
    
    setRepos(repoList)
  };

  return <Repo repos={repos} />;

}
