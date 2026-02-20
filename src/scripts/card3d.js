document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".card-3d-wrapper");
  
  wrappers.forEach((wrapper) => {
    const card = wrapper.querySelector(".card-3d");
    
    wrapper.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 5;
      const rotateY = (centerX - x) / 5;
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(20px)`;
      card.style.setProperty('--mouse-x', `${percentX}%`);
      card.style.setProperty('--mouse-y', `${percentY}%`);
      card.style.setProperty('--angle', `${angle}deg`);
    });
    
    wrapper.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)";
    });
  });
});
