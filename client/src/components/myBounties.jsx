import { useQuery } from '@apollo/client';
import { QUERY_MY_BOUNTIES } from '../utils/queries';

export default function MyBounties() {
    
    const { loading, data } = useQuery(QUERY_MY_BOUNTIES);

    if(loading) return <div className="container">Loading bounties, please wait...</div>
    const issues = data?.me.savedIssues || [];

    return (
        <div className="container" id="gh-repo-issues">
            <ul className="list-group">
                {issues.map((issueData, index) => 
                    <li key={index} className="list-group-item d-flex align-items-center">
                        <div className="text-start mx-2">
                            <h5 className="m-0">{issueData.title}</h5>
                            <small>{issueData.description}</small>
                        </div>
                        <button className="ms-auto btn btn-success disabled" type="button">
                            ${issueData.bounty/100}&nbsp;
                            <i className="fa-solid fa-hand-holding-dollar"></i>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}