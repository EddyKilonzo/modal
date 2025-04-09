// DOM Elements
const openModalBtn = document.getElementById('openModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');
const cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn');
const ratingOptions = document.querySelectorAll('.rating-option');
const successMessage = document.getElementById('successMessage');

// Variable to store the selected rating
let selectedRating = 0;

// Open modal function
function openModal() {
    modalOverlay.classList.add('active');
    // Reset state when opening modal
    resetModal();
}

// Close modal function
function closeModal() {
    modalOverlay.classList.remove('active');
}

// Reset modal function
function resetModal() {
    selectedRating = 0;
    submitBtn.disabled = true;
    successMessage.classList.remove('active');
    
    // Remove selected class from all rating options
    ratingOptions.forEach(option => {
        option.classList.remove('selected');
    });
}

// Select rating function
function selectRating(rating) {
    selectedRating = rating;
    
    // Update UI to reflect selection
    ratingOptions.forEach(option => {
        const value = parseInt(option.getAttribute('data-value'));
        if (value === rating) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Enable submit button
    submitBtn.disabled = false;
}

// Submit feedback function
function submitFeedback() {
    // In a real application, you would send this data to your server
    console.log(`Feedback submitted with rating: ${selectedRating}`);
    
    // Show success message
    successMessage.classList.add('active');
    
    // Hide buttons
    submitBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    
    // Close modal after delay
    setTimeout(() => {
        closeModal();
        // Reset buttons after modal is closed
        setTimeout(() => {
            submitBtn.style.display = 'block';
            cancelBtn.style.display = 'block';
        }, 300);
    }, 1500);
}

// Event Listeners
openModalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Rating selection
ratingOptions.forEach(option => {
    option.addEventListener('click', () => {
        const value = parseInt(option.getAttribute('data-value'));
        selectRating(value);
    });
});

// Submit button
submitBtn.addEventListener('click', submitFeedback);