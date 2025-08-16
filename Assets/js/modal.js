// Modal functionality
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupModals());
        } else {
            this.setupModals();
        }
    }

    setupModals() {
        // Payment methods modal
        this.setupPaymentModal();
        
        // General modal event listeners
        document.addEventListener('click', (e) => {
            // Close modal when clicking outside
            if (e.target.matches('.modal-backdrop')) {
                this.closeModal();
            }
            
            // Close modal when clicking close button
            if (e.target.matches('[data-modal-close]')) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupPaymentModal() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-payment-modal]') || e.target.closest('[data-payment-modal]')) {
                e.preventDefault();
                this.showPaymentModal();
            }
        });
    }

    showPaymentModal() {
        // Create modal HTML
        const modalHTML = `
            <div class="modal-backdrop fixed inset-0 z-50 modal-blur flex items-center justify-center p-4">
                <div class="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                    <!-- Modal Header -->
                    <div class="relative p-6 pb-4">
                        <button data-modal-close 
                                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Τρόποι Πληρωμής</h3>
                    </div>
                    
                    <!-- Modal Body -->
                    <div class="px-6 pb-6">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-4">
                            <h4 class="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                                Τραπεζικοί Λογαριασμοί
                            </h4>
                            
                            <div class="space-y-4">
                                <div class="bg-white rounded-lg p-4 border border-blue-200">
                                    <div class="flex items-center mb-2">
                                        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white text-sm font-bold">A</span>
                                        </div>
                                        <span class="font-semibold text-gray-800">ALPHA BANK</span>
                                    </div>
                                    <div class="font-mono text-sm bg-gray-50 p-2 rounded border select-all">
                                        GR15 0140 3240 3240 0200 2002 110
                                    </div>
                                </div>
                                
                                <div class="bg-white rounded-lg p-4 border border-blue-200">
                                    <div class="flex items-center mb-2">
                                        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white text-sm font-bold">Π</span>
                                        </div>
                                        <span class="font-semibold text-gray-800">ΠΕΙΡΑΙΩΣ</span>
                                    </div>
                                    <div class="font-mono text-sm bg-gray-50 p-2 rounded border select-all">
                                        GR24 0171 7700 0067 7013 6435 045
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                            <p class="mb-2">
                                <strong>Σημείωση:</strong> Παρακαλούμε να συμπεριλάβετε τον αριθμό παραγγελίας σας στην αιτιολογία της κατάθεσης.
                            </p>
                            <p>
                                Για γρηγορότερη εξυπηρέτηση, στείλτε μας φωτογραφία του αποδεικτικού κατάθεσης στο email ή WhatsApp μας.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);

        // Animate modal in
        const modal = modalContainer.querySelector('.modal-backdrop > div');
        modal.style.transform = 'scale(0.8)';
        modal.style.opacity = '0';

        requestAnimationFrame(() => {
            modal.style.transform = 'scale(1)';
            modal.style.opacity = '1';
        });

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.querySelector('.modal-backdrop');
        if (modal) {
            const modalContent = modal.querySelector('div');
            
            // Animate out
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            modal.style.opacity = '0';

            setTimeout(() => {
                modal.remove();
                // Restore body scrolling
                document.body.style.overflow = '';
            }, 200);
        }
    }
}

// Initialize modal manager
new ModalManager();
