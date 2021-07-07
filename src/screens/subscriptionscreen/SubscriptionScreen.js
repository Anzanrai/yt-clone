import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions } from '../../redux/actions/subscription.action';

function SubscriptionScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubscriptions());
  }, [dispatch]);

  const { subscriptions } = useSelector((state) => state.subscriptionsList);
  console.log(subscriptions);
  return <div>Subscription Screen</div>;
}

export default SubscriptionScreen;
