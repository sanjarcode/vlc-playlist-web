export default function FileUpload({
  name,
  onChange,
  extractContent = false,
  fileInputProps = {},
}) {
  const handleFileChange = async (e) => {
    let fileList = Array.from(e.target.files);

    if (extractContent) {
      fileList = await Promise.all(
        fileList.map(async (originalFile) => {
          const content = await getFileContent(originalFile);
          originalFile.content = content;
          return originalFile;
        })
      );
    }

    onChange({ target: { files: fileList } });
  };

  return (
    <div name={name}>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        {...fileInputProps}
      />
    </div>
  );
}

async function getFileContent(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsText(file);
  });
}
