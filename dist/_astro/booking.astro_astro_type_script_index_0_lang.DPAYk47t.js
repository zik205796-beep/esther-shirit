const b="esther_bookings";function I(){return"ES"+Date.now().toString(36).toUpperCase()}function r(){return JSON.parse(localStorage.getItem(b)||"[]")}function u(o){localStorage.setItem(b,JSON.stringify(o))}const g=document.getElementById("date");if(g){const o=new Date().toISOString().split("T")[0];g.setAttribute("min",o),g.addEventListener("input",function(){const a=new Date(this.value).getDay();(a===5||a===6)&&(alert("לא זמין בימי שישי-שבת"),this.value="")})}document.getElementById("booking-form")?.addEventListener("submit",function(o){o.preventDefault();const e=new FormData(this),a=document.querySelector('input[name="service"]:checked'),t={id:I(),service:e.get("service"),serviceName:a?.dataset.name||"",duration:a?.dataset.duration||"",date:e.get("date"),time:e.get("time"),name:e.get("name"),phone:e.get("phone"),notes:e.get("notes")||"",status:"confirmed",createdAt:new Date().toISOString()},i=r();i.push(t),u(i);const n=new Date(t.date).toLocaleDateString("he-IL",{weekday:"long",year:"numeric",month:"long",day:"numeric"});document.getElementById("booking-form").classList.add("hidden"),document.getElementById("success-msg").classList.remove("hidden"),document.getElementById("booking-summary").textContent=`${t.serviceName} · ${n} · ${t.time}`,document.getElementById("booking-id").textContent=t.id,document.getElementById("change-link").href=`/booking?manage=${t.id}&action=change`,document.getElementById("cancel-link").href=`/booking?manage=${t.id}&action=cancel`;const d=`https://wa.me/972552400842?text=${encodeURIComponent(`🔔 תור חדש!
👤 ${t.name}
📞 ${t.phone}
💆 ${t.serviceName}
📅 ${n}
⏰ ${t.time}
${t.notes?"📝 "+t.notes:""}`)}`;setTimeout(()=>{confirm("לשלוח אישור לאסתר בוואטסאפ?")&&window.open(d,"_blank")},500)});const f=new URLSearchParams(window.location.search),s=f.get("manage"),y=f.get("action");if(s){const e=r().find(t=>t.id===s);if(document.getElementById("booking-form")?.classList.add("hidden"),document.getElementById("manage-section")?.classList.remove("hidden"),!e)document.getElementById("manage-title").textContent="❌ הזמנה לא נמצאה",document.getElementById("manage-details").textContent="ייתכן שההזמנה כבר בוטלה.";else if(y==="cancel"){document.getElementById("manage-title").textContent="❌ ביטול תור";const i=new Date(e.date).toLocaleDateString("he-IL",{weekday:"long",year:"numeric",month:"long",day:"numeric"});document.getElementById("manage-details").textContent=`${e.serviceName} · ${i} · ${e.time}`,document.getElementById("manage-actions").innerHTML=`
          <p class="text-gray-600">בטוחה שאת רוצה לבטל את התור?</p>
          <div class="flex gap-3 justify-center">
            <button id="confirm-cancel" class="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-full transition">כן, בטלי</button>
            <a href="/booking" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-8 py-3 rounded-full transition inline-block">חזרה</a>
          </div>
        `,document.getElementById("confirm-cancel")?.addEventListener("click",()=>{const c=r().filter(n=>n.id!==s);u(c),document.getElementById("manage-title").textContent="✅ התור בוטל",document.getElementById("manage-details").textContent="ההזמנה בוטלה בהצלחה.",document.getElementById("manage-actions").innerHTML=`
            <a href="/booking" class="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition">הזמנת תור חדש</a>
          `})}else if(y==="change"){document.getElementById("manage-title").textContent="✏️ שינוי תור";const i=new Date(e.date).toLocaleDateString("he-IL",{weekday:"long",year:"numeric",month:"long",day:"numeric"});document.getElementById("manage-details").textContent=`תור נוכחי: ${e.serviceName} · ${i} · ${e.time}`;const c=["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"];document.getElementById("manage-actions").innerHTML=`
          <div class="space-y-4 text-right">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">תאריך חדש</label>
              <input type="date" id="new-date" value="${e.date}" min="${new Date().toISOString().split("T")[0]}"
                class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">שעה חדשה</label>
              <select id="new-time" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition">
                ${c.map(n=>`<option value="${n}" ${n===e.time?"selected":""}>${n}</option>`).join("")}
              </select>
            </div>
            <div class="flex gap-3 justify-center">
              <button id="confirm-change" class="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition">אישור שינוי</button>
              <a href="/booking" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-8 py-3 rounded-full transition inline-block">חזרה</a>
            </div>
          </div>
        `,document.getElementById("confirm-change")?.addEventListener("click",()=>{const n=document.getElementById("new-date").value,m=document.getElementById("new-time").value,d=r(),l=d.findIndex(h=>h.id===s);l!==-1&&(d[l].date=n,d[l].time=m,u(d));const p=new Date(n).toLocaleDateString("he-IL",{weekday:"long",year:"numeric",month:"long",day:"numeric"});document.getElementById("manage-title").textContent="✅ התור עודכן!",document.getElementById("manage-details").textContent=`${e.serviceName} · ${p} · ${m}`,document.getElementById("manage-actions").innerHTML=`
            <a href="/" class="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition">חזרה לדף הבית</a>
          `})}}
