const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

if (form && nameInput && emailInput) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            alert('Name is required.');
            nameInput.focus();
            return;
        }

        if (!email) {
            alert('Email is required.');
            emailInput.focus();
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Enter a valid email address.');
            emailInput.focus();
            return;
        }

        try {
            const response = await fetch('https://dev-ops-challenge-2-with-observerbility.onrender.com/api/event-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed.');
            }

            alert(result.message || 'Registration successful.');
            form.reset();
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.message || 'Unable to submit registration.');
        }
    });
}