import { createSignal, JSX, Component, Accessor } from 'solid-js';
import './index.scss'; // We'll create this CSS file next

// --- Props Interface ---
interface ModernDropzoneProps {
  // Keep the original props your input needed
  ref: (el: HTMLInputElement) => void; // Pass the ref down
  id: string;
  name: string;
  accept?: string;
  required?: boolean;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;

  // Optional props for customization
  label?: string | JSX.Element;
  draggingLabel?: string | JSX.Element;
  icon?: JSX.Element; // Allow passing a custom icon
}

// --- Default Icon (SVG) ---
const DefaultUploadIcon: Component = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="dropzone-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="1.5" // Thinner stroke for modern look
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.33-2.13 5.25 5.25 0 011.168 10.9z"
    />
    {/* Alternative simpler cloud arrow up:
       <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.33-2.13 5.25 5.25 0 011.168 10.9z" />
       <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25" />
    */}
  </svg>
);

// --- The Dropzone Component ---
const ModernDropzone: Component<ModernDropzoneProps> = (props) => {
  const [isDragging, setIsDragging] = createSignal(false);
  let fileInputRef: HTMLInputElement | undefined; // Internal ref for the input

  // --- Event Handlers ---
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
     // Check if the dragged items are files
     if (e.dataTransfer?.types.includes('Files')) {
       setIsDragging(true);
     }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
    e.stopPropagation();
    // You could add more checks here if needed
     if (!isDragging() && e.dataTransfer?.types.includes('Files')) {
        setIsDragging(true); // Ensure dragging state is set if missed by enter
     }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
     // Check if the leave target is outside the dropzone boundary
     const target = e.relatedTarget as Node | null;
     if (!(e.currentTarget as HTMLElement)?.contains(target)) {
        setIsDragging(false);
     }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0 && fileInputRef) {
        // Check if the dropped file type is acceptable (simple check)
        const acceptedTypes = props.accept?.split(',').map(t => t.trim().toLowerCase()) || [];
        const droppedFile = e.dataTransfer.files[0]; // Handle first file
        const fileExtension = '.' + droppedFile.name.split('.').pop()?.toLowerCase();
        const fileMimeType = droppedFile.type.toLowerCase();

        const isAccepted = acceptedTypes.length === 0 || acceptedTypes.some(type => {
            if (type.startsWith('.')) { // Check extension
                return fileExtension === type;
            } else if (type.includes('/')) { // Check MIME type
                return fileMimeType === type || (type.endsWith('/*') && fileMimeType.startsWith(type.slice(0, -2)));
            }
            return false;
        });


        if (isAccepted) {
             // Assign the dropped files to the hidden input
             fileInputRef.files = e.dataTransfer.files;
             // Create and dispatch a 'change' event on the input
             // This ensures the original onChange handler logic works seamlessly
             const event = new Event('change', { bubbles: true });
             fileInputRef.dispatchEvent(event);
        } else {
            console.warn(`File type not accepted: ${droppedFile.name} (${droppedFile.type})`);
            alert(`File type not accepted. Please upload a ${props.accept} file.`); // Simple feedback
            // Optionally clear the input if needed (though it wasn't set)
             if(fileInputRef.value) {
                 fileInputRef.value = ''; // Clear potential previous selection
             }
        }
    }
  };

  // Trigger the hidden file input when the dropzone area is clicked
  const handleClick = () => {
    fileInputRef?.click();
  };

  // Assign the ref passed from the parent AND the internal ref
  const setupRef = (el: HTMLInputElement) => {
      fileInputRef = el;
      if (typeof props.ref === 'function') {
          props.ref(el); // Call the original ref function passed in props
      }
      // Note: SolidJS refs can also be objects { current: T }, adapt if needed
  };

  // --- Render Logic ---
  return (
    <div
      class="modern-dropzone-wrapper" // Added wrapper for potential future elements
      onClick={handleClick} // Click anywhere triggers input
    >
      <div
        class="modern-dropzone"
        classList={{ dragging: isDragging() }} // Dynamic class for dragging state
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver} // Keep handleDragOver
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Hidden actual file input - keeps form functionality */}
        <input
          ref={setupRef} // Use the combined ref setup
          id={props.id}
          type="file"
          name={props.name}
          accept={props.accept}
          required={props.required}
          onChange={props.onChange} // Use the original onChange
          style={{ display: 'none' }} // Hide it visually
          aria-hidden="true" // Hide from screen readers (the div is the interface)
        />

        {/* Visual Content */}
        <div class="dropzone-content">
          {props.icon ?? <DefaultUploadIcon />} {/* Use provided icon or default */}

          <p class="dropzone-text">
            {isDragging()
              ? (props.draggingLabel ?? 'Drop the file here!')
              : (props.label ?? <>Drag & drop your <strong>{props.accept ?? 'file'}</strong> here,<br /> or click to select</>)
            }
          </p>
          <span class="dropzone-browse-link">Browse files</span>
        </div>

         {/* Animated borders/effects (optional) */}
         <div class="dropzone-border-animation"></div>

      </div>
    </div>
  );
};

export default ModernDropzone;