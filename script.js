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
  
    const splineViewer = document.querySelector('spline-viewer');
    let currentAudio = null;
  
    function applyMoodFilter(moodSetting) {
      if (splineViewer) {
        splineViewer.style.filter = moodSetting.filter;
      }
    }
  
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
        }
      });
    });
  
    splineViewer.addEventListener('load', () => {
      if (buttons.length > 0) {
        buttons[0].click();
      }
    });
  });
  