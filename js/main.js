// =======================
// SafeYouth Platform - Main JS
// Core interactions: mobile menu, panic, modal, chat, etc.
// =======================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Sidebar Logic ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebar = document.getElementById('closeSidebar');

    function openSidebar() {
        mobileSidebar.classList.add('active');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeSidebarFunc() {
        mobileSidebar.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (menuToggle) menuToggle.addEventListener('click', openSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarFunc);
    if (overlay) overlay.addEventListener('click', closeSidebarFunc);

    // --- Panic Exit (redirect to safe neutral site) ---
    function panicExit(e) {
        if(e) e.preventDefault();
        window.location.href = 'https://www.bbc.com/news'; // safe, neutral website
    }
    const panicButtons = ['panicBtnHeader', 'panicBtnMobile', 'panicSafetyBtn'];
    panicButtons.forEach(id => {
        const btn = document.getElementById(id);
        if(btn) btn.addEventListener('click', panicExit);
    });

    // --- Helpline Modal ---
    const modal = document.getElementById('helplineModal');
    const openModalBtns = ['openModalBtn', 'openModalBtnMobile'];
    const closeModalBtn = document.getElementById('closeModalBtn');

    openModalBtns.forEach(id => {
        const btn = document.getElementById(id);
        if(btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if(modal) modal.style.display = 'flex';
            });
        }
    });
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if(modal) modal.style.display = 'none';
        });
    }
    window.addEventListener('click', (e) => {
        if(e.target === modal) modal.style.display = 'none';
    });

    // --- Emergency Button Alert ---
    const emergencyBtn = document.getElementById('emergencyBtn');
    if(emergencyBtn) {
        emergencyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("🚨 If you're in immediate danger, call 911 (or local emergency).\nYou are not alone — help is available 24/7.");
        });
    }

    // --- Anonymous Chat Widget Logic ---
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    if(chatBubble) {
        chatBubble.addEventListener('click', () => {
            if(chatWindow.style.display === 'flex') {
                chatWindow.style.display = 'none';
            } else {
                chatWindow.style.display = 'flex';
            }
        });
    }

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
        msgDiv.innerText = text;
        if(chatMessages) chatMessages.appendChild(msgDiv);
        if(chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        if(!chatInput) return;
        let text = chatInput.value.trim();
        if(text === '') return;
        addMessage('user', text);
        chatInput.value = '';
        setTimeout(() => {
            addMessage('bot', "Thank you for sharing. Someone from our support team will reply soon. You're not alone. 💜 If you need immediate help, please call a helpline from our list.");
        }, 500);
    }

    if(sendChatBtn) sendChatBtn.addEventListener('click', sendMessage);
    if(chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') sendMessage();
        });
    }

    // --- Smooth anchor scrolling (for internal links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile sidebar if open
                if(mobileSidebar && mobileSidebar.classList.contains('active')) closeSidebarFunc();
            }
        });
    });

    // --- Additional safety: Warn before leaving page? (optional) ---
    // Not added to avoid nuisance, but you can enable if needed.
});
