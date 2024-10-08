import React, { useEffect, useRef, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {  Alert, Button, TextInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure,updateStart,updateSuccess } from '../Redux/user/userSlice';

const DashProfile = () => {
    const currentUser= useSelector((state)=>state.user.currentUser)
    const [image,setImage]=useState('')
    const [imageUrl,setImageUrl]=useState('')
    const [imageUploadProgess,setImageUploadProgress]=useState(null)
    const [imageUploadError,setImageUploadError]=useState(null)
    const [imageFileUploading,setImageFileUploading]=useState(false)
    const [updateUserSucess,setUpdateUserSuccess]=useState(null)
    const [updateUserError,setUpdateUserError]=useState(null)
     const [formData,setFormData]=useState({})
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
setImageFileUploading(true)
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
         setImageUploadProgress(null)
           setImageUrl(null)
           setImage(null)
           setImageFileUploading(false);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                setImageUrl(downloadUrl)
                setFormData({...formData,profilePicture:downloadUrl});
                setImageFileUploading(false);
            })
        }
    )
    }
    const dispatch=useDispatch()
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if(Object.keys(formData).length===0){
            setUpdateUserError('No changes made')
            return;
        }
        if(imageFileUploading){
            setUpdateUserError('please wait for image to Upload')
            return;
        }
        try {
            dispatch(updateStart())
            const response = await fetch(`/api/update/${currentUser._id}`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                'Content-type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            const responseData = await response.json(); 
            if(responseData.success===false){
                dispatch(updateFailure(responseData.message))
                setUpdateUserError(responseData.message)
              }else{
                dispatch(updateSuccess(responseData))
                setUpdateUserSuccess("User's profile updated successfully")
              }
        } catch (error) {
            dispatch(updateFailure(responseData.message))
            setUpdateUserError(responseData.message)
        }
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl '>profile</h1>
<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
<input type="file" accept='image/*'  onChange={handleIMGchange} ref={filepicker} hidden />
     <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filepicker.current.click()}>
        {imageUploadProgess && <CircularProgressbar value={imageUploadProgess || 0} text={`${imageUploadProgess}%`}
         strokeWidth={5}
         styles={{
            root:{
                width:'100%',
                height:"100%",
                position:"absolute",
                top:0,
                left:0
            },
            path:{
                stroke: `rgba(62,152,199,${imageUploadProgess/100})`
            }
         }}
        />}
        <img src={imageUrl || currentUser.profilePicture} alt="user" className={ `border-8 border-[lightgray] rounded-full object-cover w-full h-full ${imageUploadProgess && imageUploadProgess<100 && 'opacity-60'} `}/>
        </div> 
        {imageUploadError &&    <Alert color='failure'>{imageUploadError}</Alert> }
     
        <TextInput onChange={handleChange} type="text" id="username" name="username"  placeholder="Your username" defaultValue={currentUser.username}  />
        <TextInput onChange={handleChange} type="email" id="email" name="email"  placeholder="email address" defaultValue={currentUser.email}  />
        <TextInput onChange={handleChange} type="password" id="password" name="username"  placeholder="password"  />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
</form>
<div className='text-red-500 flex justify-between mt-5'>
    <span className='cursor-pointer'>Delete Account?</span>
    <span className='cursor-pointer'>Sign Out</span>
   
</div>
{updateUserSucess && <Alert color='success' className='mt-5'>{updateUserSucess}</Alert>}
{updateUserError && <Alert color='failure' className='mt-5'>{updateUserError}</Alert>}
    </div>
  )
}

export default DashProfile
