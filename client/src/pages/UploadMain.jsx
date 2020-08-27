import React from 'react';
import UploadMedia from "./Upload"
import UploadStory from "./UploadStory"


const UploadMain = () => {
    
    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
            <UploadMedia/>
            <UploadStory/>
            
        </div>
    );
};

export default UploadMain;