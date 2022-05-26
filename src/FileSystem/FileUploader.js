import React from "react";

export const FileUploader = ({ parentCallback }) => {
  // map of common (mostly media types) mime types to use when the browser does not supply the mime type
  const EXTENSION_TO_MIME_TYPE_MAP = {
    avi: "video/avi",
    gif: "image/gif",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    mp4: "video/mp4",
    pdf: "application/pdf",
    png: "image/png",
    zip: "application/zip",
  };

  // package the file in an object that includes the fullPath from the file entry that would otherwise be lost
  function packageFile(file) {
    let fileTypeOverride = "";
    // handle some browsers sometimes missing mime types for selected files
    const hasExtension = file.name && file.name.lastIndexOf(".") !== -1;
    if (hasExtension && !file.type) {
      const fileExtension = (file.name || "").split(".").pop();
      fileTypeOverride = EXTENSION_TO_MIME_TYPE_MAP[fileExtension];
    }
    return {
      fileObject: file, // provide access to the raw File object (required for uploading)
      fullPath: file.name,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type ? file.type : fileTypeOverride,
      webkitRelativePath: file.webkitRelativePath,
    };
  }

  /**
   * This function should be called from both the onDrop event from your drag/drop
   * dropzone as well as from the HTML5 file selector input field onChange event
   * handler.  Pass the event object from the triggered event into this function.
   * Supports mix of files and folders dropped via drag/drop.
   *
   * Returns: an array of File objects, that includes all files within folders
   *   and subfolders of the dropped/selected items.
   */
  function getSelectedFiles(event) {
    const files = [];
    const inputFieldFileList = event.target && event.target.files;
    const fileList = inputFieldFileList || [];
    // convert the FileList to a simple array of File objects
    for (let i = 0; i < fileList.length; i++) {
      files.push(packageFile(fileList[i]));
    }
    Promise.resolve(files).then((files) => {
      return parentCallback(files);
    });
  }

  return (
    <div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        data-testid="file-uploader-input"
        accept="file"
        webkitdirectory="true"
        directory
        multiple
        onChange={getSelectedFiles}
      ></input>
    </div>
  );
};
