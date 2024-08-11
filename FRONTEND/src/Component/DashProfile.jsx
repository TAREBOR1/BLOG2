import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {  Alert, Button, TextInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const currentUser= useSelector((state)=>state.user.currentUser)
    const [image,setImage]=useState('')
    const [imageUrl,setImageUrl]=useState('')
    const [imageUploadProgess,setImageUploadProgress]=useState(null)
    const [imageUploadError,setImageUploadError]=useState(null)
    console.log(imageUploadError,imageUploadProgess)
    const filepicker= useRef()
    const handleIMGchange=(e)=>{
     const file=e.target.files[0]
     if(file){
        setImage(file)
        setImageUrl(URL.createObjectURL(file))
     }
    }
    useEffect(()=>{
        if(image){
          Upload()
        }
        },[image])
    const Upload =async()=>{
    

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write; if
//       request.resource.size < 2 *1024*1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
    setImageUploadError(null)
    const storage=getStorage(app);
    const filename= new Date().getTime() + image.name;
    const storageRef= ref(storage,filename);
    const uploadTask= uploadBytesResumable(storageRef,image);
    uploadTask.on(
        'state_changed',
        (snapshot)=>{
            const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
           setImageUploadError('could not upload image(file must be less than 2mb)');
           setImageUploadError(null)
        
           setImageUrl(null)
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                setImageUrl(downloadUrl)
            })
        }
    )
        console.log('uploadig....')
    }
 

  
  
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl '>profile</h1>
<form className='flex flex-col gap-4'>
<input type="file" accept='image/*'  onChange={handleIMGchange} ref={filepicker} hidden />
     <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filepicker.current.click()}>
    
        <img src={imageUrl || currentUser.profilePicture} alt="user" className='border-8 border-[lightgray] rounded-full object-cover w-full h-full' />
        </div> 
        {imageUploadError &&    <Alert color='failure'>{imageUploadError}</Alert> }
     
        <TextInput type="text" id="username" name="username"  placeholder="Your username" defaultValue={currentUser.username}  />
        <TextInput type="email" id="email" name="email"  placeholder="email address" defaultValue={currentUser.email}  />
        <TextInput type="password" id="password" name="username"  placeholder="password"  />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
</form>
<div className='text-red-500 flex justify-between mt-5'>
    <span className='cursor-pointer'>Delete Account?</span>
    <span className='cursor-pointer'>Sign Out</span>
   
</div>
    </div>
  )
}

export default DashProfile
