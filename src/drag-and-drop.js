// File drag and drop functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const filePreviewArea = document.getElementById('file-preview');
    const addPhotoText = document.getElementById('add-photo-text');
    const samplePhotos = document.querySelectorAll('.sample-photo');
    const photoGrid = document.querySelector('.photo-grid');

    // Counter for uploaded files
    let fileCounter = 0;
    const maxFiles = 6;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        dropArea.classList.add('border-accent_skyblue');
        dropArea.classList.remove('border-accent');
    }

    function unhighlight() {
        dropArea.classList.remove('border-accent_skyblue');
        dropArea.classList.add('border-accent');
    }

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle files from file input
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        const filesArray = Array.from(files);

        // Check if total files would exceed the limit
        if (fileCounter + filesArray.length > maxFiles) {
            alert(`You can only upload up to ${maxFiles} photos. You've already uploaded ${fileCounter}.`);
            return;
        }

        // Clear sample photos if they exist
        if (photoGrid) {
            photoGrid.innerHTML = '';
        }

        filesArray.forEach(file => {
            // Validate file type and size
            if (!validateFile(file)) return;

            // Increment counter
            fileCounter++;

            // Create preview
            previewFile(file);
        });

        // Update UI based on file count
        updateUI();
    }

    function validateFile(file) {
        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Only JPEG and PNG images are allowed.');
            return false;
        }

        // Check file size (2MB limit)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 2MB.');
            return false;
        }

        return true;
    }

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            // If photo grid exists, add the image there
            if (photoGrid) {
                // Check if this is the first image being added (fileCounter === 1)
                const isFirstImage = fileCounter === 1;
                addImageToGrid(reader.result, isFirstImage);
            } else {
                // Use the file preview area as fallback
                addImageToPreview(reader.result);
            }
        }
    }

    function addImageToGrid(src, isFirstImage = false) {
        const gridItem = document.createElement('div');
        gridItem.className = 'col-span-1 w-full rounded-lg h-40 relative group';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'w-full h-full object-cover rounded-lg';
        img.alt = 'Uploaded Image';

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity';
        deleteBtn.innerHTML = '<img src="/images/delete.svg" alt="Delete">';

        deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Check if this was the first image (has cover photo label)
            const hasCoverLabel = gridItem.querySelector('.cover-photo-label');

            gridItem.remove();
            fileCounter--;

            // If this was the cover photo, make the next first image the cover photo
            if (hasCoverLabel && photoGrid.children.length > 0) {
                const newFirstImage = photoGrid.children[0];

                // Add cover photo label to the new first image
                if (!newFirstImage.querySelector('.cover-photo-label')) {
                    const coverLabel = document.createElement('div');
                    coverLabel.className = 'cover-photo-label absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 flex items-center justify-center rounded-full text-xs text-white bg-black';
                    coverLabel.textContent = 'Cover Photo';
                    newFirstImage.appendChild(coverLabel);
                }
            }

            updateUI();
        });

        gridItem.appendChild(img);
        gridItem.appendChild(deleteBtn);

        // Add "Cover Photo" label if this is the first image
        if (isFirstImage || photoGrid.children.length === 0) {
            const coverLabel = document.createElement('div');
            coverLabel.className = 'cover-photo-label absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 flex items-center justify-center rounded-full text-xs text-white bg-black';
            coverLabel.textContent = 'Cover Photo';
            gridItem.appendChild(coverLabel);
        }

        photoGrid.appendChild(gridItem);
    }

    function addImageToPreview(src) {
        const preview = document.createElement('div');
        preview.className = 'relative group';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'w-32 h-32 object-cover rounded-xl';
        preview.appendChild(img);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity';
        removeBtn.innerHTML = '<img src="/images/delete.svg" alt="Delete">';

        removeBtn.addEventListener('click', function() {
            preview.remove();
            fileCounter--;
            updateUI();
        });
        preview.appendChild(removeBtn);

        filePreviewArea.appendChild(preview);
    }

    // Handle sample photos
    if (samplePhotos) {
        samplePhotos.forEach(photo => {
            photo.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;

                // Clear any existing uploads if this is the first sample
                if (fileCounter === 0 && photoGrid) {
                    photoGrid.innerHTML = '';
                }

                // Check if we've reached the limit
                if (fileCounter >= maxFiles) {
                    alert(`You can only upload up to ${maxFiles} photos.`);
                    return;
                }

                // Add the sample image to the grid
                if (photoGrid) {
                    // Check if this is the first image being added
                    const isFirstImage = fileCounter === 0;
                    addImageToGrid(imgSrc, isFirstImage);
                } else {
                    addImageToPreview(imgSrc);
                }

                fileCounter++;
                updateUI();
            });
        });
    }

    function updateUI() {
        // If we have files, show the preview grid and hide the icon/text
        if (fileCounter > 0) {
            if (filePreviewArea) {
                filePreviewArea.classList.remove('hidden');
            }

            // If we have the max number of files, disable the drop area
            if (fileCounter >= maxFiles) {
                dropArea.classList.add('opacity-50');
                dropArea.classList.add('cursor-not-allowed');
                const instructionText = dropArea.querySelector('p.text-xs') || dropArea.querySelector('p.text-sm');
                if (instructionText) {
                    instructionText.textContent = 'Maximum number of photos reached';
                }
            } else {
                dropArea.classList.remove('opacity-50');
                dropArea.classList.remove('cursor-not-allowed');
                const instructionText = dropArea.querySelector('p.text-xs') || dropArea.querySelector('p.text-sm');
                if (instructionText) {
                    instructionText.textContent = `Upload up to ${maxFiles} photos (JPEG or PNG). Max size per image: 2MB`;
                }
            }
        } else {
            if (filePreviewArea) {
                filePreviewArea.classList.add('hidden');
            }
            if (addPhotoText) {
                addPhotoText.classList.remove('hidden');
            }
            dropArea.classList.remove('opacity-50');
            dropArea.classList.remove('cursor-not-allowed');
            const instructionText = dropArea.querySelector('p.text-xs') || dropArea.querySelector('p.text-sm');
            if (instructionText) {
                instructionText.textContent = `Upload up to ${maxFiles} photos (JPEG or PNG). Max size per image: 2MB`;
            }
        }
    }

    // Click on drop area to trigger file input
    dropArea.addEventListener('click', function() {
        if (fileCounter < maxFiles) {
            fileInput.click();
        }
    });
});
