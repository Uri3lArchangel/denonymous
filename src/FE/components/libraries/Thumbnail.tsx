// Import the necessary types from the DOM
type HTMLVideoElementWithCaptureStream = HTMLVideoElement & {
  captureStream?: () => MediaStream;
};

// Function to generate a thumbnail from a remote video URL
function generateThumbnail(remoteVideoUrl: string, callback: (thumbnailBlob: Blob) => void): void {
  // Create a video element
  const video = document.createElement('video') as HTMLVideoElementWithCaptureStream;

  // Set the video source to the remote URL
  video.src = remoteVideoUrl;

  // Load metadata of the video to get video duration
  video.addEventListener('loadedmetadata', () => {
    // Set the video currentTime to get a frame from the video
    video.currentTime = Math.min(1, video.duration || 1);

    // Create a canvas element to draw the video frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame on the canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    // Convert the canvas content to a Blob
    canvas.toBlob((blob) => {
      if (blob) {
        callback(blob);
      } else {
        throw new Error('Unable to generate thumbnail');
      }
    });
  });

  // Load the video
  video.load();
}
