(()=>{'use strict';
const q=id=>document.getElementById(id);
function durationFromTimes(){const s=q('start')?.value,e=q('end')?.value;if(!s||!e)return;const [sh,sm]=s.split(':').map(Number),[eh,em]=e.split(':').map(Number);let n=eh*60+em-(sh*60+sm);if(n<0)n+=1440;if(n>0)q('duration').value=n}
q('start')?.addEventListener('change',durationFromTimes);q('end')?.addEventListener('change',durationFromTimes);
q('notifications')?.addEventListener('change',async e=>{if(!e.target.checked)return;if(!('Notification'in window)){e.target.checked=false;return}const p=await Notification.requestPermission();if(p!=='granted'){e.target.checked=false;alert('Notifications were not enabled by the browser.')} });
q('themeBtn')?.addEventListener('click',()=>localStorage.setItem('activity-logger:theme',document.documentElement.classList.contains('dark')?'dark':'light'));
if(localStorage.getItem('activity-logger:theme')==='dark')document.documentElement.classList.add('dark');
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return;if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();q('activitySearch')?.focus();return}if(e.key.toLowerCase()==='n'){e.preventDefault();q('newEntry')?.click()}});
})();