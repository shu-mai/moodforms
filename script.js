document.addEventListener('DOMContentLoaded', function() {
    const moodFilters = {
      '111': { filter: 'sepia(60%) hue-rotate(0deg) saturate(1.5)', name: 'OPPORTUNITY' },
      '222': { filter: 'sepia(40%) hue-rotate(180deg) saturate(1.3)', name: 'BALANCE' },
      '333': { filter: 'sepia(40%) hue-rotate(90deg) saturate(1.5)', name: 'SUPPORT' },
      '444': { filter: 'sepia(60%) hue-rotate(320deg) saturate(1.8)', name: 'PROTECTION' },
      '555': { filter: 'sepia(80%) hue-rotate(35deg) saturate(1.5)', name: 'CHANGE' },
      '666': { filter: 'sepia(50%) hue-rotate(240deg) saturate(1.5)', name: 'REFLECTION' },
      '777': { filter: 'sepia(40%) hue-rotate(135deg) saturate(1.7)', name: 'LUCK' },
      '888': { filter: 'sepia(50%) hue-rotate(280deg) saturate(1.4)', name: 'ENERGY' }
    };
  
    const angelMessages = {
      '111': '111 New beginnings and manifestation',
      '222': '222 Harmony and alignment',
      '333': '333 Guidance and protection',
      '444': '444 Stability and security',
      '555': '555 Transformation and growth',
      '666': '666 Self-reflection and balance',
      '777': '777 Spiritual awakening and good fortune',
      '888': '888 Abundance and infinite possibilities'
    };
  
    const splineViewer = document.querySelector('spline-viewer');
    let currentAudio = null;
  
    function applyMoodFilter(moodSetting) {
      if (splineViewer) {
        splineViewer.style.filter = moodSetting.filter;
      }
    }
  
    const popup = document.createElement('div');
    popup.style.cssText = `
      display: none;
      position: fixed;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
      padding: 20px;
      border-radius: 10px;
          border: 1px solid #888;
      z-index: 1000;
      text-align: center;
    `;
    document.body.appendChild(popup);
  
    const buttons = document.querySelectorAll('#controls button');
    let activeButton = null;
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (activeButton) {
          activeButton.classList.remove('active');
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
          }
        }
  
        this.classList.add('active');
        activeButton = this;
  
        const moodSetting = moodFilters[this.id];
        if (moodSetting) {
          applyMoodFilter(moodSetting);
          console.log(`Mood changed to: ${moodSetting.name}`);
  
          const audioNumber = parseInt(this.id) / 111;
          if (isNaN(audioNumber)) {
            audioNumber = 1;
          }
          const audio = new Audio(`audio/${Math.floor(audioNumber)}.mp3`);
          currentAudio = audio;
          currentAudio.play();
  
         
          const message = angelMessages[this.id];
          if (message) {
            popup.textContent = message;
            popup.style.display = 'block';
            setTimeout(() => {
              popup.style.display = 'none';
            }, 3000);
          }
        }
      });
    });
  
    splineViewer.addEventListener('load', () => {
      if (buttons.length > 0) {
        buttons[0].click();
      }
    });
  
  
    const modal = document.getElementById('angelModal');
    const closeModal = document.querySelector('.close');
  
    const infoButton = document.createElement('button');
    infoButton.textContent = 'What Are Angel Numbers?';
    infoButton.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 3;
      padding: 10px 15px;
      font-size: 14px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    `;
    document.body.appendChild(infoButton);
  
    infoButton.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  