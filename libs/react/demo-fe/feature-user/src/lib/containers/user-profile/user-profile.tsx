import { authSelectors } from '@dm/react/shared/feature-auth';
import { UserProfileDto } from '@dm/shared/demo/data-model';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../+state/user.actions';
import { formSelectors } from '../../+state/user.selectors';
import { UserProfileForm } from '../../components/user-profile-form/user-profile-form';
import './user-profile.module.scss';

export function UserProfile() {
  const dispatch = useDispatch();
  const authUser = useSelector(authSelectors.getUser);
  const user = useSelector(formSelectors.getResource);

  useEffect(() => {
    if (authUser) {
      dispatch(formActions.load(authUser.id));
    }
  }, [authUser, dispatch]);

  const onSubmit = (user: UserProfileDto) => {
    dispatch(formActions.save(user));
  };

  return <div>{user ? <UserProfileForm user={user} submit={onSubmit}></UserProfileForm> : <div>wait UserProfile</div>}</div>;
}

export default UserProfile;
