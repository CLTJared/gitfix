import success from '../assets/success.png'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {QUERY_ME} from '../utils/queries';
import { decodeCHECKOUT, SAVE_ISSUE } from '../utils/mutations';
import Error from './Error';

const Success = () => {
  const { sessionId } = useParams()

  const [bTotal, setTotal] = useState(0);
  const [bItem, setItem] = useState('');
  const [bName, setName] = useState('');

  const [decodeMe, { loading, error }] = useMutation(decodeCHECKOUT);
  const [saveIssue] = useMutation(SAVE_ISSUE);

  const decodeStripe = async () => {
    const decodeData = await decodeMe({ variables: { sessionId: sessionId } })
    return decodeData.data.decodeStripe.total
  }
  
  console.log('bItem', bItem, 'bTotal', bTotal, 'bName', bName)
  const newIssue = async () => {
    try {
      const mutationResponse = await saveIssue({
        variables: {
          issueId: localStorage.getItem("StripeId"),
          title: localStorage.getItem("StripeName"),
          state: "open",
          bounty: parseInt(localStorage.getItem("StripeMount")),
          bountyIssuer: localStorage.getItem('userId')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const dataDecode = decodeStripe()
    dataDecode.then((res) => {
      console.log('Total', res)
      setTotal(res / 100)
    });


    setItem(localStorage.getItem("StripeId"))
    setName(localStorage.getItem("StripeName"))

    // localStorage.setItem("StripeId", '');
    // localStorage.setItem("StripeName", '');

    newIssue()
  }, []);
  
  
  
  
  
  if (loading) return <div className="container">Loading, please wait...</div>;
  if (error) return <Error />
  
  return (
    <div className="container">
      <div className="row p-4 align-items-center">

        <div className="col-md-2 shadow-lg">
          <img className="rounded-lg-3" src={success} alt="" width="250" />
        </div>

        <div className="col-md-7 p-3 p-lg-5 mx-auto pt-lg-3">
          <h2 className="fw-bold text-success">BOUNTY RECEIVED</h2>
          <p className="lead">Thank you for your bounty for issue {bItem}.</p>
          <p id="stripeTotal">Total: ${bTotal}</p>
          <p id="stripeItem">{bName}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;