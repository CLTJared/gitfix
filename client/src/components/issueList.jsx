import Issue from './ui/issue.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function issueList() {

  const { userId, repoId } = useParams()
  const [issues, setIssues] = useState([])

  useEffect(() => {
    getRepoIssues(userId, repoId)
  }, [])

  const getRepoIssues = async (username, repo) => {
    //let issuesURL = `https://api.github.com/repos/${repo}/issues?direction=asc`;
    let issuesURL = `https://api.github.com/repos/${username}/${repo}/issues?direction=asc`;
    const response = await fetch(issuesURL);
    const data = await response.json();

    setIssues(data)
  };
  
  return <Issue issues={issues} />;

}
