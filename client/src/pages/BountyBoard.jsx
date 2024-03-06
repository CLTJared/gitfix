import { Navigate } from 'react-router-dom'
import { QUERY_ISSUES } from '../utils/queries'
import { useQuery } from '@apollo/client'
import Auth from '../utils/auth'

export default function BountyBoard({ issues }) {

    if (!Auth.loggedIn()) return <Navigate to="/login" />
    const { loading, data } = useQuery(QUERY_ISSUES)

    if (loading) return <div className="container">Loading bounties, please wait...</div>
    const issue = data?.issues || []

    return (
        <div>
            {/* Top Bounties */}
            <div className="container col-xxl-8 py-2" >
                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h2 className="fw-bold text-success">Top Bounties</h2>
                </div>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            {/* Links the whole box to that particular issue */}
                            <a style={{ textDecoration: 'none' }} href="/project">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">coulterkyle Project 3</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title text-success">$1,000</h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Help Bounty Issuers Claim Bounty</li>
                                        <li>Send notification and review code</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-outline-primary btn-success">CLAIM BOUNTY</button>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            {/* Links the whole box to that particular issue */}
                            <a style={{ textDecoration: 'none' }} href="/project">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">dcast217 Project 3</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title text-success">$500</h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Ability to Upvote Issues</li>
                                        <li>Improve visibility of priority issues</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-outline-primary btn-success">CLAIM BOUNTY</button>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            {/* Links the whole box to that particular issue */}
                            <a style={{ textDecoration: 'none' }} href="/project">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">NatalieYaspo Project 3</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title text-success">$750</h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Automate payout</li>
                                        <li>Allow our users to get paid!</li>
                                    </ul>
                                    <button type="button" className="w-100 btn btn-lg btn-outline-primary btn-success">CLAIM BOUNTY</button>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* All other Bounties */}
            <div className="container mb-4 success" id="gh-repo-issues">
                <ul className="list-group">
                    {issue.map((data, index) =>
                        <li key={index} className="list-group-item d-flex align-items-center">
                            <div className="text-start mx-2">
                                <h5 className="m-0">{data.title}</h5>
                                <small>{data.description}</small>
                            </div>
                            <button className="ms-auto btn btn-success" type="button">
                                ${data.bounty/100}&nbsp;
                                <i className="fa-solid fa-hand-holding-dollar"></i>
                            </button>
                            <a href="#" className="mx-2 btn btn-dark" title="Claim Bounty"><i className="fa-solid fa-virus-slash"></i></a>
                        </li>
                    )}
                </ul>
            </div>


        </div>
    );
};