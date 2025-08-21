
async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/SabrinaZ8/santander-frontend-2025/refs/heads/main/desafio10/js-developer-portfolio/data/profile.json';
    const response = await fetch(url)
    const profileData = await response.json()
    return profileData
}
