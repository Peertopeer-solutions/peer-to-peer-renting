import { uuidv4 } from '@firebase/util'
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'

const useStorage = (file, fileFolder) => {
    const [url, setUrl] = useState(null)
    const [error, setError] = useState(null)
    const [progress, SetProgress] = useState(0)
   
    useEffect(()=>{

      
      

          const storage = getStorage()
          const fileName = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`
  
          const storageRef = ref(storage, `${fileFolder}/` + fileName)
  
          const uploadTask = uploadBytesResumable(storageRef, file)
  
          uploadTask.on('state_changed',(snapshot) => {

              const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              SetProgress(progress)
              
            }, (err) =>{
              setError(err)
            }, async () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
             const url = await getDownloadURL(uploadTask.snapshot.ref)
             setUrl(url)
          })

    },[file])

  console.log('url', url)
  return (progress , url, error )
}

export default useStorage
