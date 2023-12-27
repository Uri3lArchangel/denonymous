'use client'
import React, { useState } from "react";

const FileUpload = () => {
 

  return (
    <div>
      <form >
        <input
          type="file"
          accept="image/*, video/*, audio/*"
        />
        <button type="submit">Upload</button>
      </form>
     
      
    </div>
  );
};

export default FileUpload;
