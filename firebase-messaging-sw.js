// جلب مكتبات فايربيز للإشعارات في الخلفية (متوافق مع إصدار موقعك)
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// ضع هنا نفس كائن الإعدادات الخاص بموقعك
const firebaseConfig = {
            apiKey: "AIzaSyCjL7fMM-3WDa6_IBbO4E-B9OtpKU8RzGw",
            authDomain: "noval-6e66c.firebaseapp.com",
            projectId: "noval-6e66c",
            storageBucket: "noval-6e66c.firebasestorage.app",
            messagingSenderId: "71189046621",
            appId: "1:71189046621:web:defa1eba713d9b9e4674b4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// استقبال الإشعار والموقع مغلق وضخه بنظام التشغيل
messaging.onBackgroundMessage((payload) => {
    console.log('[Background] وصل إشعار في الخلفية:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.data.icon || '/logo-gold.png', // أيقونة موقعك الذهبية
        badge: '/badge-gold.png', // الشارة الصغيرة للشريط العلوي
        data: { url: payload.data.click_action }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// عند ضغط المستخدم على الإشعار وهو خارج الموقع، يفتح له الرواية فوراً
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.notification.data && event.notification.data.url) {
        event.waitUntil(clients.openWindow(event.notification.data.url));
    }
});
