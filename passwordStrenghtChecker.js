function evaluatePassword() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const feedback = document.getElementById("feedback");

    // Clear previous feedback
    feedback.innerHTML = "";

    // List of the most common passwords
    const commonPasswords = ["password", "admin", "12345", "qwerty"];

    if (username.length == 0 && password.length == 0) {
        feedback.innerHTML += `<p>Missing username and password.</p>`;
    }
    else if (username.length == 0) {
        feedback.innerHTML += `<p>Missing username.</p>`;
    }
    else if (password.length == 0) {
        feedback.innerHTML += `<p>Missing password.</p>`;
    }
    else {
        let score = 0;
        let suggestions = [];

        // Check length
        if (password.length >= 8) score += 2;
        else suggestions.push("Make it at least 8 characters long.");

        // Check complexity and add suggestions
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (hasLower) score += 1;
        else suggestions.push("Add at least one lowercase letter.");

        if (hasUpper) score += 1;
        else suggestions.push("Add at least one uppercase letter.");

        if (hasDigit) score += 1;
        else suggestions.push("Add at least one digit.");

        if (hasSpecial) score += 2;
        else suggestions.push("Add at least one special character.");

        // Check for common passwords
        if (!commonPasswords.includes(password.toLowerCase())) score += 2;
        else suggestions.push("Avoid common passwords.");

        // Check username uniquenes
        if (username && password.toLowerCase() !== username.toLowerCase()) {
            score += 1;
        } else if (username) {
            suggestions.push("Username and password and shouldn't be identical.");
        }

        // Determine strength level
        let strength = "";
        if (score >= 8) strength = "Strong";
        else if (score >= 5) strength = "Moderate";
        else strength = "Weak";

        // Display feedback
        feedback.innerHTML = `<p>Password strength: <strong>${strength}</strong></p>
                            <p>Score: ${score}/10</p>`;

        if (suggestions.length > 0) {
            feedback.innerHTML += `<p>Suggestions:</p><ul>`;
            suggestions.forEach(suggestion => {
                feedback.innerHTML += `<li>${suggestion}</li>`;
            });
            feedback.innerHTML += `</ul>`;
        }  
    }
}
