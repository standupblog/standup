// Panic, mobile menu, chat, modal (same as before, but update API_BASE if needed)
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.getElementById('closeSidebar');
    if(menuToggle) menuToggle.onclick = () => { mobileSidebar.classList.add('active'); overlay.style.display = 'block'; };
    if(closeSidebar) closeSidebar.onclick = () => { mobileSidebar.classList.remove('active'); overlay.style.display = 'none'; };
    if(overlay) overlay.onclick = () => { mobileSidebar.classList.remove('active'); overlay.style.display = 'none'; };

    function panicExit() { window.location.href = 'https://www.bbc.com/news'; }
    document.querySelectorAll('#panicBtnHeader, #panicBtnMobile, #panicSafetyBtn').forEach(btn => btn?.addEventListener('click', panicExit));

    const modal = document.getElementById('helplineModal');
    document.querySelectorAll('#openModalBtn, #openModalBtnMobile').forEach(btn => btn?.addEventListener('click', (e) => { e.preventDefault(); modal.style.display = 'flex'; }));
    document.getElementById('closeModalBtn')?.addEventListener('click', () => modal.style.display = 'none');
    window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    if(chatBubble) chatBubble.onclick = () => chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    const sendChat = () => {
        const input = document.getElementById('chatInput');
        const msg = input.value.trim();
        if(!msg) return;
        const msgs = document.getElementById('chatMessages');
        const userDiv = document.createElement('div'); userDiv.className = 'user-msg'; userDiv.innerText = msg; msgs.appendChild(userDiv);
        input.value = '';
        setTimeout(() => { const botDiv = document.createElement('div'); botDiv.className = 'bot-msg'; botDiv.innerText = "Thank you for sharing. A supporter will reply soon. 💜"; msgs.appendChild(botDiv); msgs.scrollTop = msgs.scrollHeight; }, 500);
    };
    document.getElementById('sendChatBtn')?.addEventListener('click', sendChat);
    document.getElementById('chatInput')?.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendChat(); });
});
