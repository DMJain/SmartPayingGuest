import { useEffect, useState, useRef } from 'react';
import { useLoggedInUser } from '../../../../hooks/auth.hooks';

const ProfileDetails = () => {
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const userDataRefLoaded = useRef(false);
  const { data : user } = useLoggedInUser();

  useEffect(() => { 
    if (!userDataRefLoaded.current) {
      userDataRefLoaded.current = true;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col items-center gap-10 p-5'> 
      <h1 className='text-3xl'>Profile Details</h1>
      {isEditing ? (
        <div className='flex flex-col gap-2 w-2/4 p-2'>
          <div className='flex justify-between text-xl'>
            <div className='w-1/2'>First Name :</div>
            <div className='w-1/2'><input type="text" value={firstName} className='input input-bordered w-full' onChange={(e) => setFirstName(e.target.value)} /></div>
          </div>
          <div className='flex justify-between text-xl'>
            <div className='w-1/2'>Last Name :</div>
            <div className='w-1/2'><input type="text" value={lastName} className='input input-bordered w-full' onChange={(e) => setLastName(e.target.value)} /></div>
          </div>
          <div className='flex justify-between text-xl'>
            <div className='w-1/2'>Email :</div>
            <div className='w-1/2'><input type="text" value={email} className='input input-bordered w-full' onChange={(e) => setEmail(e.target.value)} /></div>
          </div>
        
          <button onClick={handleSaveClick} className='btn btn-outline btn-primary'>Save</button>
        </div>
      ) : (
        <div className='flex flex-col gap-2 w-2/4 p-2'>
          <div className='flex justify-between text-xl mb-5'>
            <div className='w-1/2'>First Name :</div>
            <div className='flex justify-start w-1/2'>{firstName}</div>
          </div>
          <div className='flex justify-between text-xl mb-5'>
            <div className='w-1/2'>Last Name :</div>
            <div className='flex justify-start w-1/2'>{lastName}</div>
          </div>
          <div className='flex justify-between text-xl mb-5'>
            <div className='w-1/2'>Email :</div>
            <div className='flex justify-start w-1/2'>{email}</div>
          </div>
          <button className='btn btn-outline btn-secondary' onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};


export default ProfileDetails;

